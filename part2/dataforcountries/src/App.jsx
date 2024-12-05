import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    console.log('fetching countries...');
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  return (
    <div>
      <Filter search={search} handleChange={handleSearch}/>
      <Countries search={search} countries={countries} />
    </div>
  )
}

export default App
