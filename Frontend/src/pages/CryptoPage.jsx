import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate, useParams } from 'react-router-dom'
import { Crypto_QK, getCrypto } from '../api/crypto'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { Box, Button, Icon, IconButton, Typography } from '@mui/material'
import { Loader } from '@components/atom/Loader'
import { Chart } from '@components/atom/Chart'
import { AddShoppingCart, ChevronLeft, Sell } from '@mui/icons-material'
import { linkUrl } from '../utils/linkUrl'
import { MyUser_QK, getMyUser } from '../api/me'
import { useDispatch } from 'react-redux'
import { showDialogAction } from '../reducers/dialogReducer'

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

  const navigate = useNavigate()
  if (isError) return <Navigate to={'/500'} />
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
              <Button
                onClick={() => navigate(linkUrl.home)}
                startIcon={<ChevronLeft />}
                color='secondary'
                variant='text'
              >
                dashboard
              </Button>
            </Box>
            <img src={data.logo}></img>
            <Typography component='h1'>{data.label}</Typography>
          </Grid>
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
            <Button variant='outlined' color='secondary' endIcon={<Sell />}>
              Vendre
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              endIcon={<AddShoppingCart />}
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
          </Grid>
          <Grid xs={12} sx={{ height: '50vh' }}>
            <Chart series={data.history} />
          </Grid>
        </Grid>
      )}
    </>
  )
}
