import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from '../config/configureStore'

import { AppContainer } from 'react-hot-loader'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themeConfig from '../config/muiThemeConfig'

import App from './components/App'

const { store } = configureStore()

// eslint-disable-next-line no-shadow
const render = App => {
  const root = document.getElementById('app')

  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider theme={createMuiTheme(themeConfig)}>
        <Provider store={store}>
          <App />
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line no-shadow
    const App = require('./components/App').default

    render(App)
  })
}
