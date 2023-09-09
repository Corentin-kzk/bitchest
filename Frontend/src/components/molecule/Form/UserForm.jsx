import TextField from '@mui/material/TextField'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { User_QK, createUser, editUser, getUser } from '@api/users'
import { useFormik } from 'formik'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDialogProps,
  hideDialogAction,
  isErrorAction,
  isSubmitAction,
  isSubmited,
} from '../../../reducers/dialogReducer'
import { useEffect } from 'react'
import { showAlertAction } from '../../../reducers/alertReducer'
import { validationSchema } from '../../../utils/yupValidation'
import { ApiError } from '../../../utils/globalErrors'

export default function UserForm() {
  const props = useSelector(getDialogProps)
  const isSubmit = useSelector(isSubmited)
  const dispatch = useDispatch()

  const { id, isEdit = false } = props
  const userMutation = useMutation(isEdit ? editUser : createUser)
  const { data } = useQuery({
    queryKey: [User_QK],
    queryFn: () => getUser(id),
    enabled: !!id && isEdit,
  })
  const queryClient = useQueryClient()

  const initialValue = isEdit
    ? {
        name: data?.name || '',
        email: data?.email || '',
        role: data?.role || 'user',
      }
    : {
        name: '',
        email: '',
        role: 'user',
      }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: validationSchema.userAdminEdit,
    validateOnChange: true,
    onSubmit: async (values) => {
      await userMutation.mutateAsync(
        { values: values, id: id },
        {
          onSuccess: (value) => {
            dispatch(
              showAlertAction({
                status: 'success',
                message:
                  value.data.message ||
                  `Bravo ! L'utilisateur a été modifier avec succés.`,
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
    },
  })

  const { handleSubmit, isSubmitting, errors } = formik

  useEffect(() => {
    const globalErrors = !!errors?.name || !!errors?.email || !!errors?.role
    dispatch(isErrorAction(globalErrors))
  }, [errors])
  useEffect(() => {
    isSubmit && handleSubmit()
    !isSubmitting && isSubmit && dispatch(isSubmitAction(isSubmitting))
  }, [isSubmit, isSubmitting])
  return (
    <>
      {isEdit && (
        <DialogTitle>
          Êtes-vous sûr de vouloir modifier {data?.name || 'cette utilisateur'}
        </DialogTitle>
      )}
      {!isEdit && <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>}

      <Box component='form' onSubmit={handleSubmit} noValidate>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 'calc(100% + 20px)',
            }}
          >
            <TextField
              id='name'
              name='name'
              label='Nom'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              id='email'
              name='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id='demo-simple-select-label'>Role</InputLabel>
            <Select
              id='role'
              name='role'
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Role'
              error={!!errors.role}
              helperText={errors.role}
            >
              <MenuItem value={'admin'}>Administrateur</MenuItem>
              <MenuItem value={'user'}>Utilisateur</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Box>
    </>
  )
}
