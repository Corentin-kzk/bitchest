import Grid from '@mui/material/Unstable_Grid2'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Crypto_QK, getCrypto } from '../api/crypto'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material'
import { Loader } from '@components/atom/Loader'
import { Chart } from '@components/atom/Chart'
import { AddShoppingCart, ChevronLeft, House, Sell } from '@mui/icons-material'
import { linkUrl } from '../utils/linkUrl'
import { MyUser_QK, MyWallet_QK, getMyUser, getMyWallet } from '../api/me'
import { useDispatch } from 'react-redux'
import { showDialogAction } from '../reducers/dialogReducer'
import Image from '../components/atom/Image'

export const CryptoPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data, isFetching, isError } = useQuery({
    queryKey: [Crypto_QK, id],
    queryFn: () => getCrypto(id),
    refetchOnWindowFocus: false,
  })
  const {
    data: user,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useQuery({
    queryKey: [MyUser_QK],
    queryFn: () => getMyUser(),
    refetchOnWindowFocus: false,
  })
  const {
    data: wallet,
    isFetching: walletIsFetching,
    isError: walletIsError,
  } = useQuery({
    queryKey: [MyWallet_QK],
    queryFn: () => getMyWallet(),
    refetchOnWindowFocus: false,
  })

  const navigate = useNavigate()
  if (isError) return <Navigate to={'/5OO'} />
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
      {!isEmpty(data) && !isFetching && (
        <Grid container spacing={2}>
          <Grid
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ alignSelf: 'self-start' }}>
              <IconButton
                icon
                onClick={() => navigate(linkUrl.home)}
                color='secondary'
                variant='text'
              >
                <ChevronLeft />
                <House />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <Image src={data.logo} width={'100px'} height={'100px'} />
              <Typography component='h1' variant='h1'>
                {data.label}
              </Typography>
            </Box>
          </Grid>
          {user && user.role !== 'admin' && (
            <Grid
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: '10px',
              }}
            >
              {!userIsError && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <Button
                    variant='outlined'
                    color='secondary'
                    disabled={userIsFetching || userIsError}
                    endIcon={
                      userIsFetching ? (
                        <CircularProgress size={10} />
                      ) : (
                        <AddShoppingCart />
                      )
                    }
                    onClick={() =>
                      dispatch(
                        showDialogAction({
                          formName: 'buyForm',
                          dialogProps: { submitLabel: 'Acheter' },
                          formProps: { coin: { ...data }, user: { ...user } },
                        })
                      )
                    }
                  >
                    Acheter
                  </Button>
                  <Button
                    variant='outlined'
                    color='secondary'
                    disabled={
                      (userIsFetching && walletIsFetching) ||
                      walletIsError ||
                      userIsError
                    }
                    endIcon={
                      userIsFetching && walletIsFetching ? (
                        <CircularProgress size={10} />
                      ) : (
                        <Sell />
                      )
                    }
                    onClick={() =>
                      dispatch(
                        showDialogAction({
                          formName: 'sellForm',
                          dialogProps: { submitLabel: 'Vendre' },
                          formProps: {
                            coin: { ...data },
                            user: { ...user },
                            wallet: wallet?.crypto_wallet.find(
                              (wallet) =>
                                wallet.crypto_currency.label === data.label
                            ),
                          },
                        })
                      )
                    }
                  >
                    Vendre
                  </Button>
                </Box>
              )}
            </Grid>
          )}

          <Grid xs={12} sx={{ height: '50vh' }}>
            <Chart series={data.history} />
          </Grid>
        </Grid>
      )}
    </>
  )
}
