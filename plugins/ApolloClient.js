import 'isomorphic-fetch'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://127.0.0.1:3000/graphql',
    transportBatching: true
  }),
  dataIdFromObject: r => r.id
})

export default apolloClient
