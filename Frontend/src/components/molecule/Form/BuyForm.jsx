import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDialogProps,
  hideDialogAction,
  isErrorAction,
  isSubmitAction,
  isSubmited,
} from '../../../reducers/dialogReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CurrencyExchange,
  Euro,
  QueryStats,
  Savings,
  Wallet,
} from '@mui/icons-material'
import { useEffect } from 'react'
import { ApiError, globalError } from '../../../utils/globalErrors'
import { validationSchema } from '../../../utils/yupValidation'
import { buyCrypto } from '@api/crypto'
import { showAlertAction } from '../../../reducers/alertReducer'
import { MyUser_QK } from '@api/me'
import { floor, toNumber } from 'lodash'
import { MyWallet_QK } from '../../../api/me'

const BuyForm = () => {
  const props = useSelector(getDialogProps)
  const isSubmit = useSelector(isSubmited)
  const queryClient = useQueryClient()

  const { user, coin } = props
  const mutation = useMutation(buyCrypto, {
    onSuccess: () => {
      dispatch(
        showAlertAction({
          status: 'success',
          message: `Bravo! Votre achat a été réalisé avec succès.`,
        })
      )
      queryClient.invalidateQueries({ queryKey: [MyUser_QK] })
      queryClient.invalidateQueries({ queryKey: [MyWallet_QK] })
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
  })
  const dispatch = useDispatch()
  const formik = useFormik({
    validationSchema: validationSchema.cryptoBuy,
    initialValues: { amount: '' },
    onSubmit: (values) => {
      mutation.mutateAsync({ amount: values.amount, id: coin.id })
    },
    validate: (values) => {
      const balanceAfterPurchase =
        user.wallet.balance - values.amount * coin.price

      if (balanceAfterPurchase < 0) {
        return { amount: globalError.negativeBalance }
      }

      return {}
    },
    validateOnChange: true,
  })

  const { handleSubmit, values, setFieldValue, errors, isSubmitting } = formik

  const handleMaxCrypto = () => {
    const cryptoAmount = user.wallet.balance / coin.price
    setFieldValue('amount', floor(cryptoAmount, 2))
  }

  useEffect(() => {
    isSubmit && handleSubmit()
    !isSubmitting && isSubmit && dispatch(isSubmitAction(isSubmitting))
  }, [isSubmit, isSubmitting])

  useEffect(() => {
    dispatch(isErrorAction(errors.amount))
  }, [errors.amount])

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, minWidth: '25ch' },
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete='off'
    >
      <Typography component='h1' variant='h4'>
        Acheter du {coin.label}
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Cours:</Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Typography variant='h6'>{coin.price}</Typography>
                <Euro fontSize='6px' />
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Solde :</Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Typography variant='h6'>
                  {toNumber(user.wallet.balance).toLocaleString()}
                </Typography>
                <Euro fontSize='6px' />
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Solde apres achat :</Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Typography variant='h6'>
                  {(
                    toNumber(user.wallet.balance) -
                    values.amount * coin.price
                  ).toLocaleString()}
                </Typography>
                <Euro fontSize='6px' />
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Valeurs :</Typography>
            </TableCell>
            <TableCell
              sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Typography variant='h6'>
                {toNumber(values.amount * coin.price).toLocaleString()}
              </Typography>
              <Euro fontSize='6px' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <TextField
        id='amount'
        name='amount'
        label={`Montant de ${coin.label}`}
        variant='standard'
        type='number'
        value={values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={!!errors.amount}
        helperText={errors.amount}
        InputProps={{
          endAdornment: <Button onClick={handleMaxCrypto}>Max</Button>,
        }}
      />
    </Box>
  )
}

export default BuyForm
