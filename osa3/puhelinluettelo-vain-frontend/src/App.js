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
  const [notification, setNotification] = useState({message: "", isError: false})

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
          setNotification({
            message: `${newPerson.name} added successfully.`, 
            isError: false
          })
        })
        .catch(error => {
          console.error(error)
          setNotification({
            message: error.response.data.error, 
            isError: true
          })
        })
        .then(() => setTimeout(() => setNotification({message: "", isError: false}), 5000))
    } else {
      confirmation = window.confirm(`${newName} is already in the list, edit the existing number?`) 
      if (confirmation) {
        personToEdit = persons.find(person => person.name === newName)
        apiService
          .editPerson(personToEdit.id, personObject)
          .then((editedPerson) => {
            setPersons(persons.map(person => person.id === personToEdit.id ? editedPerson : person))
            setNotification({
              message: `${newName} edited successfully.`, 
              isError: false
            })
          })
          .catch(() => {
            setPersons(persons.filter(person => person.id !== personToEdit.id))
            setNotification({
              message: `${newName} has already been removed from the server.`,
              isError: true
            })
          })
          .then(() => {
            setNewName("")
            setNewNumber("")
            setTimeout(() => setNotification({message: "", isError: false}), 5000)
          })
      }
    }
  }

  const handleDelete = id => {
    apiService.deletePerson(id)
      .then(() => {
        setNotification({
          message: `${persons.find(person => person.id === id).name} deleted successfully.`, 
          isError: false
        })
      })
      .catch(() => {
        setNotification({
          message: `${persons.find(person => person.id === id).name} has already been deleted from the server.`, 
          isError: true
        })
      })
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => setNotification({message: "", isError: false}), 5000)
      })
  }

  return (
    <div>
      <Notification message={notification.message} isError={notification.isError} />
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddPerson handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <List persons={persons} searchTerm={searchTerm} handleDelete={handleDelete} />
    </div>
  )

}

export default App
