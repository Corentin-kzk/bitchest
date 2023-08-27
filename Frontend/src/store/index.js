import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userReducer'
import alertReducer from '../reducers/alertReducer'

export default configureStore({
  reducer: {
   user: userReducer,
   alert: alertReducer
  },
})