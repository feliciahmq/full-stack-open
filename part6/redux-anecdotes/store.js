import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './src/reducers/anecdoteReducer'
import filterReducer from './src/reducers/filterReducer'
import notificationReducer from './src/reducers/notificationReducer'

// combined reducer, every action gets handled in every part of the combined reducer
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store