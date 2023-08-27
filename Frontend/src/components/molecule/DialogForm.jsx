
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User_QK, createUser, editUser, getUser } from '../../api/users';
import { useFormik } from 'formik';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function DialogForm({ id, handleClose, isEdit = false }) {
    const userMutation = useMutation(isEdit ? editUser : createUser)
    const { data, isFetching, isError } = useQuery({
        queryKey: [User_QK],
        queryFn: () => getUser(id),
        enabled: !!id && isEdit
    })
    const queryClient = useQueryClient()

    const initialValue = isEdit ? {
        name: data?.name || '',
        email: data?.email || '',
        role: data?.role || 'user'
    } : {
        name: '',
        email: '',
        role: 'user'
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValue,
        onSubmit: async (values) => {
            await userMutation.mutateAsync(
                { values: values, id: id },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: [User_QK] })
                        handleClose()
                    }
                })

        },
    })

    const { handleSubmit } = formik
    return (
        <div>
            <Dialog open={!!id} onClose={handleClose} >
                {isEdit && <DialogTitle>Êtes-vous sûr de vouloir modifier {data?.name || 'cette utilisateur'}</DialogTitle>}
                {!isEdit && <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>}

                <Box component='form' onSubmit={handleSubmit} noValidate>
                    <DialogContent>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <TextField
                                id="name"
                                name='name'
                                label="Nom"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <TextField
                                id="email"
                                name='email'
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Box>
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                id="role"
                                name='role'
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Role"
                            >
                                <MenuItem value={'admin'}>Administrateur</MenuItem>
                                <MenuItem value={'user'}>Utilisateur</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Modifier</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}