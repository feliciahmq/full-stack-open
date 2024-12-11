import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    filterChange(state, action) { // action creator here
      return action.payload 
    }
  }
})

export const { filterChange } = filterSlice.actions

// const filterReducer = (state = 'ALL', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// // action creator used in Filter.jsx dispatch()
// export const filterChange = filter => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter,
//   }
// }

export default filterSlice.reducer