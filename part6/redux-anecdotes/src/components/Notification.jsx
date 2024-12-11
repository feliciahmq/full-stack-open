import { useSelector } from "react-redux"

const Notification = () => {
  
  const notificationArray = useSelector(state => state.notification) // extract data from Redux store state

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notificationArray.length === 0) {
    return null
  }

  console.log(notificationArray[0].content)
  
  return (
    <div style={style}>
      {notificationArray[0].content}
    </div>
  )
}

export default Notification