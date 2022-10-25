const CountryInfo = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>Capital - {country.capital}</p>
    <p>Area - {country.area}</p>

    <h2>Languages</h2>
    {Object.keys(country.languages).map(lang => <p key={country.languages[lang]}>{country.languages[lang]}</p>)}
    
    <img src={country.flags.png} alt="Flag" />
  </div>
)

export default CountryInfo