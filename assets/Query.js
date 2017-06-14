import axios from 'axios'
import apolloClient from '~plugins/ApolloClient'

export const QG = query =>
  axios.post('/graphql', { query })

export const ApolloQ = options =>
  apolloClient.watchQuery(options).result()

export const ApolloM = options =>
  apolloClient.mutate(options)
