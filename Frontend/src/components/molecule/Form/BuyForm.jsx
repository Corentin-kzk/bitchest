import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { getDialogProps, isSubmited } from '../../../reducers/dialogReducer'
import { useQuery } from '@tanstack/react-query'
import { Euro } from '@mui/icons-material'
import { useEffect } from 'react'

const BuyForm = () => {
  const props = useSelector(getDialogProps)
  const isSubmit = useSelector(isSubmited)
  const formik = useFormik({
    initialValues: { amount: '0' },
    onSubmit: (values) => {
      console.log('🚀 ~ file: BuyForm.jsx:17 ~ BuyForm ~ values:', values)
    },
  })

  const { handleSubmit, values, setFieldValue } = formik
  const handleMaxCrypto = () => {
    setFieldValue(
      'amount',
      (props.user.wallet.balance / props.coin.price).toFixed(4)
    )
  }

  useEffect(() => {
    isSubmit && handleSubmit()
  }, [isSubmit])

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
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
            +props.user.wallet.balance -
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
      />
      <Button variant='contained' onClick={handleMaxCrypto}>
        Max
      </Button>
      <Typography>
        Quantité de {props.coin.label} : {values.amount}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Typography>
          <Typography>
            Prix en euro : {values.amount * props.coin.price}
          </Typography>
        </Typography>
        <Euro fontSize='6' />
      </Box>
    </Box>
  )
}

export default BuyForm
