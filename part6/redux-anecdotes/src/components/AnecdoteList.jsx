import { useDispatch, useSelector } from "react-redux"
import { upVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch() // hook to make changes to (dispatch actions to) state of the Redux store defined in main.jsx
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes) // sort before rendering

  const vote = (id) => {
    console.log('vote', id)
    dispatch(upVote(id)) // use action creators that returns action object: (type, payload), then it matches type in reducer
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList