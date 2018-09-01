import Web3 from 'web3'
import ZeroClientProvider from 'web3-provider-engine/zero'
import ExampleToken from '../contracts/ExampleToken'

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

export const setupExampleToken = async () => {
  const web3 = await getWeb3()
  const networkId = await getNetwork()
  const betHandler = new web3.eth.Contract(
    ExampleToken.abi,
    ExampleToken.networks[networkId].address
  )

  return betHandler
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
  const accounts = web3.eth.getAccounts()
  return accounts[0]
}
