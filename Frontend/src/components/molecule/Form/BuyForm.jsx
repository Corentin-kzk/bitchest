import { Box, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'

const BuyForm = () => {
  const formik = useFormik({
    initialValues: { amount: null },
  })

  const { handleSubmit, values } = formik
  console.log('🚀 ~ file: BuyForm.jsx:10 ~ BuyForm ~ values:', values)
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <TextField
        id='amount'
        name='amount'
        label='montant'
        variant='standard'
        value={values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </Box>
  )
}

export default BuyForm
