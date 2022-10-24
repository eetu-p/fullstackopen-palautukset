import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = event => {
    event.preventDefault();
    setPersons([
      ...persons,
      { name: newName }
    ])
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={event => handleSubmit(event)}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={event => setNewName(event.target.value)} 
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
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )

}

export default App
