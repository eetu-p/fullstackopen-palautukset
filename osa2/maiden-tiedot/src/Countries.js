import CountryInfo from "./CountryInfo"
import CountryList from "./CountryList"

const Countries = ({ countries }) => {

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  } else if (countries.length <= 10) {
    return <CountryList list={countries.map(country => country.name.common)} />
  } else {
    return <p>Too many results, use a more specific term</p>
  }
}

export default Countries