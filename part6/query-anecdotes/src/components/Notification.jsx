import { useNotifs } from "../hooks/useNotificationHooks"

const Notification = () => {
  const notis = useNotifs()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notis.length === 0) return null

  return (
    <div style={style}>
      {notis.map(n => 
        <div key={n.id}>{n.content}</div>
      )}
    </div>
  )
}

export default Notification
