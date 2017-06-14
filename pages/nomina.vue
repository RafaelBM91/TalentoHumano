<template>
  <div class="column is-11">
    <section class="section" style="padding-top:0px;padding-bottom:12px;">
      <div class="container">
        <h1 class="title" style="margin-bottom:12px;">Nomina</h1>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-3">

        <div v-if="info" class="field">
          <span class="tag is-info">
            {{ info }}
            <button class="delete is-small" @click="clear_info"></button>
          </span>
        </div>

        <datepicker
          className="input is-hovered"
          :readonly="true"
          format="YYYY-MM-DD"
          placeholder="Fecha"
          :callback="(date) => { this.fecha = date }" ></datepicker>

          <div class="field">
            <p class="control has-icons-left">
              <textarea
                class="textarea is-hovered"
                placeholder="Concepto"
                style="padding-left:28px;resize:none;"
                v-model="concepto" ></textarea>
              <span class="icon is-small is-left">
                <i class="fa fa-align-left"></i>
              </span>
            </p>
          </div>

          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-hovered" type="text" placeholder="Periodo (desde - hasta)" v-model="periodo">
              <span class="icon is-small is-left">
                <i class="fa fa-calendar"></i>
              </span>
            </p>
          </div>

          <div class="field is-grouped">
            <p class="control">
              <a class="button is-outlined is-info" @click="modal_active">
                Nuevo Empleado
              </a>
            </p>
            <p class="control">
              <a class="button is-outlined is-info">
                <span class="icon is-medium">
                  <i class="fa fa-angle-left"></i>
                </span>
              </a>
            </p>
            <p class="control">
              <label class="label">
                1 de {{ $store.state.empleados.length }}
              </label>
            </p>
            <p class="control">
              <a class="button is-outlined is-info">
                <span class="icon is-medium">
                  <i class="fa fa-angle-right"></i>
                </span>
              </a>
            </p>
            <p class="control">
              <span class="select is-info">
                <select>
                  <option v-for="(u,i) in $store.state.empleados" :value="i">
                    {{ u.nombre+' '+u.apellido }}
                  </option>
                </select>
              </span>
            </p>
          </div>
      </div>

      <div class="column is-11">
        <table class="table is-bordered is-narrow recibo">
          <tbody>
            <tr>
              <td colspan="2"><b>N°</b>&nbsp;&nbsp;&nbsp;1</td>
              <td colspan="2"><b>FECHA:&nbsp;&nbsp;&nbsp;</b>{{ fecha }}</td>
            </tr>
            <tr>
              <th colspan="4" style="text-align:center;">
                RECIBO DE PAGO SIN DESGLOSE DE MONEDA GRAFICO
              </th>
            </tr>
            <tr>
              <th style="text-align:center;">CEDULA</th>
              <th style="text-align:center;">APELLIDOS Y NOMBRES</th>
              <th style="text-align:center;">
                CARGO ({{ $store.state.empleados[0].estado }})
              </th>
              <th style="text-align:center;">FECHA DE INGRESO</th>
            </tr>
            <tr>
              <td>{{ $store.state.empleados[0].cedula }}</td>
              <td>
                {{ $store.state.empleados[0].apellido+' '+$store.state.empleados[0].nombre }}
              </td>
              <td>{{ $store.state.empleados[0].cargo }}</td>
              <td>{{ $store.state.empleados[0].ingreso }}</td>
            </tr>
            <tr>
              <th colspan="2">CONCEPTO</th>
              <th>ASIGNACION</th>
              <th>DEDUCCION</th>
            </tr>

            <tr>
              <td colspan="2"></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <th colspan="2">TOTAL DE ASIGNACIONES Y DEDUCCIONES</th>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td colspan="2"><b>PERIODO:</b>&nbsp;&nbsp;&nbsp;{{ periodo }}</td>
              <td colspan="2"><b>NETO A COBRAR:</b> </td>
            </tr>
            <tr>
              <td colspan="4" style="text-align:center;">BOLIVARES EN LETRAS</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <nuevoEmpleado
      v-if="modal"
      :callback="() => { this.modal = !this.modal }"
      :info="(n) => { this.info = n }" />

  </div>
</template>

<script>
  import datepicker from '~components/datepicker'
  import nuevoEmpleado from '~components/modal_nuevo_empleado'
  import { ApolloQ } from '~assets/Query'
  import gql from 'graphql-tag'

  export default {
    data () {
      // INICIA LA LISTA DE EMPLEADOS
      ApolloQ({
        query: gql`
          query {
            empleados {
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
        ` })
      .then(res => {
        this.$store.dispatch('initEmpleados', { lista: res.data.empleados })
      })
      return {
        fecha: null,
        concepto: null,
        periodo: null,
        modal: false,
        info: null
      }
    },
    methods: {
      modal_active () {
        this.modal = !this.modal
      },
      clear_info () {
        this.info = null
      }
    },
    components: {
      datepicker,
      nuevoEmpleado
    }
  }
</script>

<style>
  .recibo {
    font-size: 13px;
  }
</style>
