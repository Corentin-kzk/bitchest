/* eslint-disable react/prop-types */
import DialogContentText from '@mui/material/DialogContentText'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { User_QK, deleteUser, getUser } from '@api/users'
import { DeleteForever } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDialogProps,
  hideDialogAction,
  isSubmitAction,
  isSubmited,
} from '../../../reducers/dialogReducer'
import { useEffect } from 'react'
import { showAlertAction } from '../../../reducers/alertReducer'

export default function DeleteForm() {
  const props = useSelector(getDialogProps)
  const isSubmit = useSelector(isSubmited)

  const { id } = props
  const dispatch = useDispatch()
  const userMutation = useMutation(deleteUser)
  const { data } = useQuery({
    queryKey: [User_QK],
    queryFn: () => getUser(id),
    enabled: !!id,
  })
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    await userMutation.mutateAsync(
      { id: id },
      {
        onSuccess: () => {
          dispatch(
            showAlertAction({
              status: 'success',
              message: `Bravo ! L'utilisateur a été supprimé avec succés.`,
            })
          )
          queryClient.invalidateQueries({ queryKey: [User_QK] })
        },
        onError: (error) => {
          dispatch(
            showAlertAction({
              status: 'error',
              message:
                error.code === 404
                  ? ApiError.pleaseTryLater
                  : error.response?.data?.message,
            })
          )
        },
        onSettled: () => {
          dispatch(hideDialogAction())
        },
      }
    )
  }

  useEffect(() => {
    isSubmit && handleDelete()
    isSubmit && dispatch(isSubmitAction(!isSubmit))
  }, [isSubmit])
  return (
    <>
      <Typography
        component={'h1'}
        variant='H3'
      >{`Supprimer ${data?.name} définitivement ?`}</Typography>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DeleteForever sx={{ width: 100, height: 100 }} color='error' />
        <DialogContentText
          id='alert-dialog-slide-description'
          sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
        >
          Les données associées à ce compte seront définitivement effacées et ne
          pouront pas être récupérées.
        </DialogContentText>
      </Box>
    </>
  )
}
