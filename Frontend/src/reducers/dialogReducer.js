import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    showDialog: false,
    dialogContent: null,
  },
  reducers: {
    showDialogAction: (state, action) => {
      state.showDialog = true
      state.dialogContent = action.payload
    },
    hideDialogAction: (state) => {
      state.showDialog = false
      state.dialogMessage = null
    },
  },
})

export const { showDialogAction, hideDialogAction } = dialogSlice.actions

export const getDialogIsOpen = (state) => state.dialog.showDialog
export const getDialogContent = (state) => state.dialog.dialogContent

export default dialogSlice.reducer
