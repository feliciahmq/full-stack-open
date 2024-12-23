import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes' // json-server

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content: content,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

const anecdoteService = { getAll, createNew, update }
export default anecdoteService