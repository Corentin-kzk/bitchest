import { useQuery } from '@tanstack/react-query'
import { MyWallet_QK, getMyWallet } from '../api/me'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { Euro } from '@mui/icons-material'
import { Loader } from '@components/atom/Loader'
import PieChart from '../components/atom/PieChart'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { red } from '@mui/material/colors'

function WalletPage() {
  const cryptoWalletRef = useRef({ series: [], labels: [] })
  const [chartRenderType, setChartRenderType] = useState('crypto')
  const [historyRenderType, setHistoryRenderType] = useState('all')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const [cryptoHistories, setCryptoHistories] = useState([])
  const { data, isFetching } = useQuery({
    queryKey: [MyWallet_QK],
    queryFn: () => getMyWallet(),
    refetchOnWindowFocus: false,
  })

  const handleCryptoHistory = (cryptoLabel) => {
    const histories = data?.transaction.filter(
      (cryptoTrasction) =>
        cryptoTrasction.crypto_currency?.label === cryptoLabel
    )
    setCryptoHistories(histories)
  }

  useEffect(() => {
    if (historyRenderType === 'all' && data?.transaction) {
      setCryptoHistories(data.transaction)
    }
  }, [historyRenderType, data])

  useMemo(() => {
    cryptoWalletRef.current.series = data?.crypto_wallet?.map((myCrypto) =>
      chartRenderType === 'crypto' ? +myCrypto?.amount : +myCrypto?.balance
    )
    cryptoWalletRef.current.labels = data?.crypto_wallet?.map(
      (myCrypto) => myCrypto.crypto_currency?.label
    )
  }, [data?.crypto_wallet, chartRenderType])

  return (
    <>
      {isFetching && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
          }}
        >
          <Loader />
        </Box>
      )}
      {!isFetching && (
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ height: '90vh' }}>
            <Grid
              xs={12}
              md={6}
              sx={{
                height: '70vh',
              }}
            >
              <Typography component='h1' variant='h2' sx={{ my: 4 }}>
                Votre portefeuille crypto
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <FormControl sx={{ maxWidth: '35%' }} fullWidth>
                  <Select
                    labelId='type-select-label'
                    id='type-select'
                    value={chartRenderType}
                    label='Type'
                    onChange={(e) => setChartRenderType(e.target.value)}
                    variant='standard'
                  >
                    <MenuItem value={'crypto'}>
                      Montant de crypto monaie
                    </MenuItem>
                    <MenuItem value={'euro'}>Valeur en euro</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <PieChart
                getSelectedValue={handleCryptoHistory}
                series={cryptoWalletRef.current.series}
                labels={cryptoWalletRef.current.labels}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{
                height: '70vh',
              }}
            >
              <Typography
                component='h2'
                variant='h4'
                sx={{ my: 5, textAlign: 'right' }}
              >
                Historique
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <FormControl sx={{ maxWidth: '35%' }} fullWidth>
                  <InputLabel id='type-select-label'>Type</InputLabel>
                  <Select
                    labelId='type-select-label'
                    id='type-select'
                    value={historyRenderType}
                    label='Type'
                    onChange={(e) => setHistoryRenderType(e.target.value)}
                    variant='standard'
                  >
                    <MenuItem value={'all'}>historique de transaction</MenuItem>
                    <MenuItem value={'selectedChart'}>
                      historique de transaction ciblé
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650, maxHeight: '65vh' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cryptomonnaie</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Quantité</TableCell>
                      <TableCell>Prix</TableCell>
                      <TableCell colSpan={2} align='center'>
                        Date d'achat / vente
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? cryptoHistories.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : cryptoHistories
                    ).map((cryptoHistory) => {
                      return (
                        <TableRow
                          key={cryptoHistory.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {cryptoHistory.crypto_currency?.label}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {cryptoHistory?.type === 'buy' ? 'Achat' : 'Vente'}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {cryptoHistory?.amount}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                              }}
                            >
                              {(+cryptoHistory?.price).toLocaleString('fr-FR')}
                              <Euro fontSize='6px' />
                            </Box>
                          </TableCell>
                          <TableCell component='th' scope='row' align='right'>
                            {dayjs(cryptoHistory?.created_at).format(
                              'HH:mm:ss '
                            )}
                          </TableCell>
                          <TableCell component='th' scope='row'>
                            {dayjs(cryptoHistory?.created_at).format(
                              'YYYY-MM-DD'
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {cryptoHistories.length === 0 &&
                      historyRenderType === 'selectedChart' && (
                        <TableRow>
                          <TableCell component='th' scope='row' colSpan={6}>
                            <Typography color={red[500]}>
                              Veuillez sélectionner une valeur du graphique
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                  </TableBody>
                  {cryptoHistories.length >= 8 && (
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[8]}
                          count={cryptoHistories.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </TableRow>
                    </TableFooter>
                  )}
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  )
}

export default WalletPage
