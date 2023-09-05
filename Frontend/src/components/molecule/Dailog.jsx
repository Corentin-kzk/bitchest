import { useSelector, useDispatch } from 'react-redux'
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import DialogForm from '@utils/forms'
import {
  getDialogContent,
  getDialogIsOpen,
  hideDialogAction,
} from '../../reducers/dialogReducer'

export function GlobalDialog() {
  const isOpen = useSelector(getDialogIsOpen)
  const dialogContent = useSelector(getDialogContent)

  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(hideDialogAction())
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>{DialogForm[dialogContent]}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GlobalDialog
