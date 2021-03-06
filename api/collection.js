const mongoose = require('mongoose');
const promise = require('bluebird');

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
mongoose.Promise = promise;

mongoose.connect(process.env.URL_MONGO || 'mongodb://localhost:27017/talento_humano');

mongoose.connection.on('connected', function () {
  console.log('MONGODB CONECTADO');
});

mongoose.connection.on('error',function (err) {
  console.log('MONGODB error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('MONGODB DESCONECTADO');
});

const UsuarioSCH = new Schema({
  cedula: { type: String, unique: true },
  nombre: String,
  grado: String,
  clave: String,
},{
  timestamps: true,
  strict: true,
});

const EmpleadoSCH =  new Schema({
    cedula: String,
    nombre: String,
    apellido: String,
    ingreso: String,
    cargo: String,
    salario: Number,
    estado: String,
    departamento: String
  },{
    timestamps: true,
    strict: true,
});

const NominaSCH =  new Schema({
    numero: Number,
    fecha: String,
    concepto: String,
    periodo: String
  },{
    timestamps: true,
    strict: true,
});

const DetalleSCH =  new Schema({
    nomina: ObjectId,
    cedula: String,
    cuenta: []
  },{
    timestamps: true,
    strict: true,
});

const Usuarios = mongoose.model('usuarios', UsuarioSCH);
const Empleados = mongoose.model('empleados', EmpleadoSCH);
const Nominas = mongoose.model('nominas', NominaSCH);
const Detalles = mongoose.model('detalles', DetalleSCH);

module.exports = { Usuarios, Empleados, Nominas, Detalles };
