import Weather from "./Weather";

const Country = ({ country }) => {
  const languages = Object.entries(country.languages);

  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
          {languages.map(([key, value]) => <li key={key}>{value}</li>)}
        </ul>
        <img src={country.flags.png} alt='flag' height='200' width='250'/>
      </div>
      <Weather country={country}/>
    </div>
  )
}

export default Country;