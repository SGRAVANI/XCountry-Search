// import React, { useEffect, useState } from 'react'
// import "./style.css"
// export default function DisplayCountries() {
//     let [countryData,setData]=useState([])
//     let [searchText,setSearchText]=useState("")
//     let [searchResult,setSearchResult]=useState([])
//     async function fetchData()
//     {

//         try{
//         let response=await fetch('https://restcountries.com/v3.1/all')
//         let data=await response.json();
//         console.log(data)
//         setData(data);
//         return data;
//         }
//         catch(e)
//         {
//             console.log(e.message)
//             setData([])
//         }
//     }
//     function displayData(data)
//     {
//     let list=data.map((ele)=>{
//         return (
//             <div className="countryCard" key={ele.ccn3}>
//               <img src={ele.flags.png} alt={ele.flags.alt} width="100" height="100" />
//               <h2>{ele.name.common}</h2>
//             </div>
//         );
//     })
//     return list;
//     }
//     useEffect(()=>{
//         fetchData();
         

//     },[])
//     function search()
//     {
//              let result=countryData.filter((ele)=>ele.name.common.toLowerCase().includes(searchText.toLowerCase()))
//              setSearchResult(result)
//     }
//     useEffect(()=>{
//     search();
//     },[searchText])
//     function displayFinalResult()
//     {
//         if(!searchText)
//         {
//             if(countryData)
//             {
//              return   displayData(countryData)
//             }
//             else{
//                 return null
//             }
//         }
//         else{
//             if(searchResult.length>0)
//             {
//                 return displayData(searchResult)
//             }
//             else{
//                 return null;
//             }
//         }
//     }
//     const handleSearchChange = (e) => {
//         setSearchText(e.target.value);
//     };
//   return (
//     <div className="container" >
       
//             <input type="text" onChange={handleSearchChange} className="input" placeholder='Search for countries'/>
    
//      <div className="countryContainer">
        

//           {displayFinalResult()}
//      </div>
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import "./style.css";

export default function DisplayCountries() {
    const [countryData, setCountryData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            setCountryData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setCountryData([]);
        }
    }

    useEffect(() => {
        if (!searchText) {
            setSearchResult([]);
            return;
        }

        const result = countryData.filter(country =>
            country.name.common.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResult(result);
    }, [searchText, countryData]);

    function displayFinalResult() {
        const dataToDisplay = searchText ? searchResult : countryData;
        return dataToDisplay.map(country => (
            <div className="countryCard" key={country.ccn3}>
                <img src={country.flags.png} alt={country.flags.alt} width="100" height="100" />
                <h2>{country.name.common}</h2>
            </div>
        ));
    }

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="container">
            <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                className="input"
                placeholder='Search for countries'
            />
            <div className="countryContainer">
                {displayFinalResult()}
            </div>
        </div>
    );
}