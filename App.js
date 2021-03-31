
import React, { useState } from 'react'
const api={
  key:"dc4fe2daf0c21423e9736014ab393453",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {
  const[query,setQuery]=useState('');
  const[weather,setWeather]=useState({});
  const search=evt=>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
      setWeather(result);
      setQuery('');
      console.log(weather);
      });
    }
  }
  const dateBuilder=(d)=>{
    let months=["Jun","Feb","Mar","Apr","May","june","July","Aug","Sep","Oct","Nov","Dec"];
    let Days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let day=Days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main!="undefined")?((weather.main.temp>23)?'app warm':'app'):'app'}>
      <main>
      <div className="searchbox">
        <input type="text" className="search-box" placeholder="search..."
        onChange={e=>setQuery(e.target.value)}
        value={query}
        onKeyPress={search}/>
      </div>
      {(typeof weather.main!="undefined")?(
        <div>
    <div className="location-box">
      <div className="location">{weather.name},{weather.sys.country}</div>
      <div className="date">{dateBuilder(new Date())}</div>
    </div>
    <div className="weather-box">
      <div className="temp">
       <h1>{Math.round(weather.main.temp)}C</h1>
      </div>
      <div className="weather">
        <h1>{(weather.main.temp>23)?"Sunny":"Cool"}</h1>
        </div>
    </div>
    </div>
      ):('')}
      </main>
    </div>
  );
}

export default App;
