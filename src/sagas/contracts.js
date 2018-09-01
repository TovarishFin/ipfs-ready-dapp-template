import { takeEvery, call, put, select } from 'redux-saga/effects'
import dispatchError from '../actions/errors'
import { setupNoobCoin } from '../utils/ethereum'
import { coinbaseSelector } from '../selectors/network'
import {
  dispatchGotTotalSupply,
  dispatchGotTokenBalance
} from '../actions/contracts'

export function* getTotalSupply() {
  try {
    const coinbase = yield select(coinbaseSelector)
    const noobCoin = yield call(setupNoobCoin)
    const totalSupply = yield call(noobCoin.methods.totalSupply().call, {
      from: coinbase
    })
    yield put(dispatchGotTotalSupply(totalSupply))
  } catch (err) {
    yield put(dispatchError(err.message, err.stack, 'contract'))
  }
}

export function* getTokenBalance(action) {
  const account = action.payload
  try {
    const coinbase = yield select(coinbaseSelector)
    const noobCoin = yield call(setupNoobCoin)
    const balance = yield call(noobCoin.methods.balanceOf(account).call, {
      from: coinbase
    })
    yield put(dispatchGotTokenBalance(account, balance))
  } catch (err) {
    yield put(dispatchError(err.message, err.stack, 'contract'))
  }
}

export function* transferTokens(action) {
  const { recipient, amount } = action.payload
  try {
    const coinbase = yield select(coinbaseSelector)
    const noobCoin = yield call(setupNoobCoin)
    yield call(noobCoin.methods.transfer(recipient, amount).send, {
      from: coinbase
    })
  } catch (err) {
    yield put(dispatchError(err.message, err.stack, 'contract'))
  }
}

export default function* contractSagas() {
  try {
    yield takeEvery('GET_TOTAL_SUPPLY', getTotalSupply)
    yield takeEvery('GET_TOKEN_BALANCE', getTokenBalance)
    yield takeEvery('TRANSFER_TOKENS', transferTokens)
  } catch (err) {
    yield put(dispatchError(err.message, err.stack, 'contract root'))
  }
}
