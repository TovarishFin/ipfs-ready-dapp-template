import { dispatchError } from '../actions/errors'
import { fork, call, put } from 'redux-saga/effects'
import network, { getNetworkInfo } from './network'
import { getWeb3 } from '../utils/ethereum'

export default function* root() {
  try {
    yield call(getWeb3) // halt all sagas until web3 has loaded
    yield call(getNetworkInfo) // run last to ensure all other sagas have loaded
    yield fork(network) // run last to ensure all other sagas have loaded
  } catch (err) {
    yield put(dispatchError(err.message, err.stack, 'root saga'))
  }
}
