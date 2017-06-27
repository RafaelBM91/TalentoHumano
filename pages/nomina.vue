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

        <div class="field has-addons">
          <p class="control">
            <span class="select">
              <select v-model="nomina">
                <option :value="-1">-- Seleccione Nomina --</option>
                <option v-for="(n,i) in nominas" :value="i">N° {{ n.numero }} - ({{ n.fecha }})</option>
              </select>
            </span>
          </p>
          <p class="control">
            <a class="button" @click="set_nomina">
              Cargar
            </a>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input is-hovered"
              type="number"
              v-model="numero"
              placeholder="Nomina N°"
              readOnly="true" >
            <span class="icon is-small is-left">
              <i class="fa fa-vcard"></i>
            </span>
          </p>
        </div>

        <datepicker
          className="input is-hovered"
          :readonly="true"
          :initValue="this.fecha"
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
            <a class="button is-outlined is-dark" @click="nueva">
              Cargar
            </a>
          </p>
          <p class="control">
            <a class="button is-outlined is-dark"
              @click="cancelar">
              Cancelar
            </a>
          </p>
        </div>

      </div>

      <div v-if="$store.state.empleados.length > 0" class="column is-9 ">

        <div v-if="$store.state.nomina" class="field is-grouped">
          <p class="control">
            <a class="button is-outlined is-info" @click="modal_active">
              Nuevo Empleado
            </a>
          </p>
          <p class="control">
            <a class="button is-outlined is-info" @click="pre">
              <span class="icon is-medium">
                <i class="fa fa-angle-left"></i>
              </span>
            </a>
          </p>
          <p class="control">
            <label class="label">
              {{
                ($store.state.empleados.length) ? (pointer + 1) : 0
              }} de {{ $store.state.empleados.length }}
            </label>
          </p>
          <p class="control">
            <a class="button is-outlined is-info" @click="pos">
              <span class="icon is-medium">
                <i class="fa fa-angle-right"></i>
              </span>
            </a>
          </p>
          <p class="control">
            <span class="select is-info">
              <select @change="select">
                <option v-for="(u,i) in $store.state.empleados" :value="i">
                  {{ u.nombre+' '+u.apellido }}
                </option>
              </select>
            </span>
          </p>
        </div>

        <table v-if="$store.state.nomina" class="table is-bordered is-narrow recibo">
          <tbody>
            <tr>
              <td colspan="2"><b>N°</b>&nbsp;&nbsp;&nbsp;{{ numero }}</td>
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
                CARGO ({{ $store.state.empleados[pointer].estado }})
              </th>
              <th style="text-align:center;">FECHA DE INGRESO</th>
            </tr>
            <tr>
              <td>{{ $store.state.empleados[pointer].cedula }}</td>
              <td>
                {{ $store.state.empleados[pointer].apellido+' '+$store.state.empleados[pointer].nombre }}
              </td>
              <td>{{ $store.state.empleados[pointer].cargo }}</td>
              <td>{{ $store.state.empleados[pointer].ingreso }}</td>
            </tr>
            <tr>
              <th colspan="2">CONCEPTO</th>
              <th>ASIGNACION</th>
              <th>DEDUCCION</th>
            </tr>

            <tr v-for="(d,i) in detalles">
              <td colspan="2">
                <p class="control is-grouped">
                  <a class="button is-small is-inverted is-danger" @click="sub_detalle(i)" >
                    <span class="icon is-small">
                      <i class="fa fa-window-close"></i>
                    </span>
                  </a>
                  <a class="button is-small is-inverted is-info" @click="move_down(i)">
                    <span class="icon is-small">
                      <i class="fa fa-arrow-circle-down"></i>
                    </span>
                  </a>
                  <a class="button is-small is-inverted is-info" @click="move_up(i)">
                    <span class="icon is-small">
                      <i class="fa fa-arrow-circle-up"></i>
                    </span>
                  </a>
                  {{ d.concepto }}
                </p>
              </td>
              <td>Bs. {{ formato(d.asignacion) }}</td>
              <td>Bs. {{ formato(d.deduccion) }}</td>
            </tr>

            <tr>
              <td colspan="2">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-small is-inverted is-info" @click="add_detalle" >
                      <span class="icon is-small">
                        <i class="fa fa-plus-square"></i>
                      </span>
                    </a>
                  </p>
                  <p class="control has-icons-left" style="width:100%;">
                    <input class="input is-small" type="text" v-model="dconcepto" >
                    <span class="icon is-small is-left">
                      <i class="fa fa-align-left"></i>
                    </span>
                  </p>
                </div>
              </td>
              <td>
                <p class="control has-icons-left">
                  <input class="input is-small" type="number"
                  placeholder="solo numeros" v-model="asignacion" >
                  <span class="icon is-small is-left">
                    <i class="fa fa-money"></i>
                  </span>
                </p>
              </td>
              <td>
                <p class="control has-icons-left">
                  <input class="input is-small" type="number"
                  placeholder="solo numeros" v-model="deduccion" >
                  <span class="icon is-small is-left">
                    <i class="fa fa-money"></i>
                  </span>
                </p>
              </td>
            </tr>

            <tr>
              <th colspan="2">TOTAL DE ASIGNACIONES Y DEDUCCIONES</th>
              <td>Bs. {{ formato( asigna() ) }}</td>
              <td>Bs. {{ formato( deduce() ) }}</td>
            </tr>
            <tr>
              <td colspan="2"><b>PERIODO:</b>&nbsp;&nbsp;&nbsp;{{ periodo }}</td>
              <td colspan="2"><b>NETO A COBRAR:</b>&nbsp;&nbsp;&nbsp;Bs. {{ formato( asigna() - deduce() ) }}</td>
            </tr>
            <tr>
              <td colspan="4" style="text-align:center;">{{ letras(asigna() - deduce()) }}</td>
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
  import gql from 'graphql-tag'
  import _ from 'lodash'
  import NumeroALetras from '~assets/NumerosALetras'
  import numeral from 'numeral'

  export default {
    async created () {
      this.cancelar()
      let { data } = await this.$apollo.query({
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
            nominas_n
          }
        `
      })
      this.$store.dispatch('initEmpleados', {
        lista: data.empleados
      })
      this.$store.dispatch('set_mominas_n', {
        numero: data.nominas_n
      })
    },
    data () {
      return {
        numero: null,
        fecha: null,
        concepto: null,
        periodo: null,

        modal: false,
        info: null,
        pointer: 0,
        detalles: [],

        dconcepto: null,
        asignacion: null,
        deduccion: null,

        nomina: -1
      }
    },
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
    methods: {
      modal_active () {
        this.modal = !this.modal
      },
      clear_info () {
        this.info = null
      },
      pos () {
        if (this.pointer < (this.$store.state.empleados.length - 1)) {
          this.pointer++
          this.actual()
        }
      },
      pre () {
        if (this.pointer > 0) {
          this.pointer--
          this.actual()
        }
      },
      select (e) {
        let value = parseInt(e.target.value, 10)
        this.pointer = value
        this.actual()
      },

      /** ZONA NOMINA **/
      nueva () {
        this.$apollo.mutate({
          mutation: gql`
            mutation Nomina (
              $numero: Int!
              $fecha: String!
              $concepto: String!
              $periodo: String!
            ) {
              nomina (
                numero: $numero
                fecha: $fecha
                concepto: $concepto
                periodo: $periodo
              ) {
                _id
                numero
                fecha
                concepto
                periodo
              }
            }
          `,
          variables: {
            numero: (this.$store.state.nominas_n + 1),
            fecha: this.fecha,
            concepto: this.concepto,
            periodo: this.periodo
          }
        })
        .then((res) => {
          console.log(res.data)
          this.$store.dispatch('set_momina', {
            nomina: res.data.nomina
          })
        })
      },
      set_nomina () {
        if (this.nomina > -1) {
          this.$store.dispatch('set_momina', {
            nomina: this.nominas[this.nomina]
          })
          this.numero = this.nominas[this.nomina].numero
          this.fecha = this.nominas[this.nomina].fecha
          this.concepto = this.nominas[this.nomina].concepto
          this.periodo = this.nominas[this.nomina].periodo
          // actualiza la cuenta del empleado
          this.actual()
        }
      },
      /** FIN **/

      /** ZONA DETALLE **/
      add_detalle () {
        let array = this.detalles.slice()
        array.push({
          concepto: this.dconcepto,
          asignacion: this.asignacion,
          deduccion: this.deduccion,
          index: array.length
        })
        this.detalles = array
        this.change_detalle(array)
        this.dconcepto = null
        this.asignacion = null
        this.deduccion = null
      },
      sub_detalle (n) {
        let array = this.detalles.slice()
        array.splice(n, 1)
        this.detalles = array
        this.change_detalle(array)
      },
      change_detalle (array) {
        array = array.map(o => _.pick(o, [ 'concepto',
          'asignacion',
          'deduccion',
          'index' ]))
        this.$apollo.mutate({
          mutation: gql`
            mutation Detalle (
              $nominaId: ID!
              $empleadoId: ID!
              $detalles: [InputDetalle]!
            ) {
              detalle (
                nominaId: $nominaId
                empleadoId: $empleadoId
                detalles: $detalles
              ) {
                _id
              }
            }
          `,
          variables: {
            nominaId: this.$store.state.nomina._id,
            empleadoId: this.$store.state.empleados[this.pointer]._id,
            detalles: array
          }
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
      },
      actual () {
        this.$apollo.query({
          query: gql`
            query Detalle (
              $nominaId: ID!
              $empleadoId: ID!
            ) {
              detalle (
                nominaId: $nominaId
                empleadoId: $empleadoId
              ) {
                concepto
                asignacion
                deduccion
                index
              }
            }
          `,
          variables: {
            nominaId: this.$store.state.nomina._id,
            empleadoId: this.$store.state.empleados[this.pointer]._id
          }
        })
        .then(({ data: { detalle } }) => {
          this.detalles = detalle
        })
      },
      move_down (pos) {
        let array = this.detalles.slice()
        let len = array.length
        if ((pos + 1) <= (len - 1)) {
          let aux = array[pos + 1]
          array[pos + 1] = array[pos]
          array[pos] = aux
          this.change_detalle(array)
          this.detalles = array
        }
      },
      move_up (pos) {
        let array = this.detalles.slice()
        if ((pos - 1) >= 0) {
          let aux = array[pos - 1]
          array[pos - 1] = array[pos]
          array[pos] = aux
          this.change_detalle(array)
          this.detalles = array
        }
      },
      /** FIN **/

      asigna () {
        return _.sumBy(this.detalles, o => parseFloat(o.asignacion, 10))
      },
      deduce () {
        return _.sumBy(this.detalles, o => parseFloat(o.deduccion, 10))
      },
      letras (numero) {
        return NumeroALetras(numero)
      },
      formato (numero) {
        return numeral(numero).format('0,0.00')
      },

      cancelar () {
        this.numero = null
        this.fecha = null
        this.concepto = null
        this.periodo = null
        this.modal = false
        this.info = null
        this.pointer = 0
        this.detalles = []
        this.dconcepto = null
        this.asignacion = null
        this.deduccion = null
        this.nomina = -1
        this.$store.dispatch('set_momina', {
          nomina: null
        })
      }
    },
    middleware: 'auth',
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
