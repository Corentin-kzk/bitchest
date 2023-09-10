import Snackbar from '@mui/material/Snackbar'
import PropTypes from 'prop-types'
import MuiAlert from '@mui/material/Alert'
import { forwardRef } from 'react'
import { connect } from 'react-redux'
import { hideAlertAction } from '../../reducers/alertReducer'

const AlertRef = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function Alert({
  showAlert,
  alertMessage,
  hideAlert,
  alertStatus = 'success',
}) {
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return
    }

    hideAlert()
  }
  return (
    <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose}>
      <AlertRef
        severity={alertStatus}
        onClose={handleClose}
        sx={{ width: '100%' }}
      >
        {alertMessage}
      </AlertRef>
    </Snackbar>
  )
}

const mapStateToProps = (state) => {
  return {
    showAlert: state.alert.showAlert,
    alertMessage: state.alert.alertMessage,
    alertStatus: state.alert.alertStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideAlert: () => dispatch(hideAlertAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
