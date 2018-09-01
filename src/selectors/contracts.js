import { pathOr } from 'ramda'

export const tokenBalanceSelector = (state, account) =>
  pathOr(0, ['contracts', 'balances', account], state)

export const totalSupplySelector = state =>
  pathOr(0, ['contracts', 'totalSupply'], state)
