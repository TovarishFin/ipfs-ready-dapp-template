import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { openDrawer } from '../../actions/layout'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

const Top = ({ dispatchOpenDrawer, classes }) => (
  <AppBar position="sticky">
    <Toolbar>
      <IconButton className={classes.menuButton} onClick={dispatchOpenDrawer}>
        <MenuIcon />
      </IconButton>
      <Typography color="inherit" variant="title">
        IPFS Ready DApp
      </Typography>
    </Toolbar>
  </AppBar>
)

const mapDispatchToProps = {
  dispatchOpenDrawer: openDrawer
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Top))
