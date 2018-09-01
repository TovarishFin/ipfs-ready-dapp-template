import React from 'react'

// redux
import { connect } from 'react-redux'
import { web3ReadySelector } from '../selectors/network'

// layout
import Top from './layout/Top'
import MainDrawer from './layout/MainDrawer'
import Notifier from './layout/Notifier'
import Web3Loading from './layout/Web3Loading'

// pages
import Home from './pages/Home'
import Temp from './pages/Temp'

// styles
import { withStyles } from '@material-ui/core/styles'

import { BrowserRouter as Router, Route } from 'react-router-dom'

const styles = {
  '@global': {
    body: {
      width: '100%',
      height: '100%',
      background: 'transparent',
      margin: 0,
      padding: 0,
      fontFamily: 'Roboto'
    },
    html: {
      width: '100%',
      height: '100%',
      background: 'transparent',
      margin: 0,
      padding: 0,
      fontFamily: 'Roboto'
    }
  },
  app: {
    margin: '0px',
    height: '100%',
    width: '100%'
  }
}

const App = ({ classes, web3Ready }) => (
  <Router>
    <div className={classes.app}>
      <Top />
      {web3Ready ? (
        <React.Fragment>
          <MainDrawer />
          <Route exact path="/" component={Home} />
          <Route path="/other" component={Temp} />
        </React.Fragment>
      ) : (
        <Web3Loading />
      )}
      <Notifier />
    </div>
  </Router>
)

const mapStateToProps = state => ({
  web3Ready: web3ReadySelector(state)
})

export default connect(mapStateToProps)(withStyles(styles)(App))
