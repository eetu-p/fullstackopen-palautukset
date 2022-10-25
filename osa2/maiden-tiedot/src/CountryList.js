const CountryList = ({ list }) => (
  <>
    {list.map(countryName => <p key={countryName}>{countryName}</p>)}
  </>
)

export default CountryList