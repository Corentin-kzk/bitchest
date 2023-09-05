import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/userReducer'
import alertReducer from '../reducers/alertReducer'
import dialogReducer from '../reducers/dialogReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    dialog: dialogReducer,
  },
})
