import { useContext, useEffect, useState } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [id, setID] = useState("")
  const [notification, notificationDispatch] = useContext(NotificationContext)
  
  useEffect(() => {
    clearTimeout(id)
    setID("")
  }, [notification.msg])

  if (notification.display === false) return null
  
  if(id === "") {
    let timeoutID = setTimeout(() => {
      notificationDispatch({type: 'SET', payload: {display: false, msg: ''}})
      setID("")
    }, 5000)
    setID(timeoutID)
  }
  
  return (
    <div style={style}>
      {notification.msg}
    </div>
  )
}

export default Notification
