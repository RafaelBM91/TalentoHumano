<template>
  <div class="column is-11">
    <section class="section" style="padding-top:0px;padding-bottom:12px;">
      <div class="container">
        <h1 class="title" style="margin-bottom:12px;">Consultar</h1>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-3">

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input
              v-on:keyup.13="find_cedula"
              v-model="cedula"
              class="input is-hovered"
              type="text"
              placeholder="Cedula" >
            <span class="icon is-small is-left">
              <i class="fa fa-vcard"></i>
            </span>
            <span class="icon is-small is-right">
              <i v-if="status === 2" class="fa fa-check"></i>
              <i v-if="status === 1" class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
              <i v-if="status === -1" class="fa fa-warning"></i>
            </span>
          </p>
          <p v-if="status === 2" class="help is-success">Bienvenido(a) {{ nombre }}</p>
          <p v-if="status === -1" class="help is-danger">La cedula no esta reguistrada.</p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <span class="select">
              <select :disabled="empleado === null" v-model="nomina">
                <option :value="null">-- Seleccione la Nomina --</option>
                <option v-for="n in nominas" :value="n._id">N° {{ n.numero }} ({{ n.fecha }})</option>
              </select>
            </span>
            <span class="icon is-small is-left">
              <i class="fa fa-bank"></i>
            </span>
          </p>
        </div>

        <div class="field is-grouped">
          <p class="control">
            <nuxt-link
              class="button is-outlined is-dark"
              v-if="nomina !== null && empleado !== null"
              :to=" '/report/recibo?nomina=' + nomina +'&empleado=' + empleado"
              target="_blank" >Buscar</nuxt-link>
          </p>
          <p class="control">
            <a class="button is-outlined is-dark"
              @click="cancelar">
              Cancelar
            </a>
          </p>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    apollo: {
      nominas: gql`
        query {
          nominas {
            _id
            numero
            fecha
            concepto
            periodo
          }
        }
      `
    },
    data () {
      return {
        cedula: null,
        status: 0,
        empleado: null,
        nombre: null,
        nomina: null
      }
    },
    methods: {
      find_cedula () {
        this.status = 1
        this.$apollo.query({
          query: gql`
            query Empleado (
              $cedula: String!
            ) {
              empleado (
                cedula: $cedula
              ) {
                _id
                nombre
                apellido
              }
            }
          `,
          variables: {
            cedula: this.cedula
          }
        })
        .then(({ data: { empleado } }) => {
          if (empleado) {
            this.empleado = empleado._id
            this.nombre = empleado.nombre + ' ' + empleado.apellido
            this.status = 2
          } else {
            this.status = -1
          }
        })
      },
      cancelar () {
        console.log(this.empleado, this.nomina)
      }
    },
    components: {}
  }
</script>

<style></style>
