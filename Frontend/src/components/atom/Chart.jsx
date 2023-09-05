import _Chart from 'react-apexcharts'
import dayjs from 'dayjs'
import { green } from '@mui/material/colors'
import { last } from 'lodash'

export function Chart({ series }) {
  const formatedData = series.map((item) => {
    const timestamp = dayjs(item.created_at).valueOf()
    const price = parseFloat(item.price)
    return [timestamp, price]
  })

  const lastValue = last(formatedData)[1]
  const options = {
    chart: {
      colors: ['#01e119'],
      id: 'area-datetime',
      type: 'area',
      zoom: {
        autoScaleYaxis: false,
      },
      background: 'transparent',
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    title: {
      text: '',
      style: {
        fontSize: 32,
        fontWeight: 600,
        color: green[400],
      },
    },
    annotations: {
      yaxis: [
        {
          borderColor: '#00E396',
          label: {
            borderColor: 'none',
            style: {
              color: '#fff',
              background: 'secondary',
              fontSize: 12,
            },
            text: `${lastValue?.toFixed(2)}€`,
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 1,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: (val) => {
          return val.toFixed(2)
        },
        title: {
          formatter: () => '',
        },
      },
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.9,
        opacityTo: 0.9,
        stops: [0, 100],
      },
      colors: [green[700], green[600], green[500], green[400], green[50]],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
  }

  return (
    <_Chart
      options={options}
      series={[
        {
          color: '#01e119',
          data: formatedData,
        },
      ]}
      type='area'
      width='100%'
    />
  )
}

export default Chart
