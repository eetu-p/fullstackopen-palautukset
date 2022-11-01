import axios from "axios"
const baseUrl = '/api/persons'

const getAllPersons = () => {
  const request = axios.get(`${baseUrl}`)
  return request.then(response => response.data)
}

const postPerson = object => {
  const request = axios.post(`${baseUrl}`, object)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const editPerson = (id, object) => {
  const request = axios.put(`${baseUrl}/${id}`, object)
  return request.then(response => response.data)
}

const returnObject = {
  getAllPersons,
  postPerson,
  deletePerson,
  editPerson
}
export default returnObject