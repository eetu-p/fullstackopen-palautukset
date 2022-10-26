import { useState } from "react"
import CountryInfo from "./CountryInfo"

const CountryList = ({ countries }) => {

  const [selectedCountry, setSelectedCountry] = useState()

  const handleClick = country => setSelectedCountry(country)

  return (
    <>
      {selectedCountry
      ? <CountryInfo country={selectedCountry} />
      : countries.map(country => {
          return (
            <div key={country.name.common}>
              <p style={{display: "inline-block"}}>{country.name.common}</p>
              <button onClick={() => handleClick(country)}>Show</button>
            </div>
          )
        })
      }
    </>
  )
}

export default CountryList