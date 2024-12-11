import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) { // auto generates action creators and action types that correspond to reducers & state
      const updatedAnecdote = action.payload
      return state.map(a => 
        a.id === updatedAnecdote.id ? updatedAnecdote : a
      )
    },
    addAnecdote(state, action) { // action type: anecdotes/addAnecdote
      state.push( // redux toolkit uses Immer library with reducers created by createSlice, so can mutate state argument inside reducer
        action.payload // new anecdote alr created in backend createNew
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

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