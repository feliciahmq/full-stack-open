import { createSlice, current } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) { // auto generates action creators and action types that correspond to reducers & state
      const id = action.payload // payload is id since addVote(id)
      const anecToChange = state.find(a => a.id === id)
      const changedAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1
      }

      console.log(current(state))
      return state.map(a => a.id !== id ? a : changedAnec)
    },
    addAnecdote(state, action) { // action type: anecdotes/addAnecdote
      const content = action.payload
      state.push({ // redux toolkit uses Immer library with reducers created by createSlice, so can mutate state argument inside reducer
        content,
        id: getId(),
        votes: 0
      })
    }
  },
})

export const { addVote, addAnecdote } = anecdoteSlice.actions

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecToChange = state.find(a => a.id === id)
//       const changedAnec = {
//         ...anecToChange,
//         votes: anecToChange.votes + 1
//       }
//       return state.map(a => a.id !== id ? a : changedAnec)
//     }

//     case 'NEW_ANECDOTE': {
//       return state.concat(action.payload)
//     }

//     default: return state
//   }
// }

// action creators
// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: { 
//       content: content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export const upVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

export default anecdoteSlice.reducer