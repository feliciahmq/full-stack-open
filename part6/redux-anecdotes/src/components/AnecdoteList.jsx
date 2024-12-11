import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteList = () => {
  const dispatch = useDispatch() // hook to make changes to (dispatch actions to) state of the Redux store defined in main.jsx
  const anecdotes = useSelector(state => {
    if ( state.filter !== 'ALL' ) {
      return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter)) // state now contains anecdotes & filter
    }

    return state.anecdotes
  }) 
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes) // sort before rendering

  const vote = async (anecdote) => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(addVote(updatedAnecdote)) // pass action creators that returns action object: (type, payload)
    dispatch(setNotification(`you vote '${updatedAnecdote.content}'`, 5))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList