import Vuex from 'vuex'
import axios from 'axios'

const state = {
  auth: null,
  empleados: []
}

const mutations = {
  SET_AUTH: (state, nuevo) => {
    state.auth = nuevo
  },
  SET_EMPLEADOS: (state, lista) => {
    state.empleados = lista
  },
  PUSH_EMPLEADOS: (state, nuevo) => {
    let array = state.empleados.slice()
    array.push(nuevo)
    state.empleados = array
  }
}

const actions = {
  nuxtServerInit ({ commit }, { req }) {
    commit('SET_AUTH', req.session.auth)
  },
  login ({ commit }, { cedula, clave }) {
    if (cedula.length > 0 && clave.length > 0) {
      return axios.post('/login', { cedula, clave })
        .then((res) => {
          commit('SET_AUTH', res.data)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error(error.response.data.message)
          }
        })
    }
  },
  logout ({ commit }) {
    axios.post('/logout').then(() => {
      commit('SET_AUTH', null)
    })
  },
  initEmpleados ({ commit }, { lista }) {
    commit('SET_EMPLEADOS', lista)
  },
  pushEmpleado ({ commit }, { nuevo }) {
    commit('PUSH_EMPLEADOS', nuevo)
  }
}

export default () => {
  return new Vuex.Store({
    state,
    mutations,
    actions
  })
}
