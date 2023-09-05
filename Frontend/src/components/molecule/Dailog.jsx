import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import DialogForm from '@utils/forms'
import {
  getDialogContent,
  getDialogIsOpen,
  hideDialogAction,
  isError,
  isSubmitAction,
} from '../../reducers/dialogReducer'

export function GlobalDialog() {
  const isOpen = useSelector(getDialogIsOpen)
  const dialogContent = useSelector(getDialogContent)
  const isDisabled = useSelector(isError)

  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(hideDialogAction())
  }

  const handleSubmit = () => {
    console.log('🚀 ~ file: Dailog.jsx:28 ~ handleSubmit ~ submit')
    dispatch(isSubmitAction(true))
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>{DialogForm[dialogContent.formName]}</DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color='primary' disabled={isDisabled}>
          {dialogContent.dialogProps?.submitLabel || 'Envoyer'}
        </Button>
        <Button onClick={handleClose} color='primary'>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GlobalDialog
