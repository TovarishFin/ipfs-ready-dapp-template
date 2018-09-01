import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '../layout/Page'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {
  dispatchGetTokenBalance,
  dispatchTransfer
} from '../../actions/contracts'
import { coinbaseSelector } from '../../selectors/network'
import { tokenBalanceSelector } from '../../selectors/contracts'

class Transfer extends Component {
  state = {
    amount: 0,
    account: ''
  }

  componentDidMount() {
    this.props.getTokenBalance(this.props.coinbase)
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  handleTransfer = () => {
    this.props.transfer(this.props.coinbase, this.state.amount)
  }

  render() {
    const { amount, account } = this.state
    return (
      <Page>
        <Typography align="center">Transfer Tokens</Typography>
        <TextField
          fullWidth
          type="text"
          name="account"
          label="account to send to"
          value={account}
          onChange={this.handleChange}
        />
        <TextField
          fullWidth
          type="number"
          name="amount"
          label="amount"
          value={amount}
          onChange={this.handleChange}
        />

        <br />
        <br />

        <Button
          fullWidth
          variant="raised"
          color="primary"
          onClick={this.handleTransfer}
        >
          transfer tokens
        </Button>
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  coinbase: coinbaseSelector(state),
  coinbaseBalance: tokenBalanceSelector(state)
})

const mapDispatchToProps = {
  getTokenBalance: dispatchGetTokenBalance,
  transfer: dispatchTransfer
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transfer)
