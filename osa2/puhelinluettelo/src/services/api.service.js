import axios from "axios"

const getAllPersons = () => {
  const request = axios.get("http://localhost:3001/persons")
  return request.then(response => response.data)
}

const postPerson = object => {
  const request = axios.post("http://localhost:3001/persons", object)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const request = axios.delete(`http://localhost:3001/persons/${id}`)
  return request.then(response => response.data)
}

export default {
  getAllPersons,
  postPerson,
  deletePerson
}