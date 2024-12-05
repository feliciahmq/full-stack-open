import { useState, useEffect } from 'react';
import personService from './services/persons';
import './index.css';

const Filter = ({ search, handleChange }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handleChange} />
    </div>
  )
}

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Notification = ({ message }) => {
  if (message == null) {
    return null;
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const PersonForm = ({ onSubmit, name, handleName, num, handleNum }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={handleName} />
      </div>
      <div>
        number: <input value={num} onChange={handleNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person, index) => (
        <p key={index}>{person.name} {person.number} <Button text='delete' handleClick={() => deletePerson(person.id)}/></p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [errorMessaage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('API Response: ', initialPersons)
        if (Array.isArray(initialPersons)) {
          setPersons(initialPersons)
        } else {
          console.error('Wrong response format')
        }
      })
      .catch(error => {
        console.error('Error fetching: ', error)
      })
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const nameFound = persons.find(
      e => e.name.toLowerCase() == newPerson.name.toLowerCase()
    );
    const numFound = persons.find(
      e => e.number.toLowerCase() == newPerson.number.toLowerCase()
    );

    if (nameFound) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPersons = { ...nameFound, number: newNumber};
        personService
          .update(nameFound.id, updatedPersons)  
          .then(() => {
            setPersons(
              persons.map(e => e.id != nameFound.id ? e : updatedPersons)
            );
            setNewName('');
            setNewNumber('');
            setErrorMessage(
              `Replaced ${newPerson.name}'s number` 
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              setErrorMessage(
                `Information of ${newPerson.name} has already been removed from server` 
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }
          })
      }
    } else if (numFound) {
      window.alert(`${newNumber} is already added to phonebook`);
    } else {
      personService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('');
          setNewNumber('');
          setErrorMessage(
            `Added ${newPerson.name}` 
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            setErrorMessage(
              `Information of ${newPerson.name} has already been removed from server` 
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
        })
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(e => e.id == id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .delete(id)
        .then(() => {
          setPersons(persons.filter(e => e.id != id))
          setErrorMessage(
            `Information of ${personToDelete.name} has been removed from server` 
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const filterPerson = persons.filter(e => e.name.toLowerCase().startsWith(filterName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessaage} />
    
      <Filter search={filterName} handleChange={handleFilter}/>

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={addPerson} 
        name={newName} 
        handleName={handleNewName} 
        num={newNumber} 
        handleNum={handleNewNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={filterPerson} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;