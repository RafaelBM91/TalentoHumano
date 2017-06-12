export default ({ store, redirect, error }) => {
  if (store.state.auth) {
    return redirect('/')
  }
}
