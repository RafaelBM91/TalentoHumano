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

          <div v-if="error" class="field">
            <span class="tag is-warning">
              {{ error }}
              <button class="delete is-small"></button>
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

          <div class="field">
            <p class="control">
              <button class="button is-outlined is-dark" type="submit">
                Guardar / Editar
              </button>
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
            <tr v-for="u in lista">
              <td>{{u.cedula}}</td>
              <td>{{u.nombre}}</td>
              <td>{{u.grado}}</td>
              <td>
                <a class="button is-small is-outlined is-dark">Editar</a>
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

  export default {
    data () {
      return {
        cedula: '',
        nombre: '',
        grado: 'null',
        clave: '',
        error: null,
        lista: []
      }
    },
    methods: {
      send () {

      }
    },
    middleware: 'auth',
    components: {}
  }
</script>

<style></style>
