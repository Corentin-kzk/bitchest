import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    showAlert: false,
    alertMessage: '',
    alertStatus: '',
  },
  reducers: {
    showAlertAction: (state, action) => {
      state.showAlert = true
      state.alertMessage = action.payload.message
      state.alertStatus = action.payload.status
    },
    hideAlertAction: (state) => {
      state.showAlert = false
      state.alertMessage = ''
    },
  },
})

export const { showAlertAction, hideAlertAction } = alertSlice.actions
export default alertSlice.reducer
