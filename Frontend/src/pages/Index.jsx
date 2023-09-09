import { useQuery } from '@tanstack/react-query'
import { Crypto_QK, getCryptos } from '../api/crypto'
import {
  Box,
  Button,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { Loader } from '@components/atom/Loader'
import { Navigate, useNavigate } from 'react-router-dom'
import { ApiError } from '../utils/globalErrors'
import { useState } from 'react'
import { Euro } from '@mui/icons-material'
import { linkUrl } from '../utils/linkUrl'

const columns = [
  {
    id: 'label',
    label: (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography fontSize='12px'>Nom</Typography>{' '}
      </Box>
    ),
    minWidth: 170,
  },
  {
    id: 'price',
    label: (
      <Box sx={{ display: 'flex' }}>
        <Euro></Euro>
      </Box>
    ),
    minWidth: 170,
  },
  {
    id: 'link',
    label: '',
  },
]

const IndexPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const {
    data: cryptoCurrencies,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [Crypto_QK, searchValue],
    queryFn: () => getCryptos(searchValue),
    refetchOnWindowFocus: false,
  })

  const navigate = useNavigate()
  if (isError) return <Navigate to={'/500'} />
  return (
    <Paper sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box
          component='form'
          noValidate
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <FormControl sx={{ mx: 1 }} variant='standard'>
            <TextField
              margin='normal'
              fullWidth
              id='search'
              label='search'
              name='search'
              autoComplete='search'
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </FormControl>
        </Box>
      </Box>
      <TableContainer sx={{ minHeight: '74vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {isFetching && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        my: '10px',
                      }}
                    >
                      <Loader />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {!isFetching &&
                !isError &&
                cryptoCurrencies.map((row) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id]
                        switch (column.id) {
                          case 'label':
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                  }}
                                >
                                  <img src={row.logo} />
                                  <Typography>
                                    {value}{' '}
                                    <Typography
                                      component='span'
                                      fontSize={'10px'}
                                    >
                                      ({row.symbol})
                                    </Typography>
                                  </Typography>
                                </Box>
                              </TableCell>
                            )
                          case 'price':
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                  }}
                                >
                                  <Typography>{value}</Typography>
                                  <Euro fontSize='8px' />
                                </Box>
                              </TableCell>
                            )
                          case 'link':
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  onClick={() =>
                                    navigate(
                                      linkUrl.cryptoId.replace(':id', row.id)
                                    )
                                  }
                                >
                                  {row.label}
                                </Button>
                              </TableCell>
                            )
                          default:
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            )
                        }
                      })}
                    </TableRow>
                  )
                })}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default IndexPage
