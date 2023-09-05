import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import DialogForm from '@utils/forms'
import {
  getDialogContent,
  getDialogIsOpen,
  hideDialogAction,
  isSubmitAction,
} from '../../reducers/dialogReducer'

export function GlobalDialog() {
  const isOpen = useSelector(getDialogIsOpen)
  const dialogContent = useSelector(getDialogContent)

  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(hideDialogAction())
  }

  const handleSubmit = () => {
    dispatch(isSubmitAction())
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>{DialogForm[dialogContent.formName]}</DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color='primary'>
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
