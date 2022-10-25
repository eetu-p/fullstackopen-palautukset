import axios from 'axios';
import { useEffect, useState } from 'react';
import Countries from './Countries';

function App() {

  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data))
  }, [])

  const handleSearch = (event) => setSearchTerm(event.target.value)

  return (
    <div>
      <b>Search countries: </b> 
      <input 
        value={searchTerm} 
        onChange={event => handleSearch(event)}
      />
      <div>
        <h2>Results</h2>
        {<Countries 
          countries={countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))} 
         />
        }
      </div>
    </div>
  );
}

export default App;
