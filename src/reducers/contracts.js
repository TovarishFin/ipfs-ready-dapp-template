const defaultState = {
  balances: {},
  totalSupply: 0
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'GOT_TOTAL_SUPPLY':
      return { ...state, totalSupply: action.payload }
    case 'GOT_TOKEN_BALANCE':
      return {
        ...state,
        balances: {
          ...state.balances,
          [action.payload.account]: action.payload.balance
        }
      }
    default:
      return state
  }
}

export default reducer
