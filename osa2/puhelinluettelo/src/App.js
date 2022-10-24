import { useState } from 'react'
import AddPerson from './AddPerson';
import List from './List';
import Search from './Search';

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
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddPerson handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <List persons={persons} searchTerm={searchTerm} />
    </div>
  )

}

export default App
