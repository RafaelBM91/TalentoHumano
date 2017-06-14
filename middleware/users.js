export default ({ store, redirect, error }) => {
  if (!store.state.auth) {
    return redirect('/')
  } else {
    if (store.state.auth.grado !== 'Administrador') {
      return redirect('/')
    }
  }
}
