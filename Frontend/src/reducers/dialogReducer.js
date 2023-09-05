import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    showDialog: false,
    dialogContent: {},
    formProps: {},
    isSubmit: false,
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
      state.dialogContent = null
    },
    isSubmitAction: (state) => {
      state.isSubmit = true
    },
  },
})

export const { showDialogAction, hideDialogAction, isSubmitAction } =
  dialogSlice.actions

export const getDialogIsOpen = (state) => state.dialog.showDialog
export const getDialogContent = (state) => state.dialog.dialogContent
export const getDialogProps = (state) => state.dialog.formProps
export const isSubmited = (state) => state.dialog.isSubmit
export default dialogSlice.reducer
