import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User_QK, deleteUser, getUser } from '../../api/users';
import { DeleteForever } from '@mui/icons-material';
import { Box } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogDelete({ id, handleClose }) {
    const userMutation = useMutation(deleteUser)
    const { data, isFetching, isError } = useQuery({
        queryKey: [User_QK],
        queryFn: () => getUser(id),
        enabled: !!id
    })
    const queryClient = useQueryClient()

    const handleDelete = async () => {
        await userMutation.mutateAsync(
            { id: id },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: [User_QK] })
                    handleClose()

                }
            })
    }

    return (
        <Dialog
            open={!!id}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{`Supprimer ${data?.name} définitivement ?`}</DialogTitle>
            <DialogContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <DeleteForever sx={{ width: 100, height: 100 }} color='error' />
                <DialogContentText id="alert-dialog-slide-description" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    Les données associées à ce compte seront définitivement effacées et ne pouront pas être récupérées.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='secondary'>Refuser</Button>
                <Button onClick={handleDelete}>Suprimer</Button>
            </DialogActions>
        </Dialog>

    );
}