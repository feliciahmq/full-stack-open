import { useState } from 'react'

const Filter = ({ search, handleChange }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handleChange} />
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

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person, index) => (
        <p key={index}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

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

    const nameCheck = persons.find(
      e => e.name.toLowerCase() == newPerson.name.toLowerCase()
    );
    const numCheck = persons.find(
      e => e.number.toLowerCase() == newPerson.number.toLowerCase()
    );
    if (nameCheck) {
      window.alert(`${newName} is already added to phonebook`);
    } else if (numCheck) {
      window.alert(`${newNumber} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }

  const filterPerson = persons.filter(
    e => e.name.toLowerCase().startsWith(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
    
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
      
      <Persons persons={filterPerson}/>
    </div>
  )
}

export default App;