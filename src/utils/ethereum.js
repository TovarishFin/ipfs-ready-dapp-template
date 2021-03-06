import Web3 from 'web3'
import ZeroClientProvider from 'web3-provider-engine/zero'
import NoobCoin from 'noob-coin/build/contracts/NoobCoin'
import { networkIdToName } from './data'

export const getWeb3 = () =>
  new Promise((resolve, reject) => {
    if (!window) {
      return reject(new Error('still server side...'))
    }

    if (window.web3) {
      resolve(new Web3(web3.currentProvider))
    }

    window.addEventListener('load', () => {
      if (typeof window.web3 !== 'undefined') {
        return resolve(new Web3(window.web3.currentProvider))
      } else {
        // TODO: change to mainnet when ready to rock
        const engine = ZeroClientProvider({
          static: {
            eth_syncing: false,
            web3_clientVersion: 'ZeroClientProvider'
          },
          getAccounts: cb => cb(null, []),
          rpcUrl: 'https://kovan.infura.io'
        })
        const web3 = new Web3(engine)
        window.web3 = web3
      }

      resolve(web3)
    })
  })

// needed in order to get events through websockets
export const getWsWeb3 = async () => {
  const networkId = await getNetwork()
  const networkName = networkIdToName(networkId)
  return new Web3(`wss://${networkName}.infura.io/ws`)
}

export const setupNoobCoin = async () => {
  const web3 = await getWeb3()
  const networkId = await getNetwork()
  const noobCoin = new web3.eth.Contract(
    NoobCoin.abi,
    NoobCoin.networks[networkId].address
  )

  return noobCoin
}

export const setupWsNoobCoin = async () => {
  const web3 = await getWsWeb3()
  const networkId = await getNetwork()
  const noobCoin = new web3.eth.Contract(
    NoobCoin.abi,
    NoobCoin.networks[networkId].address
  )

  return noobCoin
}

export const getNetwork = async () => {
  const web3 = await getWeb3()
  return web3.eth.net.getId()
}

export const getBlockNumber = async () => {
  const web3 = await getWeb3()
  return web3.eth.getBlockNumber()
}

export const getCoinbase = async () => {
  const web3 = await getWeb3()
  const accounts = await web3.eth.getAccounts()
  return accounts[0]
}
