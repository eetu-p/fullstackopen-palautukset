import { useEffect, useState } from 'react'
import AddPerson from './AddPerson';
import List from './List';
import Search from './Search';
import apiService from './services/api.service';
import Notification from './Notification';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")

  useEffect(() => {
    apiService.getAllPersons().then(personsData => setPersons(personsData))
  }, [])

  const handleSubmit = event => {
    event.preventDefault();
    const personObject = { 
      name: newName,
      number: newNumber
    }
    let personToEdit, confirmation;

    if (!persons.map(person => person.name).includes(newName)) {
      apiService.postPerson(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName("")
          setNewNumber("")
          setNotificationMessage(`${newPerson.name} added successfully.`)
        })
        .catch(() => alert("Error when adding person"))
    } else {
      confirmation = window.confirm(`${newName} is already in the list, edit the existing number?`) 
      if (confirmation) {
        personToEdit = persons.find(person => person.name === newName)
        apiService
          .editPerson(personToEdit.id, personObject)
          .then(editedPerson => {
            setPersons(persons.map(person => person.id === editedPerson.id ? editedPerson : person))
            setNewName("")
            setNewNumber("")
            setNotificationMessage(`${editedPerson.name} edited successfully.`)
          })
      }
    }

    if (notificationMessage) setTimeout(() => setNotificationMessage(""), 5000)
  }

  const handleDelete = id => {
    apiService.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setNotificationMessage(`${persons.find(person => person.id === id).name} deleted successfully.`)
      setTimeout(() => setNotificationMessage(""), 5000)
    })
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddPerson handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <List persons={persons} searchTerm={searchTerm} handleDelete={handleDelete} />
    </div>
  )

}

export default App
