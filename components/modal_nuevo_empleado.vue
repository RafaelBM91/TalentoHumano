<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Nuevo Empleado</p>
        <button class="delete" @click="callback()"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns is-multiline">

          <div class="column is-6">

            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input is-hovered"
                  type="text"
                  v-model="cedula"
                  placeholder="Cedula" >
                <span class="icon is-small is-left">
                  <i class="fa fa-vcard"></i>
                </span>
              </p>
            </div>

            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input is-hovered"
                  type="text"
                  v-model="nombre"
                  placeholder="Nombre" >
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>

            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input is-hovered"
                  type="text"
                  v-model="apellido"
                  placeholder="Apellido" >
                <span class="icon is-small is-left">
                  <i class="fa fa-user-o"></i>
                </span>
              </p>
            </div>

            <datepicker
              className="input is-hovered"
              :readonly="true"
              format="YYYY-MM-DD"
              placeholder="Fecha de Ingreso"
              :callback="(date) => { this.ingreso = date }" ></datepicker>

            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input is-hovered"
                  type="text"
                  v-model="cargo"
                  placeholder="Descripcion del Cargo" >
                <span class="icon is-small is-left">
                  <i class="fa fa-user-o"></i>
                </span>
              </p>
            </div>

          </div>

          <div class="column is-6">

            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input is-hovered"
                  type="number"
                  v-model="salario"
                  placeholder="Salario Base" >
                <span class="icon is-small is-left">
                  <i class="fa fa-money"></i>
                </span>
              </p>
            </div>

            <div class="field">
              <p class="control">
                <span class="select">
                  <select v-model="estado">
                    <option value="null">-- Seleccione Estado Laboral --</option>
                    <option value="Contratado">Contratado</option>
                    <option value="Fijo">Fijo</option>
                    <option value="Alto Nivel">Alto Nivel</option>
                  </select>
                </span>
              </p>
            </div>

            <div class="field">
              <p class="control">
                <span class="select">
                  <select v-model="departamento">
                    <option value="null">-- Seleccione Departamento --</option>
                    <option value="Presidencia">Presidencia</option>
                    <option value="Consultoria Juridica">
                      Consultoria Juridica
                    </option>
                    <option value="Auditoria Interna">Auditoria Interna</option>
                    <option value="Administracion">Administracion</option>
                    <option value="Atencion Integral a la Mujer y al Ciudadano">
                      Atencion Integral a la Mujer y al Ciudadano
                    </option>
                    <option value="Talento Humano">Talento Humano</option>
                    <option value="Tecnologia y Gestion de Proyecto">
                      Tecnologia y Gestion de Proyecto
                    </option>
                  </select>
                </span>
              </p>
            </div>

          </div>

        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" @click="send">Guardar / Editar</a>
        <a class="button" @click="cancelar">Cancelar</a>
      </footer>
    </div>
  </div>
</template>

<script>
  import datepicker from './datepicker'
  import { ApolloM } from '~assets/Query'
  import gql from 'graphql-tag'

  export default {
    props: {
      callback: { type: Function },
      info: { type: Function }
    },
    data () {
      return {
        cedula: '',
        nombre: '',
        apellido: '',
        ingreso: '',
        cargo: '',
        salario: '',
        estado: 'null',
        departamento: 'null'
      }
    },
    methods: {
      send () {
        if (this.cedula.length > 0 &&
            this.nombre.length > 0 &&
            this.apellido.length > 0 &&
            this.ingreso.length > 0 &&
            this.cargo.length > 0 &&
            this.salario.length > 0 &&
            this.estado !== 'null' &&
            this.departamento !== 'null') {
          ApolloM({
            mutation: gql`
                mutation Empleado (
                  $cedula: String!
                  $nombre: String!
                  $apellido: String!
                  $ingreso: String!
                  $cargo: String!
                  $salario: Float!
                  $estado: String!
                  $departamento: String!
                ) {
                  empleado (
                    cedula: $cedula
                    nombre: $nombre
                    apellido: $apellido
                    ingreso: $ingreso
                    cargo: $cargo
                    salario: $salario
                    estado: $estado
                    departamento: $departamento
                  ) {
                    _id
                    cedula
                    nombre
                    apellido
                    ingreso
                    cargo
                    salario
                    estado
                    departamento
                  }
                }
              `,
            variables: {
              cedula: this.cedula,
              nombre: this.nombre,
              apellido: this.apellido,
              ingreso: this.ingreso,
              cargo: this.cargo,
              salario: this.salario,
              estado: this.estado,
              departamento: this.departamento
            } })
          .then(res => {
            // console.log(res)
            this.$store.dispatch('pushEmpleado', { nuevo: res.data.empleado })
            this.info('Operacion Realizada.')
            this.callback()
          })
        }
      },
      cancelar () {
        this.cedula = ''
        this.nombre = ''
        this.apellido = ''
        this.ingreso = ''
        this.cargo = ''
        this.salario = ''
        this.estado = 'null'
        this.departamento = 'null'
      }
    },
    components: {
      datepicker
    }
  }
</script>

<style lang="css">
</style>
