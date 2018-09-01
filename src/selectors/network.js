import { pathOr } from 'ramda'
import { addressZero } from '../utils/data'

export const coinbaseSelector = state =>
  pathOr(addressZero, ['network', 'coinbase'], state)

export const networkSelector = state =>
  pathOr('1', ['network', 'networkId'], state)

export const blockNumberSelector = state =>
  pathOr(null, ['network', 'block'], state)

export const web3ReadySelector = state =>
  pathOr(false, ['network', 'web3Ready'], state)
