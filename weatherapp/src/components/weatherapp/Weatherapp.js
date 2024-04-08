import React ,{useState}from 'react'
import './weatherapp.css'
import searchIcon from '../assets/search.png'
import humidityIcon from '../assets/humidity.png'
import windSpeedIcon from '../assets/wind.png'
import clear_icon from'../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import cloud_icon from '..//assets/cloud.png'


export const Weatherapp = () => {

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
          let response
          try{
              response = await fetch(url)
              let data = await response.json()
              if(data===undefined){
                console.log("Enter valid city name")
                return 0
              }
              setcityName(data.name)
              setTwindSpeed(data.wind.speed)
              setTemperature(data.main.temp)
              sethumidity(data.main.humidity)
              
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
        catch{
            console.log("Error in fetchiing data")     
            setTemperature(0)
            sethumidity(0)
            setTwindSpeed(0)
            setcityName("")
           
            alert("Please Enter Valid City Name")
        }
    }

  return (
    <div className='container'>
        <div className='leftContainer'>
            <div className='search-bar'>
                <div>
                  <input type='test' className='cityInput' placeholder='Search' />
                  <div className='search-icon' onClick={()=>search()} >
                      <img src={searchIcon} alt='search-icon' />
                  </div>
                </div>
                <div className='weather-image' >
                    <img src={wicon} alt='weatherimage' />
                </div>
            </div>
        </div>

        <div className='rightContainer'>

            <div className='container1'>
                <div className='temparature'>{temperature}°c</div>
                <div className='cityName'>{cityName}</div>
            </div>

            <div className='conatiner2'>
                <div className='element'>
                    <img src={humidityIcon} alt='humidity'/>
                    <div className='text'>
                        <div className='humidity'>{humidity}%</div>
                        <div>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={windSpeedIcon} alt='windSpeed' />
                    <div className='text'>
                        <div className='wind-speed'>{windSpeed} km/hr</div>
                        <div>WindSpeed</div>
                    </div>
                </div>
            </div>
            
            
        </div>

    </div>
  )
}
