<template>
  <div class="column is-11">
    <section class="section" style="padding-top:0px;padding-bottom:12px;">
      <div class="container">
        <h1 class="title" style="margin-bottom:12px;">Usuarios</h1>
      </div>
    </section>
    <div class="columns is-multiline">

      <div class="column is-3">

        <form @submit.prevent="send">

          <div v-if="info" class="field">
            <span class="tag is-info">
              {{ info }}
              <button class="delete is-small" @click="clear_info"></button>
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
              <input class="input is-hovered" type="text" placeholder="Nombre y Apellido" v-model="nombre">
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </p>
          </div>

          <div class="field">
            <p class="control has-icons-left">
              <span class="select">
                <select v-model="grado">
                  <option value="null">-- Seleccione el Grado --</option>
                  <option value="Operador">Operador</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </span>
              <span class="icon is-small is-left">
                <i class="fa fa-user-o"></i>
              </span>
            </p>
          </div>

          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-hovered" type="password" placeholder="Clave" v-model="clave">
              <span class="icon is-small is-left">
                <i class="fa fa-key"></i>
              </span>
            </p>
          </div>

          <div class="field is-grouped">
            <p class="control">
              <button class="button is-outlined is-dark" type="submit">
                Guardar / Editar
              </button>
            </p>
            <p class="control">
              <a class="button is-outlined is-dark"
                @click="cancel">
                Cancelar
              </a>
            </p>
          </div>

        </form>

      </div>

      <div class="column is-7 is-offset-1">
        <table class="table is-narrow">
          <thead>
            <tr>
              <th>Cedula</th>
              <th>Nombre y Apellido</th>
              <th>Grado</th>
              <th>Operar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in usuarios">
              <td>{{u.cedula}}</td>
              <td>{{u.nombre}}</td>
              <td>{{u.grado}}</td>
              <td>
                <div class="field is-grouped">
                  <p class="control">
                    <a class="button is-small is-outlined is-dark"
                      @click="edit(u)" >Editar</a>
                  </p>
                  <p class="control">
                    <a class="button is-small is-outlined is-dark"
                      @click="del_usuario(u.cedula)" >Borrar</a>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Cedula</th>
              <th>Nombre y Apellido</th>
              <th>Grado</th>
              <th>Operar</th>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    created () {
      this.$apollo.query({
        query: gql`
          query {
            usuarios {
              _id
              cedula
              nombre
              grado
              clave
            }
          }
        `
      })
      .then(({ data: { usuarios } }) => { this.usuarios = usuarios })
    },
    data () {
      return {
        cedula: '',
        nombre: '',
        grado: 'null',
        clave: '',
        info: null,
        usuarios: []
      }
    },
    methods: {
      send () {
        if (this.cedula.length > 0 &&
            this.nombre.length > 0 &&
            this.grado !== 'null' &&
            this.clave.length > 0) {
          this.$apollo.mutate({
            mutation: gql`
                mutation Usuario (
                  $cedula: String!
                  $nombre: String!
                  $grado: String!
                  $clave: String!
                ) {
                  usuario (
                    cedula: $cedula
                    nombre: $nombre
                    grado: $grado
                    clave: $clave
                  ) {
                    _id
                    cedula
                    nombre
                    grado
                    clave
                  }
                }
              `,
            variables: {
              cedula: this.cedula,
              nombre: this.nombre,
              grado: this.grado,
              clave: this.clave
            }
          })
          .then(res => {
            console.log(res)
            this.info = 'Operacion Realizada.'
          })
        }
      },
      edit (u) {
        this.cedula = u.cedula
        this.nombre = u.nombre
        this.grado = u.grado
        this.clave = u.clave
      },
      cancel () {
        this.cedula = ''
        this.nombre = ''
        this.grado = 'null'
        this.clave = ''
        this.info = null
      },
      clear_info () {
        this.info = null
      },
      del_usuario (cedula) {
        this.$apollo.mutate({
          mutation: gql`
            mutation Del_Usuario (
              $cedula: String!
            ) {
              del_usuario (
                cedula: $cedula
              ) {
                _id
              }
            }
          `,
          variables: {
            cedula
          }
        })
        .then(res => {
          this.info = 'Operacion Realizada.'
        })
      }
    },
    middleware: 'users',
    components: {}
  }
</script>

<style></style>
