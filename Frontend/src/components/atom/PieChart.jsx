import Chart from 'react-apexcharts'
import generateRandomColorFromString from '../../utils/getRandowColors'

function PieChart({ series, labels, getSelectedValue }) {
  const colors = labels.map((label) => generateRandomColorFromString(label))

  const chartOpt = {
    series: series,
    options: {
      colors: colors,
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            const selectedDataPoint = config.dataPointIndex
            console.log(
              '🚀 ~ file: PieChart.jsx:15 ~ PieChart ~ selectedDataPoint:',
              selectedDataPoint
            )
            getSelectedValue(labels[selectedDataPoint])
          },
        },
        width: 380,
        type: 'pie',
      },
      labels: labels,
    },
  }

  return (
    <>
      <Chart type='pie' options={chartOpt.options} series={chartOpt.series} />
    </>
  )
}

export default PieChart
