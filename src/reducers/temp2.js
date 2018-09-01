const defaultState = {
  temp2Setup: true
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'EXAMPLE_ACTION':
      return {
        ...state,
        temp2Setup: action.payload
      }
    default:
      return state
  }
}

export default reducer
