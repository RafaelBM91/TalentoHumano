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
} = require('graphql');

const { Usuarios, Empleados } = require('./collection');

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
    departamento: { type: GraphQLString },
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
        Usuarios.findOne({ cedula }),
    },
    usuarios: {
      type: new GraphQLList(Usuario),
      resolve: (_,{}) =>
        Usuarios.find({}),
    },
    empleado: {
      type: Empleado,
      args: {
        cedula: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_,{cedula}) =>
        Empleados.findOne({ cedula })
    },
    empleados: {
      type: new GraphQLList(Empleado),
      resolve: (_,{}) =>
        Empleados.find({})
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
        Usuarios.findOneAndUpdate(
          { cedula },
          { nombre, grado, clave },
          { upsert: true, new: true, safe: true, returnNewDocument: true }),
    },
    del_usuario: {
      type: Usuario,
      args: {
        cedula: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_,{cedula}) =>
        Usuarios.remove({ cedula }),
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
        Empleados.findOneAndUpdate(
          { cedula },
          { nombre, apellido, ingreso,
          cargo, salario, estado, departamento },
          { upsert: true, new: true, safe: true, returnNewDocument: true }),
    },
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
