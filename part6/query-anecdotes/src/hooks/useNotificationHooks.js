import { useContext } from "react"
import NotificationContext from "../context/NotificationContext"

// customised hooks to use useContext

export const useNotifs = () => {
  const notifsAndDispatch = useContext(NotificationContext)
  return notifsAndDispatch[0]
}

const getId = () => (100000 * Math.random()).toFixed(0)

export const useNotifsHandler = () => {
  const notifsAndDispatch = useContext(NotificationContext)
  const dispatch = notifsAndDispatch[1]
  const id = getId()
  
  return (payload) => {
    dispatch({ type: 'ADD', payload: {
      ...payload, id
    } })
    setTimeout(() => {
      dispatch({ type: 'REMOVE', payload })
    }, 5000)
  }
}