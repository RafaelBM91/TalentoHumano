<template>
  <div class="column is-11">

    <div class="columns is-multiline">

      <div class="column is-3">
        {{ saludo }}
      </div>

    </div>

  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import client from '~plugins/ApolloClient'

  export default {
    async asyncData () {
      let { data } = await client.query({
        query: gql`
          query {
            saludo
          }
      `
      })
      return {
        saludo: data.saludo
      }
    }
  }
</script>
