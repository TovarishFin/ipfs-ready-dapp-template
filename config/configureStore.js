import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as reducers from '../src/reducers'
import rootSaga from '../src/sagas'
import createSagaMiddleware from 'redux-saga'

const configureStore = () => {
  const rootReducer = combineReducers({
    ...reducers
  })
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = applyMiddleware(sagaMiddleware)
  const enhancers = composeWithDevTools(middlewares)

  const store = createStore(rootReducer, {}, enhancers)

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../src/reducers/index', () => {
      // eslint-disable-next-line no-shadow
      const reducers = require('../src/reducers/index').default
      // eslint-disable-next-line no-shadow
      const rootReducer = combineReducers({ ...reducers })
      store.replaceReducer(rootReducer)
    })
  }

  sagaMiddleware.run(rootSaga)

  return { store }
}

export default configureStore
