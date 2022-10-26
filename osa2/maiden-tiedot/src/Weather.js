import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({ country }) => {

  const [temperature, setTemperature] = useState("")
  const [wind, setWind] = useState("")
  const [iconUrl, setIconUrl] = useState("")

  useEffect(() => {
    const capital = country.capital[0]
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`)
      .then(response => {
        setTemperature(response.data.main.temp)
        setWind(response.data.wind.speed)
        setIconUrl(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      })
  }, [country.capital])

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature - {(parseFloat(temperature) - 273).toFixed(1)} C</p>
      <p>Wind - {wind} m/s</p>
      <img src={iconUrl} alt="Weather icon" />
    </div>
  )
}

export default Weather