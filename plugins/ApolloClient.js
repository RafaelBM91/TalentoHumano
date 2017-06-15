import 'babel-polyfill'
import { ApolloClient, createNetworkInterface } from 'apollo-client'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://127.0.0.1:3000/graphql',
    transportBatching: true
  })
})

export default apolloClient
