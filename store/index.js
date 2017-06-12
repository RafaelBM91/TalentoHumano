import Vuex from 'vuex'
import axios from 'axios'

const state = {
  auth: null
}

const mutations = {
  SET_AUTH: (state, nuevo) => {
    state.auth = nuevo
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
  }
}

export default () => {
  return new Vuex.Store({
    state,
    mutations,
    actions
  })
}
