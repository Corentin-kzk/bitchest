import { useQuery } from '@tanstack/react-query'
import { Crypto_QK, getCryptos } from '../api/crypto'
import Chart from 'react-apexcharts'
import Grid from '@mui/material/Unstable_Grid2'
import {
  AppBar,
  Box,
  Link,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  styled,
} from '@mui/material'
import { Loader } from '@components/atom/Loader'
import { Navigate } from 'react-router-dom'
import { linkUrl } from '../utils/linkUrl'

const IndexPage = () => {
  const { data, isFetching, isError } = useQuery({
    queryKey: [Crypto_QK],
    queryFn: () => getCryptos(),
    refetchOnWindowFocus: false,
  })

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  if (isError) return <Navigate to={'/500'} />
  return (
    <div>
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
        <>
          <AppBar position='static' sx={{ mb: 2 }} color='secondary'>
            <Toolbar>
              <Tabs variant='scrollable' scrollButtons='auto'>
                {data?.map((element) => {
                  return (
                    <Tab
                      label={element.label}
                      value='crypto/:id'
                      href={`${linkUrl.cryptoId.replace(':id', element.id)}`}
                      component={Link}
                    />
                  )
                })}
              </Tabs>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2}>
            {data?.map((element) => {
              const chartopt = {
                options: {
                  chart: {
                    type: 'candlestick',
                    height: 350,
                  },
                  title: {
                    text: `${element.label} Chart`,
                    align: 'left',
                  },
                  xaxis: {
                    type: 'datetime',
                  },
                  yaxis: {
                    tooltip: {
                      enabled: true,
                    },

                    forceNiceScale: true,
                  },
                },
              }
              const series = {
                series: [
                  {
                    data: JSON.parse(element.history),
                  },
                ],
              }
              return (
                <>
                  <Grid xs={12} sm={6} lg={4} xl={3}>
                    <Item>
                      <img src={element.logo} />
                      <Chart
                        options={chartopt.options}
                        series={series.series}
                        type='candlestick'
                        width='100%'
                      />
                    </Item>
                  </Grid>
                </>
              )
            })}
          </Grid>
        </>
      )}
    </div>
  )
}

export default IndexPage
