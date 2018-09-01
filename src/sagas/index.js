export default function* root() {
  try {
    console.log('running')
  } catch (err) {
    console.log('error: ', err)
  }
}
