export const dispatchError = (message, stack, origin) => ({
  type: 'ERROR',
  payload: {
    message,
    stack,
    origin
  }
})

export default dispatchError
