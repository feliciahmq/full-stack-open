import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = async newPerson => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data);
}

const update = async (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then(response => response.data);
}

const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  delete: deletePerson,
}