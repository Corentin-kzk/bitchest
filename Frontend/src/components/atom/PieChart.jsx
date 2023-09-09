import Chart from 'react-apexcharts'
import generateRandomColorFromString from '@utils/getRandowColors'
import PropTypes from 'prop-types'

function PieChart({ series, labels, getSelectedValue }) {
  const colors = labels.map((label) => generateRandomColorFromString(label))

  const chartOpt = {
    series: series,
    options: {
      colors: colors,
      chart: {
        events: {
          dataPointSelection: (_, chartContext, config) => {
            const selectedDataPoint = config.dataPointIndex
            getSelectedValue(labels[selectedDataPoint])
          },
        },
        width: 380,
        type: 'pie',
      },
      labels: labels,
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex]
          return [name]
        },
      },
    },
  }

  return (
    <>
      <Chart type='pie' options={chartOpt.options} series={chartOpt.series} />
    </>
  )
}

PieChart.propTypes = {
  series: PropTypes.array.isRequired, // series doit être un tableau requis
  labels: PropTypes.array.isRequired, // labels doit être un tableau requis
  getSelectedValue: PropTypes.func.isRequired, // getSelectedValue doit être une fonction requise
}
export default PieChart
