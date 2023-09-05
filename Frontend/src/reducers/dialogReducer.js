import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    showDialog: false,
    dialogContent: {},
    formProps: {},
    isSubmit: false,
    isError: false,
  },
  reducers: {
    showDialogAction: (state, action) => {
      state.showDialog = true
      state.dialogContent = {
        formName: action.payload.formName,
        dialogProps: action.payload.dialogProps,
      }
      state.formProps = action.payload.formProps
    },
    hideDialogAction: (state) => {
      state.showDialog = false
      state.dialogContent = {
        formName: '',
        dialogProps: {},
      }
    },
    isSubmitAction: (state, action) => {
      state.isSubmit = action.payload
    },
    isErrorAction: (state, action) => {
      state.isError = !!action.payload
    },
  },
})

export const {
  showDialogAction,
  hideDialogAction,
  isSubmitAction,
  isErrorAction,
} = dialogSlice.actions

export const getDialogIsOpen = (state) => state.dialog.showDialog
export const getDialogContent = (state) => state.dialog.dialogContent
export const getDialogProps = (state) => state.dialog.formProps
export const isSubmited = (state) => state.dialog.isSubmit
export const isError = (state) => state.dialog.isError

export default dialogSlice.reducer
