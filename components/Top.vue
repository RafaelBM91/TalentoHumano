<template>
  <div id="Top" class="column is-11">
    <section id="header" class="hero is-default is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            INSTITUTO DE LA MUJER DEL ESTADO TRUJILLO
          </h1>
          <h2 class="subtitle">
            Departamento de Talento Humano
          </h2>
        </div>
      </div>
      <div class="hero-foot">
        <nav class="tabs is-boxed is-outlined">
          <div class="container">
            <ul>
              <li>
                <nuxt-link to="/">Consultar</nuxt-link>
              </li>
              <li v-if="!$store.state.auth">
                <nuxt-link to="/login">Entrar</nuxt-link>
              </li>
              <li v-if="$store.state.auth">
                <nuxt-link to="/nomina">Nomina</nuxt-link>
              </li>
              <li v-if="$store.state.auth && $store.state.auth.grado === 'Administrador'">
                <nuxt-link to="/users">Usuarios</nuxt-link>
              </li>
              <!-- <li v-if="$store.state.auth && $store.state.auth.grado === 'Administrador'">
                <nuxt-link to="/config">Configurar</nuxt-link>
              </li> -->
              <li v-if="$store.state.auth">
                <a @click="logout">Salir</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Top',
    methods: {
      logout () {
        this.$store.dispatch('logout')
        location.reload()
      }
    }
  }
</script>

<style>
  section#header {
    background-image: url('/logo_imet.png');
    background-size: 20% 90%;
    background-repeat: no-repeat;
    background-position: 0% 2px
  }
</style>
