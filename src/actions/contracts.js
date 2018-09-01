export const dispatchGetTotalSupply = () => ({
  type: 'GET_TOTAL_SUPPLY'
})

export const dispatchGetTokenBalance = account => ({
  type: 'GET_TOKEN_BALANCE',
  payload: account
})

export const dispatchGotTotalSupply = totalSupply => ({
  type: 'GOT_TOTAL_SUPPLY',
  payload: totalSupply
})

export const dispatchGotTokenBalance = (account, balance) => ({
  type: 'GOT_TOKEN_BALANCE',
  payload: { account, balance }
})
