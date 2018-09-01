const defaultState = {
  tempSetup: true
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'EXAMPLE_ACTION':
      return {
        ...state,
        tempSetup: action.payload
      }
    default:
      return state
  }
}

export default reducer
