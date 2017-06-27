module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Sistema Talento Humano',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo_imet.png' }
    ]
  },
  /*
  ** Crea plugin para APOLLO
  */
  plugins: ['~plugins/ApolloClient.js'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00D1B2' },
  /*
  ** Build CSS
  */
  css: [
    'bulma/css/bulma.css',
    'font-awesome/css/font-awesome.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    vendor: ['isomorphic-fetch', 'apollo-client', 'graphql-tag'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
