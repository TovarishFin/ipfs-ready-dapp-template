import { takeEvery, call, put, select, take, fork } from 'redux-saga/effects'
import { END, eventChannel } from 'redux-saga'
import dispatchError from '../actions/errors'
import { setupNoobCoin, setupWsNoobCoin } from '../utils/ethereum'
import { coinbaseSelector } from '../selectors/network'
import {
  dispatchGotTotalSupply,
  dispatchGotTokenBalance,
  dispatchGetTokenBalance
} from '../actions/contracts'
import { setNotification } from '../actions/layout'

const noobCoinEventChannel = noobCoin =>
  eventChannel(emit => {
    const eventWatcher = noobCoin.events.allEvents()

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    eventWatcher
      .on('data', contractEvent => {
        emit(contractEvent)
      })
      .on('error', err => {
        // eslint-disable-next-line no-console
        console.error('noobCoin event watcher error: ', err)
        emit(END)
      })

    return () => eventWatcher.unsubscribe()
  })

function* watchForNoobCoinEvents() {
  try {
    const noobCoin = yield call(setupWsNoobCoin)
    const channel = noobCoinEventChannel(noobCoin)

    while (true) {
      const noobCoinEvent = yield take(channel)
      yield call(handleNoobCoinEvent, noobCoinEvent)
    }
  } catch (err) {
    yield put(dispatchError(err.message, err.stack, 'contract'))
  }
}

function* handleNoobCoinEvent(noobCoinEvent) {
  try {
    switch (noobCoinEvent.event) {
      case 'Transfer':
        yield put(dispatchGetTokenBalance(noobCoinEvent.returnValues.from))
        yield put(dispatchGetTokenBalance(noobCoinEvent.returnValues.to))
        yield put(
          setNotification(
            `${noobCoinEvent.returnValues.from} transferred ${
              noobCoinEvent.returnValues.value
            } to ${noobCoinEvent.returnValues.to} `
          )
        )
        break
      default:
        break
    }
  } catch (err) {
    yield put(dispatchError(err.message, err.stack, 'contract'))
  }
}

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
    yield fork(watchForNoobCoinEvents)
    yield takeEvery('GET_TOTAL_SUPPLY', getTotalSupply)
    yield takeEvery('GET_TOKEN_BALANCE', getTokenBalance)
    yield takeEvery('TRANSFER_TOKENS', transferTokens)
  } catch (err) {
    yield put(dispatchError(err.message, err.stack, 'contract root'))
  }
}
