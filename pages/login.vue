<template>
  <div class="column is-11">
    <section class="section" style="padding-top:0px;padding-bottom:12px;">
      <div class="container">
        <h1 class="title" style="margin-bottom:12px;">Ingresar</h1>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-3">

        <form @submit.prevent="login">

          <div v-if="error" class="field">
            <span class="tag is-warning">
              {{ error }}
              <button class="delete is-small" @click="clear_error"></button>
            </span>
          </div>

          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-hovered" type="text" placeholder="Cedula" v-model="cedula">
              <span class="icon is-small is-left">
                <i class="fa fa-vcard"></i>
              </span>
            </p>
          </div>

          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-hovered" type="password" placeholder="Contraseña" v-model="clave">
              <span class="icon is-small is-left">
                <i class="fa fa-key"></i>
              </span>
            </p>
          </div>

          <div class="field">
            <p class="control">
              <button class="button is-outlined is-dark" type="submit">
                Entrar
              </button>
            </p>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        cedula: '',
        clave: '',
        error: null
      }
    },
    methods: {
      login () {
        this.$store.dispatch('login', {
          cedula: this.cedula,
          clave: this.clave
        })
          .then(() => {
            this.cedula = ''
            this.clave = ''
            this.error = null
          })
          .catch((e) => {
            this.error = e.message
          })
      },
      clear_error () {
        this.error = null
      }
    },
    middleware: 'login',
    components: {}
  }
</script>

<style></style>
