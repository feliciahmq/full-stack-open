/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0)

export const setNotification = (content, timeout) => {
  return (dispatch) => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000) 
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    addNotification(state, action) {
      const content = action.payload
      const id = getId()
      state.push({ content, id })
    },
    removeNotification(state, _action) {
      return state.slice(1)
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer