// import 'babel-polyfill'
// import { ApolloClient, createNetworkInterface } from 'apollo-client'
//
// const apolloClient = new ApolloClient({
//   networkInterface: createNetworkInterface({
//     uri: 'http://127.0.0.1:3000/graphql',
//     transportBatching: true
//   })
// })
//
// export default apolloClient

import 'babel-polyfill'
import 'isomorphic-fetch'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient, createNetworkInterface } from 'apollo-client'

Vue.use(VueApollo)

// const API_ENDPOINT = 'http://127.0.0.1:3000/graphql'
const API_ENDPOINT = 'http://192.168.0.181:3000/graphql'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: API_ENDPOINT,
    transportBatching: true
  })
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.mixin({ apolloProvider })

export default apolloProvider
