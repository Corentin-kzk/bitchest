import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Euro, Percent } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { ApiError, globalError } from '../../../utils/globalErrors'
import { validationSchema } from '../../../utils/yupValidation'
import { sellCrypto } from '@api/crypto'
import { showAlertAction } from '../../../reducers/alertReducer'
import { MyUser_QK } from '@api/me'
import { floor, toNumber } from 'lodash'
import dayjs from 'dayjs'
import { MyWallet_QK, Mytransction_QK, getMytranctions } from '../../../api/me'

const SellForm = () => {
  const props = useSelector(getDialogProps)
  const { coin, wallet } = props
  const isSubmit = useSelector(isSubmited)
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const [selectedId, setSelectedId] = useState('')

  const mutation = useMutation(sellCrypto, {
    onSuccess: () => {
      dispatch(
        showAlertAction({
          status: 'success',
          message: `Bravo! Votre vente a été réalisé avec succès.`,
        })
      )
      queryClient.invalidateQueries({
        queryKey: [MyUser_QK, MyWallet_QK, Mytransction_QK],
      })
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

  const formik = useFormik({
    validationSchema: validationSchema.cryptoBuy,
    initialValues: { amount: '', price: '' },
    onSubmit: () => {
      mutation.mutateAsync({
        cryptoId: props.coin.id,
        transactionId: selectedId,
      })
    },
    validateOnChange: true,
  })

  const { handleSubmit, values, setFieldValue, errors, isSubmitting } = formik

  useEffect(() => {
    isSubmit && handleSubmit()
    !isSubmitting && isSubmit && dispatch(isSubmitAction(isSubmitting))
  }, [isSubmit, isSubmitting])

  const {
    data: transactions,
    isFetching: isTransactionsFetching,
    isError: isTransactionsError,
  } = useQuery({
    queryKey: [Mytransction_QK],
    queryFn: () => getMytranctions(1, props.coin.id, false),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    dispatch(isErrorAction(errors?.amount))
  }, [errors?.amount])

  const handleSelectedvalue = (value) => {
    setSelectedId(value)
    const transaction = transactions.data.find(
      (transaction) => transaction.id === value
    )

    setFieldValue('amount', transaction.amount)
    setFieldValue('price', transaction.price)
  }
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
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Cours :</Typography>
            </TableCell>

            <TableCell align='center'>
              <Typography variant='h6'>{coin?.price || 0}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Montant :</Typography>
            </TableCell>

            <TableCell align='center'>
              <Typography variant='h6'>{wallet?.amount || 0}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Valeurs :</Typography>
            </TableCell>

            <TableCell
              align='center'
              sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Typography variant='h6'>{wallet?.balance || 0}</Typography>
              <Euro fontSize='6px' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>Votre plus-value :</Typography>
            </TableCell>

            <TableCell align='center'>
              <Typography
                variant='h6'
                sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                color={
                  values.price / values.amount - coin.price > -1
                    ? 'primary'
                    : 'error'
                }
              >
                {values.price / values.amount - coin.price || 0}
                <Euro fontSize='6px' />
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <FormControl fullWidth>
        <InputLabel id='CryptoAmount'>Montant de {coin.label}</InputLabel>
        <Select
          labelId='CryptoAmount'
          id='CryptoAmount'
          value={selectedId}
          label='Montant de cryptomonaie'
          onChange={(e) => handleSelectedvalue(e.target.value)}
          disabled={transactions?.data.length >= 0}
        >
          {transactions?.data
            ?.filter((transaction) => {
              return transaction.owned === 1 && transaction.type === 'buy'
            })
            .map((transaction) => {
              return (
                <MenuItem key={transaction.id} value={transaction.id}>
                  {transaction.amount}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SellForm
