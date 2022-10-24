import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "0441234567" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = event => {
    event.preventDefault();
    if (!persons.map(person => person.name).includes(newName)) {
      setPersons([
        ...persons,
        { 
          name: newName,
          number: newNumber
        }
      ])
      setNewName("")
      setNewNumber("")
    } else {
      alert(`${newName} is already in the list.`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <h2>Search</h2>
        Filter names: <input
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)} 
                      />
      </div>
      <form onSubmit={event => handleSubmit(event)}>
        <h2>Add new number</h2>
        <div>
          name: <input 
                  value={newName} 
                  onChange={event => setNewName(event.target.value)} 
                />
        </div>
        <div>
          number: <input 
                    value={newNumber}
                    onChange={event => setNewNumber(event.target.value)}
                  />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons
          .filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(person => <p key={person.name}>{person.name} {person.number}</p>)
        }
      </div>
    </div>
  )

}

export default App
