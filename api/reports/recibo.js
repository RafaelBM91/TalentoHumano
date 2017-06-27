const jsreport = require('jsreport');
const { graphql } = require('graphql');
const numeral = require('numeral');
const _ = require('lodash');

const Schema = require('../schema');
const NumeroALetras = require('./NumerosALetras');

module.exports = (req,res) => {
	let {nomina,empleado} = req.query;
	console.log(empleado);
	graphql(Schema,`
		query {
			nomina (
				_id: "${nomina}"
			) {
				numero
				fecha
				periodo
			}
			empleado_id (
				_id: "${empleado}"
			) {
				cedula
				nombre
				apellido
				cargo
				ingreso
				estado
			}
			detalle (
				nominaId: "${nomina}"
				empleadoId: "${empleado}"
			) {
				concepto
				asignacion
				deduccion
			}
		}
	`)
	.then(({ data: { nomina, empleado_id, detalle } }) => {
		jsreport.render(render_page(nomina,empleado_id,detalle)).then(function(out) {
	    out.stream.pipe(res);
	  }).catch(function(e) {
	    res.end(e.message);
	  });
	})
}

const formato = (numero) => {
	return numeral(numero).format('0,0.00');
}

const asigna = (detalle) => {
	return _.sumBy(detalle, o => parseFloat(o.asignacion, 10))
}

const deduce = (detalle) => {
	return _.sumBy(detalle, o => parseFloat(o.deduccion, 10))
}

const render_page = (nomina,empleado,detalle) =>
	`
		<!DOCTYPE html>
		<html lang="es">
			<head>
				<meta charset="utf-8">
				<title>Recibo de Pago</title>
				<style media="all">
					.content {
						text-align: center;
						justify-content: center;
						-webkit-box-pack: center;
					  -ms-flex-pack: center;
					}
					table {
						border-collapse: collapse;
						min-width: 90%;
					}

					table, th, td {
						border: 1px solid black;
					}
				</style>
			</head>
			<body>

				<div class="content">
					<center>
						<table style="font-size:13px;">
						  <tbody>
						    <tr>
						      <td colspan="2"><b>N°</b>&nbsp;&nbsp;&nbsp;${nomina.numero}</td>
						      <td colspan="2"><b>FECHA:&nbsp;&nbsp;&nbsp;</b>${nomina.fecha}</td>
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
						        CARGO (${empleado.estado})
						      </th>
						      <th style="text-align:center;">FECHA DE INGRESO</th>
						    </tr>
						    <tr>
						      <td>${empleado.cedula}</td>
						      <td>
						        ${empleado.apellido} ${empleado.nombre}
						      </td>
						      <td>${empleado.cargo}</td>
						      <td>${empleado.ingreso}</td>
						    </tr>
						    <tr>
						      <th colspan="2">CONCEPTO</th>
						      <th>ASIGNACION</th>
						      <th>DEDUCCION</th>
						    </tr>

								${
								  detalle.map(obj =>
								    `<tr>
								      <td colspan="2" style="text-align:left;">
								        ${obj.concepto}
								      </td>
								      <td style="text-align:right;">Bs. ${ formato(obj.asignacion) }</td>
								      <td style="text-align:right;">Bs. ${ formato(obj.deduccion) }</td>
								    </tr>`
								  )
								}

						    <tr>
						      <th colspan="2">TOTAL DE ASIGNACIONES Y DEDUCCIONES</th>
						      <td style="text-align:right;">Bs. ${ formato( asigna(detalle) ) }</td>
						      <td style="text-align:right;">Bs. ${ formato( deduce(detalle) ) }</td>
						    </tr>
						    <tr>
						      <td colspan="2" style="text-align:left;"><b>PERIODO:</b>&nbsp;&nbsp;&nbsp;${nomina.periodo}</td>
						      <td colspan="2"><b>NETO A COBRAR:</b>&nbsp;&nbsp;&nbsp;Bs. ${ formato( asigna(detalle) - deduce(detalle) ) }</td>
						    </tr>
						    <tr>
						      <td colspan="4" style="text-align:center;">${ NumeroALetras( asigna(detalle) - deduce(detalle) ) }</td>
						    </tr>
						  </tbody>
						</table>
					</center>
				</div>

			</body>
		</html>
	`;
