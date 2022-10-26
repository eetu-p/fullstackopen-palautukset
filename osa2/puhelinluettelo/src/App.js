import axios from 'axios';
import { useEffect, useState } from 'react'
import AddPerson from './AddPerson';
import List from './List';
import Search from './Search';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = event => {
    event.preventDefault();
    let personObject;

    if (!persons.map(person => person.name).includes(newName)) {
      personObject = { 
        name: newName,
        number: newNumber
      }
      axios
        .post("http://localhost:3001/persons", personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
        })
        .catch(() => alert("Error when adding person"))
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
