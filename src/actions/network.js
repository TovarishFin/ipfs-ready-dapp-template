export const dispatchGetNetworkInfo = () => ({
  type: 'GET_NETWORK_INFO'
})

export const dispatchGotNetworkInfo = networkInfo => ({
  type: 'GOT_NETWORK_INFO',
  payload: networkInfo
})
