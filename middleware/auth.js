export default ({ store, redirect, error }) => {
  if (!store.state.auth) {
    return redirect('/')
    // error({
    //   message: 'You are not connected',
    //   statusCode: 403
    // })
  }
}
