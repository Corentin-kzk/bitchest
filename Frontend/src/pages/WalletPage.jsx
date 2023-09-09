import { useQuery } from '@tanstack/react-query'
import {
  MyWallet_QK,
  Mytransction_QK,
  getMyWallet,
  getMytranctions,
} from '../api/me'
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
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
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  AccountBalance,
  CurrencyExchange,
  Euro,
  FilterList,
  ListAlt,
  TrendingDown,
  TrendingUp,
} from '@mui/icons-material'
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
  console.log(
    '🚀 ~ file: WalletPage.jsx:46 ~ WalletPage ~ historyRenderType:',
    historyRenderType
  )
  const [page, setPage] = useState(1)
  const [cryptoHistoryId, setCryptoHistoryID] = useState(null)

  const { data: wallet, isFetching: isWalletFetching } = useQuery({
    queryKey: [MyWallet_QK],
    queryFn: () => getMyWallet(),
    refetchOnWindowFocus: false,
  })

  const {
    data: transactions,
    isFetching: isTransactionsFetching,
    isError: isTransactionsError,
  } = useQuery({
    queryKey: [Mytransction_QK, page, cryptoHistoryId],
    queryFn: () => getMytranctions(page, cryptoHistoryId),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (!isTransactionsFetching && !isTransactionsError && !!transactions) {
      setPage(transactions.current_page)
    }
  }, [isTransactionsFetching, isTransactionsError])

  const handlePageChange = (_, pageNumber) => {
    setPage(pageNumber + 1)
  }

  const handleCryptoHistory = (cryptoLabel) => {
    if (historyRenderType === 'selectedChart') {
      const histories = wallet?.crypto_wallet.find(
        (cryptoWallet) => cryptoWallet.crypto_currency?.label === cryptoLabel
      )
      setCryptoHistoryID(histories.crypto_currency.id)
    }
  }

  useEffect(() => {
    if (historyRenderType === 'all') {
      setCryptoHistoryID(null)
    }
  }, [historyRenderType])

  useMemo(() => {
    cryptoWalletRef.current.series = wallet?.crypto_wallet?.map((myCrypto) =>
      chartRenderType === 'crypto' ? +myCrypto?.amount : +myCrypto?.balance
    )
    cryptoWalletRef.current.labels = wallet?.crypto_wallet?.map(
      (myCrypto) => myCrypto.crypto_currency?.label
    )
  }, [wallet?.crypto_wallet, chartRenderType])

  return (
    <>
      {isWalletFetching && isTransactionsFetching && (
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
      {!isWalletFetching && (
        <Paper sx={{ p: 2 }}>
          <Typography component='h1' variant='h2' sx={{ my: 2 }}>
            Portefeuille
          </Typography>

          <Grid container spacing={2} sx={{ minHeight: '80vh' }}>
            <Grid xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <ToggleButtonGroup
                  color='primary'
                  value={chartRenderType}
                  exclusive
                  onChange={(_, newAlignment) =>
                    setChartRenderType(newAlignment)
                  }
                  aria-label='Platform'
                >
                  <ToggleButton value='crypto'>
                    <CurrencyExchange />
                  </ToggleButton>
                  <ToggleButton value='euro'>
                    <Euro />
                  </ToggleButton>
                </ToggleButtonGroup>
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
                maxHeight: '70vh',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component='h2'
                  variant='h4'
                  sx={{ textAlign: 'right' }}
                >
                  Historique
                </Typography>
                <ToggleButtonGroup
                  color='primary'
                  value={historyRenderType}
                  exclusive
                  onChange={(_, newAlignment) => {
                    setHistoryRenderType(newAlignment ? newAlignment : 'all')
                  }}
                  aria-label='Platform'
                >
                  <ToggleButton value='selectedChart'>
                    <FilterList />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650, maxHeight: '65vh' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cryptomonnaie</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Quantité</TableCell>
                      <TableCell>Prix</TableCell>
                      <TableCell>Profit</TableCell>
                      <TableCell colSpan={2} align='center'>
                        {" Date d'achat / vente"}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {isTransactionsFetching && (
                    <TableRow>
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
                    </TableRow>
                  )}
                  {!isTransactionsFetching && transactions.data && (
                    <>
                      <TableBody>
                        {transactions.data.map((cryptoHistory) => {
                          return (
                            <TableRow
                              key={cryptoHistory.id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell scope='row'>
                                {cryptoHistory.crypto_currency?.label}
                              </TableCell>
                              <TableCell scope='row'>
                                <Typography
                                  color={
                                    cryptoHistory?.type === 'buy'
                                      ? 'primary'
                                      : 'error'
                                  }
                                >
                                  {cryptoHistory?.type === 'buy'
                                    ? 'Achat'
                                    : 'Vente'}
                                </Typography>
                              </TableCell>
                              <TableCell scope='row'>
                                {cryptoHistory?.amount}
                              </TableCell>
                              <TableCell scope='row'>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                  }}
                                >
                                  {(+cryptoHistory?.price).toLocaleString(
                                    'fr-FR'
                                  )}
                                  <Euro fontSize='6px' />
                                </Box>
                              </TableCell>
                              <TableCell scope='row'>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                  }}
                                >
                                  {cryptoHistory.type === 'buy' ? (
                                    <>
                                      <Tooltip
                                        title={
                                          'Impossible de faire un profit sur un achat.'
                                        }
                                      >
                                        <AccountBalance />
                                      </Tooltip>
                                    </>
                                  ) : (
                                    <>
                                      {+cryptoHistory?.profit *
                                        cryptoHistory?.amount >
                                      0 ? (
                                        <TrendingUp color='primary' />
                                      ) : (
                                        <TrendingDown color='error' />
                                      )}
                                      {(
                                        cryptoHistory?.profit *
                                        cryptoHistory?.amount
                                      ).toLocaleString('fr-FR')}
                                      <Euro fontSize='6px' />
                                    </>
                                  )}
                                </Box>
                              </TableCell>
                              <TableCell scope='row' align='right'>
                                {dayjs(cryptoHistory?.created_at).format(
                                  'HH:mm:ss '
                                )}
                              </TableCell>
                              <TableCell scope='row'>
                                {dayjs(cryptoHistory?.created_at).format(
                                  'DD/MM/YYYY'
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        })}

                        {transactions.data.total === 0 &&
                          historyRenderType === 'selectedChart' && (
                            <TableRow>
                              <TableCell scope='row' colSpan={6}>
                                <Typography color={red[500]}>
                                  Veuillez sélectionner une valeur du graphique
                                </Typography>
                              </TableCell>
                            </TableRow>
                          )}
                      </TableBody>

                      {transactions.total >= 8 && (
                        <TableFooter>
                          <TableRow>
                            <TablePagination
                              rowsPerPageOptions={[8]}
                              count={transactions.total || 0}
                              rowsPerPage={transactions.per_page}
                              page={page - 1}
                              onPageChange={handlePageChange}
                            />
                          </TableRow>
                        </TableFooter>
                      )}
                    </>
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
