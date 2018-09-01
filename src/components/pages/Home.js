import React, { Component } from 'react'
import Page from '../layout/Page'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import {
  dispatchGetTotalSupply,
  dispatchGetTokenBalance
} from '../../actions/contracts'
import { coinbaseSelector } from '../../selectors/network'
import { balanceSelector, totalSupplySelector } from '../../selectors/contracts'

class Home extends Component {
  componentDidMount() {
    this.props.getTotalSupply()
    this.props.getTokenBalance(this.props.coinbase)
  }

  render() {
    const { totalSupply, coinbaseBalance } = this.props
    return (
      <Page>
        <Typography>Total Supply: {totalSupply}</Typography>
        <Typography>Your Balance: {coinbaseBalance}</Typography>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  coinbase: coinbaseSelector(state),
  totalSupply: totalSupplySelector(state),
  coinbaseBalance: balanceSelector(state, coinbaseSelector(state))
})

const mapDispatchToProps = {
  getTotalSupply: dispatchGetTotalSupply,
  getTokenBalance: dispatchGetTokenBalance
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
