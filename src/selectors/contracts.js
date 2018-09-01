import { pathOr } from 'ramda'

export const balanceSelector = (state, account) =>
  pathOr(0, ['contracts', 'balances', account], state)

export const totalSupplySelector = state =>
  pathOr(0, ['contracts', 'totalSupply'], state)
