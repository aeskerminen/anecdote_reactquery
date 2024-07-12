import { createContext, useReducer } from 'react'

const notifcationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.payload
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notifcationReducer, {display: false, msg: ''})

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext