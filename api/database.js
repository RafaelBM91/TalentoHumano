const Sequelize = require('sequelize');

const sequelize = new Sequelize('talento_humano', 'dev', 'sistema', {
  host: 'localhost',
  dialect: 'mysql'
});

const Usuarios = sequelize.define('usuario', {
  _id: { type: Sequelize.STRING, primaryKey: true },
  cedula: { type: Sequelize.STRING, unique: true },
  nombre: Sequelize.STRING,
  grado: Sequelize.STRING,
  clave: Sequelize.STRING,
});

const Empleados = sequelize.define('empleado', {
  _id: { type: Sequelize.STRING, primaryKey: true },
  cedula: { type: Sequelize.STRING, unique: true },
  nombre: Sequelize.STRING,
  apellido: Sequelize.STRING,
  ingreso: Sequelize.STRING,
  cargo: Sequelize.STRING,
  salario: Sequelize.FLOAT(8,2),
  estado: Sequelize.STRING,
  departamento: Sequelize.STRING
});

const Nominas = sequelize.define('nomina', {
  _id: { type: Sequelize.STRING, primaryKey: true },
  numero: { type: Sequelize.INTEGER, unique: true },
  fecha: Sequelize.STRING,
  concepto: Sequelize.STRING,
  periodo: Sequelize.STRING
});

const Detalles = sequelize.define('detalle', {
  _id: { type: Sequelize.STRING, primaryKey: true },
  concepto: Sequelize.STRING,
  asignacion: Sequelize.FLOAT(8,2),
  deduccion: Sequelize.FLOAT(8,2),
  index: Sequelize.INTEGER
});

Nominas.hasMany(Detalles);

Empleados.hasMany(Detalles);

sequelize.sync();

module.exports = sequelize.models;
