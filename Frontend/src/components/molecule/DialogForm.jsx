
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery } from '@tanstack/react-query';
import { User_QK, getUser } from '../../api/users';

export default function DialogForm({id, handleClose}) {

    const {data, isFetching, isError} = useQuery({
        queryKey: [User_QK],
        queryFn: () => getUser(id)
    })
    console.log("🚀 ~ file: DialogForm.jsx:20 ~ DialogForm ~ isError:", isError)
    console.log("🚀 ~ file: DialogForm.jsx:20 ~ DialogForm ~ isFetching:", isFetching)
    console.log("🚀 ~ file: DialogForm.jsx:20 ~ DialogForm ~ data:", data)

  return (
    <div>
      <Dialog open={!!id} onClose={handleClose} >
        <DialogTitle>Subscribe {id}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}