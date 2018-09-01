import { addressZero } from '../utils/data'

const defaultState = {
  coinbase: addressZero,
  network: 1,
  blockNumber: 0,
  web3Ready: false
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'GOT_NETWORK_INFO':
      return { ...action.payload }
    default:
      return state
  }
}

export default reducer
