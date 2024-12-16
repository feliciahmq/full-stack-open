/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return state.concat({ content: action.payload.content, id: action.payload.id })
    case "REMOVE":
      return state.filter(notification => notification.id !== action.payload.id)
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, [])

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext