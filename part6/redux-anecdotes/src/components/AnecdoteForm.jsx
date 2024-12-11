import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value // input name anecdote
    event.target.anecdote.value = '' // reset
    dispatch(addAnecdote(content))
    dispatch(setNotification(`created ${content}`, 5))
  }
  
  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm