import Country from "./Country";
import Button from "./Button";
import { useState } from "react";

const Countries = ({ search, countries }) => {
  const [show, setShow] = useState(null);
  
  let results = [];

  if (search) {
    results = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()));
  } else {
    results = countries;
  }

  if (results.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (results.length == 1) {
    return <Country country={results[0]} />
  }else {
    return (
      <div>
        {results.map(r => 
          <p key={r.name.common}>
            {r.name.common} 
            <Button 
              text={show == r.name.common ? 'hide' : 'show'} 
              handleClick={() => 
                setShow(show == r.name.common ? null : r.name.common)
              } 
            />
            {show == r.name.common && <Country country={r} />}
          </p> 
        )}
      </div>
    )
  }
}

export default Countries;