import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { closeNotification } from '../../actions/layout'
import {
  notificationOpenSelector,
  notificationMessageSelector
} from '../../selectors/layout'

const Notifier = ({
  dispatchCloseNotification,
  notificationOpen,
  notificationMessage
}) => (
  <Snackbar
    action={<Button onClick={dispatchCloseNotification}>{'close'}</Button>}
    autoHideDuration={5000}
    message={notificationMessage}
    onClose={dispatchCloseNotification}
    open={notificationOpen}
  />
)

const mapStateToProps = state => ({
  notificationOpen: notificationOpenSelector(state),
  notificationMessage: notificationMessageSelector(state)
})

const mapDispatchToProps = {
  dispatchCloseNotification: closeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifier)
