import { call, select, put, fork, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { getCoinbase, getBlockNumber, getNetwork } from '../utils/ethereum'
import {
  coinbaseSelector,
  networkSelector,
  blockNumberSelector
} from '../selectors/network'
import { dispatchGotNetworkInfo } from '../actions/network'
import { dispatchError } from '../actions/errors'

const pollingDelay = 3000

export function* getNetworkInfo() {
  let oldCoinbase
  let oldBlockNumber
  let oldNetworkId
  try {
    oldCoinbase = yield select(coinbaseSelector)
    oldNetworkId = yield select(networkSelector)
    oldBlockNumber = yield select(blockNumberSelector)
    const coinbase = yield call(getCoinbase)
    const networkId = yield call(getNetwork)
    const blockNumber = yield call(getBlockNumber)
    if (
      coinbase !== oldCoinbase ||
      networkId !== oldNetworkId ||
      blockNumber !== oldBlockNumber
    ) {
      yield put(
        dispatchGotNetworkInfo({
          coinbase,
          networkId,
          blockNumber,
          web3Ready: true
        })
      )
    }
  } catch (err) {
    yield put(
      dispatchGotNetworkInfo({
        oldCoinbase,
        oldNetworkId,
        oldBlockNumber,
        web3Ready: false
      })
    )
    yield put(dispatchError(err.message, err.stack, 'network'))
  }
}

function* watchNetworkInfo() {
  while (true) {
    try {
      yield delay(pollingDelay)
      yield call(getNetworkInfo)
    } catch (err) {
      yield put(dispatchError(err.message, err.stack, 'network'))
      yield delay(pollingDelay)
      yield call(getNetworkInfo)
    }
  }
}

export default function* networkSagas() {
  try {
    yield fork(watchNetworkInfo)
    yield takeEvery('GET_NETWORK_INFO', getNetworkInfo)
  } catch (err) {
    yield put(dispatchError(err.message, err.stack, 'network root'))
  }
}
