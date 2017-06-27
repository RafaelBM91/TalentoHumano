const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = require('graphql');

const uuid = require('uuid');

// Usuarios, Empleados, Nominas, Detalles, Cuentas

const models = require('./database');

const Usuario =  new GraphQLObjectType({
  name: "Usuario",
  fields: {
    _id: { type: GraphQLID },
    cedula: { type: GraphQLString },
    nombre: { type: GraphQLString },
    grado: { type: GraphQLString },
    clave: { type: GraphQLString },
  }
});

const Empleado =  new GraphQLObjectType({
  name: "Empleado",
  fields: {
    _id: { type: GraphQLID },
    cedula: { type: GraphQLString },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    ingreso: { type: GraphQLString },
    cargo: { type: GraphQLString },
    salario: { type: GraphQLFloat },
    estado: { type: GraphQLString },
    departamento: { type: GraphQLString }
  }
});

const Nomina = new GraphQLObjectType({
  name: "Nomina",
  fields: {
    _id: { type: GraphQLID },
    numero: { type: GraphQLInt },
    fecha: { type: GraphQLString },
    concepto: { type: GraphQLString },
    periodo: { type: GraphQLString },
  }
});

const Detalle = new GraphQLObjectType({
  name: "Detalle",
  fields: {
    _id: { type: GraphQLID },
    nominaId: { type: GraphQLID },
    empleadoId: { type: GraphQLID },
    concepto: { type: GraphQLString },
    asignacion: { type: GraphQLFloat },
    deduccion: { type: GraphQLFloat },
    index: { type: GraphQLInt },
  }
});

const InputDetalle = new GraphQLInputObjectType({
  name: "InputDetalle",
  fields: {
    concepto: { type: new GraphQLNonNull(GraphQLString) },
    asignacion: { type: new GraphQLNonNull(GraphQLFloat) },
    deduccion: { type: new GraphQLNonNull(GraphQLFloat) },
    index: { type: new GraphQLNonNull(GraphQLInt) }
  }
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    usuario: {
      type: Usuario,
      args: {
        cedula: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_,{cedula}) =>
        models.usuario.findOne({ where: { cedula } }),
    },
    usuarios: {
      type: new GraphQLList(Usuario),
      resolve: (_,{}) =>
        models.usuario.findAll(),
    },
    empleado: {
      type: Empleado,
      args: {
        cedula: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_,{cedula}) =>
        models.empleado.findOne({ where: { cedula } })
    },
    empleado_id: {
      type: Empleado,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_,{_id}) =>
        models.empleado.findOne({ where: { _id } })
    },
    empleados: {
      type: new GraphQLList(Empleado),
      resolve: (_,{}) =>
        models.empleado.findAll()
    },
    nomina: {
      type: Nomina,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (_,{_id}) =>
        models.nomina.findOne({ where: { _id } })
    },
    nominas: {
      type: new GraphQLList(Nomina),
      resolve: (_,{}) =>
        models.nomina.findAll()
    },
    nominas_n: {
      type: GraphQLInt,
      resolve: (_,{}) =>
        models.nomina.count()
    },
    detalle: {
      type: new GraphQLList(Detalle),
      args: {
        nominaId: { type: new GraphQLNonNull(GraphQLID) },
        empleadoId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_,{nominaId,empleadoId}) =>
        models.detalle.findAll({ where: { nominaId, empleadoId } })
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    usuario: {
      type: Usuario,
      args: {
        cedula: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        grado: { type: new GraphQLNonNull(GraphQLString) },
        clave: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_,{cedula,nombre,grado,clave}) =>
        models.usuario.findOne({ where: { cedula } })
          .then(function(obj) {
            if(obj) {
              return obj.update({ nombre, grado, clave });
            }
            else {
              return models.usuario.create({ _id: uuid(), cedula, nombre, grado, clave });
            }
          })

    },
    del_usuario: {
      type: Usuario,
      args: {
        cedula: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_,{cedula}) =>
        models.usuario.destroy({ where: { cedula } }),
    },
    empleado: {
      type: Empleado,
      args: {
        cedula: { type: new GraphQLNonNull(GraphQLString) },
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        apellido: { type: new GraphQLNonNull(GraphQLString) },
        ingreso: { type: new GraphQLNonNull(GraphQLString) },
        cargo: { type: new GraphQLNonNull(GraphQLString) },
        salario: { type: new GraphQLNonNull(GraphQLFloat) },
        estado: { type: new GraphQLNonNull(GraphQLString) },
        departamento: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_,{ cedula,
                    nombre,
                    apellido,
                    ingreso,
                    cargo,
                    salario,
                    estado,
                    departamento
                  }) =>
        models.empleado.findOne({ where: { cedula } })
          .then(function(obj) {
            if(obj) {
              return obj.update({
                nombre,
                apellido,
                ingreso,
                cargo,
                salario,
                estado,
                departamento });
            }
            else {
              return models.empleado.create({
                _id: uuid(),
                cedula,
                nombre,
                apellido,
                ingreso,
                cargo,
                salario,
                estado,
                departamento });
            }
          })
    },
    nomina: {
      type: Nomina,
      args: {
        numero: { type: new GraphQLNonNull(GraphQLInt) },
        fecha: { type: new GraphQLNonNull(GraphQLString) },
        concepto: { type: new GraphQLNonNull(GraphQLString) },
        periodo: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_,{numero,fecha,concepto,periodo}) =>
        models.nomina.create({_id: uuid(), numero, fecha, concepto, periodo})
    },
    del_nomina: {
      type: Nomina,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_,{_id}) => {
        models.detalle.destroy({ where: { nominaId: _id } });
        models.nomina.destroy({ where: { _id } });
      },
    },
    detalle: {
      type: Detalle,
      args: {
        nominaId: { type: new GraphQLNonNull(GraphQLID) },
        empleadoId: { type: new GraphQLNonNull(GraphQLID) },
        detalles: { type: new GraphQLNonNull(new GraphQLList(InputDetalle)) }
      },
      resolve: (_,{
        nominaId,
        empleadoId,
        detalles }) => {
          models.detalle.destroy({ where: { nominaId, empleadoId } })
          .then(() => {
            return detalles.map(obj =>
              models.detalle.create({
                _id: uuid(),
                concepto: obj.concepto,
                asignacion: obj.asignacion,
                deduccion: obj.deduccion,
                index: obj.index,
                nominaId,
                empleadoId
              })
            );
          })
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
