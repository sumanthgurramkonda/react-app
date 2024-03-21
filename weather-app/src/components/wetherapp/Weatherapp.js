import React, { useState } from 'react'
import search_icon from '../assets/search.png'
import './weatherapp.css'
import cloud_icon from'../assets/cloud.png'
import humidity_icon from '../assets/humidity.png'
import wind_speed from '../assets/wind.png'
import clear_icon from'../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'

const Weatherapp = () => {

    const [temperature, setTemperature] = useState(0)
    const [humidity, sethumidity] = useState(0)
    const [windSpeed, setTwindSpeed] = useState(0)
    const [cityName, setcityName] = useState("")
    const [wicon, setWicon] = useState(cloud_icon)

    let api_key = "e7657e9e235773080c3d55a2268b1a94";
    
    const search = async ()=>{
          const element = document.getElementsByClassName("cityInput")
          if(element[0].value===""){ 
            return 0
          }
          let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`
          console.log(element[0].value)
          let response = await fetch(url)
          console.log(response)
          let data = await response.json()
          if(data===undefined){
            console.log("Enter valid city name")
            return 0
          }
          console.log(data)
          setcityName(data.name)
          setTwindSpeed(data.wind.speed)
          setTemperature(data.main.temp)
          sethumidity(data.main.humidity)
          const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          
        if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n' ){
            setWicon(cloud_icon)
          }
          else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n'|| data.weather[0].icon==='04d' || data.weather[0].icon==='04n' ){
            setWicon(drizzle_icon)
          }
          else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n' ||data.weather[0].icon==='010d' || data.weather[0].icon==='010n' ){
            setWicon(rain_icon)
          }
          else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n' ){
            setWicon(snow_icon)
          }
          else {
            setWicon(clear_icon)
          }
    }

  return (
    <div>
      <div className='container'>
        <div className='top-bar'>
           <input type='text' className='cityInput' placeholder='Search' />
           <div className='search-icon' onClick={()=>{search()}}>
              <img src={search_icon} alt='search'/>  
           </div>
        </div>
        <div className='weather-image'>
          <img src={wicon} alt />
        </div>
        <div className='weather-temp'>{temperature}°c</div>
        <div className='weather-location'>{cityName}</div>
        <div className='data-container'>
            <div className='element'>
              <img src={humidity_icon} alt='' className='icon'/>
              <div className='data'>
                <div className='humidity-percentage' >{humidity}%</div>
                <div className='text' >Humidity</div>
              </div>
            </div>
            <div className='element'>
              <img src={wind_speed} alt='' className='icon'/>
              <div className='data'>
                <div className='wind-speed' >{windSpeed} Km/hr</div>
                <div className='text' >Wind Speed</div>
              </div>
            </div>
        </div>

      </div>
      
    </div>
  )
}

export default Weatherapp
