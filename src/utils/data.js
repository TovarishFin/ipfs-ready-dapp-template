import { BN } from 'web3-utils'

export const addressZero = '0x' + '0'.repeat(40)

export const bytes32Zero = '0x' + '0'.repeat(64)

export const decimals18 = new BN(10).pow(new BN(18))

export const weiToEthCurrencyFormat = wei =>
  wei ? `Ξ${new BN(wei).div(decimals18).toString()}` : 'Ξ0.0'

export const ethToWei = eth => (eth ? new BN(eth).mul(decimals18) : new BN(0))

export const weiToEth = wei =>
  wei ? new BN(wei).div(decimals18).toNumber() : new BN(0).toNumber()
