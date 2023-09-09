import { useDispatch, useSelector } from 'react-redux'
import {
  hideDialogAction,
  isErrorAction,
  isSubmitAction,
  isSubmited,
} from '../../../reducers/dialogReducer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyUser } from '@api/me'
import { MyUser_QK } from '@api/me'
import { Loader } from '@components/atom/Loader'
import { useFormik } from 'formik'
import {
  Box,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { validationSchema } from '../../../utils/yupValidation'
import { useEffect, useState } from 'react'
import { showAlertAction } from '../../../reducers/alertReducer'
import { ApiError } from '../../../utils/globalErrors'
import {
  AccountCircle,
  Email,
  Euro,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { isEmpty } from 'lodash'
import { updateMe } from '../../../api/me'

export default function UserMeForm() {
  const isSubmit = useSelector(isSubmited)
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [tabPanelId, setTabPanelId] = useState('1')

  const handleChange = (_, newValue) => {
    setTabPanelId(newValue)
  }

  const userMutation = useMutation(updateMe)
  const { data, isFetching } = useQuery({
    queryKey: [MyUser_QK],
    queryFn: () => getMyUser(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  const queryClient = useQueryClient()

  const initialValues =
    data?.name && !isFetching
      ? {
          name: data.name,
          email: data?.email,
          balance: '',
          password: '',
          confirmPassword: '',
        }
      : {
          name: '',
          email: '',
          balance: '',
          password: '',
          confirmPassword: '',
        }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema.userMeEdit,
    onSubmit: async (values) => {
      const { name, email, balance, password, confirmPassword } = values

      await userMutation.mutateAsync(
        {
          name,
          email,
          balance,
          password,
          confirmPassword,
        },
        {
          onSuccess: () => {
            dispatch(
              showAlertAction({
                status: 'success',
                message: `Bravo ! L'utilisateur a été modifier avec succés.`,
              })
            )
            queryClient.invalidateQueries({ queryKey: [MyUser_QK] })
          },
          onError: () => {
            dispatch(
              showAlertAction({
                status: 'error',
                message: ApiError.pleaseTryLater,
              })
            )
          },
          onSettled: () => {
            dispatch(hideDialogAction())
          },
        }
      )
    },
    validateOnBlur: true,
    validateOnMount: false,
    enableReinitialize: true,
  })

  const { handleSubmit, isSubmitting, errors, values } = formik

  useEffect(() => {
    isSubmit && handleSubmit()
    isSubmit && !isSubmitting && dispatch(isSubmitAction(isSubmitting))
  }, [isSubmit, isSubmitting])

  useEffect(() => {
    dispatch(isErrorAction(!isEmpty(errors)))
  }, [errors])

  return (
    <>
      {isFetching && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <Loader />
        </Box>
      )}
      {!isFetching && (
        <>
          <TabContext value={tabPanelId}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='Acount-and-balance'>
                <Tab label='Compte' value='1' />
                <Tab label='Solde' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <Typography component={'h1'} variant='h4'>
                  Modifiez votre compte
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                  }}
                >
                  <TextField
                    id='name'
                    name='name'
                    label='Nom'
                    fullWidth
                    sx={{ width: '30ch' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.name}
                    helperText={formik.errors.name}
                  />
                  <TextField
                    fullWidth
                    id='email'
                    name='email'
                    label='Email'
                    sx={{ width: '30ch' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.email}
                    helperText={formik.errors.email}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                  }}
                >
                  <TextField
                    id='password'
                    name='password'
                    label='Nouveau mot de passe'
                    sx={{ width: '30ch' }}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.password}
                    helperText={formik.errors.password}
                  />
                  <TextField
                    id='confirmPassword'
                    name='confirmPassword'
                    label='Confirmer le mot de passe'
                    sx={{ width: '30ch' }}
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            onMouseDown={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.confirmPassword}
                    helperText={formik.errors.confirmPassword}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              {' '}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <Typography component={'h1'} variant='h4'>
                  Ajouter des fonds
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    id='balance'
                    name='balance'
                    label='Solde de votre compte'
                    fullWidth
                    type='number'
                    sx={{ width: '30ch' }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Euro />
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.balance}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={!!formik.errors.balance}
                    helperText={formik.errors.balance}
                  />
                </Box>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant='h6'>Votre solde :</Typography>
                      </TableCell>

                      <TableCell align='center'>
                        <Typography variant='h6'>
                          {(
                            +data.wallet.balance + +values.balance
                          ).toLocaleString('fr-FR')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </TabPanel>
          </TabContext>
        </>
      )}
    </>
  )
}
