import React from 'react'
import { connect } from 'react-redux'
import { drawerOpenSelector } from '../../selectors/layout'
import { coinbaseSelector, networkSelector } from '../../selectors/network'
import { closeDrawer } from '../../actions/layout'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'

const coinbaseLink = (number, coinbase) => {
  switch (number) {
    case 3:
      return `https://ropsten.etherscan.io/address/${coinbase}`
    case 4:
      return `https://rinkeby.etherscan.io/address/${coinbase}`
    case 42:
      return `https://kovan.etherscan.io/address/${coinbase}`
    case 1:
      return `https://etherscan.io/address/${coinbase}`
    default:
      return `https://etherscan.io/address/${coinbase}`
  }
}

const MainDrawer = ({
  drawerOpen,
  dispatchCloseDrawer,
  coinbase,
  networkNumber
}) => (
  <Drawer onClose={dispatchCloseDrawer} open={drawerOpen} width={300}>
    <MenuItem
      component="a"
      href={coinbaseLink(networkNumber, coinbase)}
      onClick={dispatchCloseDrawer}
      target="_blank"
    >
      {`Account: ${coinbase.slice(0, 5)}...${coinbase.slice(
        coinbase.length - 5
      )}`}
    </MenuItem>
    <Divider />
    <MenuItem
      component={Link}
      onClick={dispatchCloseDrawer}
      to="/get-match-data"
    >
      Get Match Data
    </MenuItem>
    <Divider />
    <MenuItem
      component={Link}
      exact="true"
      onClick={dispatchCloseDrawer}
      to="/"
    >
      Home
    </MenuItem>
    <MenuItem component={Link} onClick={dispatchCloseDrawer} to="/create-bet">
      Create a Bet
    </MenuItem>
    <MenuItem component={Link} onClick={dispatchCloseDrawer} to="/accept-bet">
      Accept a Bet
    </MenuItem>
    <MenuItem component={Link} onClick={dispatchCloseDrawer} to="/settle-bet">
      Settle a Bet
    </MenuItem>
    <MenuItem component={Link} onClick={dispatchCloseDrawer} to="/cancel-bet">
      Cancel a Bet
    </MenuItem>
    <Divider />
    <MenuItem component={Link} onClick={dispatchCloseDrawer} to="/my-account">
      My Account
    </MenuItem>
  </Drawer>
)

const mapStateToProps = state => ({
  drawerOpen: drawerOpenSelector(state),
  coinbase: coinbaseSelector(state),
  networkNumber: networkSelector(state)
})

const mapDispatchToProps = {
  dispatchCloseDrawer: closeDrawer
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDrawer)
