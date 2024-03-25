import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
export default function DisplayCountries() {
    let [countryData,setData]=useState([])
    let [searchText,setSearchText]=useState("")
    let [searchResult,setSearchResult]=useState([])
    async function fetchData()
    {

        try{
        let response=await fetch('https://restcountries.com/v3.1/all')
        let data=await response.json();
        console.log(data)
        setData(data);
        return data;
        }
        catch(e)
        {
            console.log(e.message)
            setData([])
        }
    }
    function displayData(data)
    {
    let list=data.map((ele)=>{
        return (
            <div className={styles.countryCard} key={ele.ccn3}>
              <img src={ele.flags.png} alt={ele.flags.alt} width="100" height="100" />
              <h3>{ele.name.common}</h3>
            </div>
        );
    })
    return list;
    }
    useEffect(()=>{
        fetchData();
         

    },[])
    function search()
    {
             let result=countryData.filter((ele)=>ele.name.common.toLowerCase().includes(searchText.toLowerCase()))
             setSearchResult(result)
    }
    useEffect(()=>{
    search();
    },[searchText])
    function displayFinalResult()
    {
        if(!searchText)
        {
            if(countryData)
            {
             return   displayData(countryData)
            }
            else{
                return null
            }
        }
        else{
            if(searchResult.length>0)
            {
                return displayData(searchResult)
            }
            else{
                return null;
            }
        }
    }
  return (
    <div className={styles.container} >
       
            <input type="text" onChange={(e)=>{
              setSearchText(e.target.value)
            }} className={styles.input} placeholder='Search for countries'/>
    
     <div className={styles.countryContainer}>
        {/* <div className={styles.countryCard}>
         
        </div> */}
        {/* {searchText && searchResult.length>0 ?displayData(searchResult):countryData?displayData(countryData):null} */}

          {displayFinalResult()}
     </div>
    </div>
  )
}
