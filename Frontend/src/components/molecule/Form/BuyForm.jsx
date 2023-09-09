import { Box, Button, TextField, Typography } from '@mui/material'
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
import { Euro } from '@mui/icons-material'
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
      mutation.mutateAsync({ amount: values.amount, id: props.coin.id })
    },
    validate: (values) => {
      const balanceAfterPurchase =
        props.user.wallet.balance - values.amount * props.coin.price

      if (balanceAfterPurchase < 0) {
        return { amount: globalError.negativeBalance }
      }

      return {}
    },
    validateOnChange: true,
  })

  const { handleSubmit, values, setFieldValue, errors, isSubmitting } = formik

  const handleMaxCrypto = () => {
    const cryptoAmount = props.user.wallet.balance / props.coin.price
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
        Acheter du {props.coin.label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Typography>
          Cour du {props.coin.label} : {props.coin.price}
        </Typography>
        <Euro fontSize='6' />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Typography>
          Votre solde :{' '}
          {(
            toNumber(props.user.wallet.balance) -
            values.amount * props.coin.price
          ).toLocaleString()}
        </Typography>
        <Euro fontSize='6' />
      </Box>
      <TextField
        id='amount'
        name='amount'
        label='montant'
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

      <Typography>
        Quantité de {props.coin.label} : {values.amount}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Typography>
          Prix en euro : {values.amount * props.coin.price}
        </Typography>
        <Euro fontSize='6' />
      </Box>
    </Box>
  )
}

export default BuyForm
