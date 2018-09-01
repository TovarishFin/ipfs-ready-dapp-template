import React from 'react'
import Home from './pages/Home'
import Temp from './pages/Temp'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = () => (
  <Router>
    <React.Fragment>
      <Link to="/other">go to other</Link>
      <Link to="/">go to home</Link>
      <Route exact path="/" component={Home} />
      <Route path="/other" component={Temp} />
    </React.Fragment>
  </Router>
)

export default App
