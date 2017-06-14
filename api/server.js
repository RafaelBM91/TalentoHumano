const express = require('express');
const Nuxt = require('nuxt');
const bodyParser = require('body-parser');
const Session = require('express-session');
const graphQLHTTP = require('express-graphql');
const MongoDBStore = require('connect-mongodb-session')(Session);
const uuid = require('uuid');

let config = require('../nuxt.config.js');
const port = process.env.PORT || '3000'

const Schema = require('./schema');
const { Usuarios } = require('./collection');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', graphQLHTTP({
  schema: Schema,
  graphiql: true
}));
app.post('/graphql', graphQLHTTP({
  schema: Schema,
  graphiql: false
}));

const Store = new MongoDBStore({
  uri: process.env.URL_MONGO || 'mongodb://localhost:27017/talento_humano',
  collection: 'sesion'
});

app.use(Session({
  name: "default",
  secret: uuid(),
  saveUninitialized: true,
  resave: true,
  store: Store,
  cookie: {
    secure: false,
    maxAge: 3600000
  }
}));

app.post('/login', (req, res) => {
  let { cedula, clave } = req.body;
  Usuarios.findOne({ cedula })
    .exec((error,doc) => {
      if (error) return handleError(error);
      if (doc !== null)
        if (doc.clave === clave) {
          ndoc = {
            cedula: doc.cedula,
            nombre: doc.nombre,
            grado: doc.grado,
          };
          req.session.auth = ndoc;
          res.json(ndoc);
        } else
          res.status(401).json({ message: 'Clave erronea, acceso denegado.' });
      else
        res.status(401).json({ message: 'Cedula no registrada, acceso denegado.' });
    });
})

app.post('/logout', (req, res) => {
  delete req.session.auth;
  res.json({ ok: true });
});

config.dev = !(process.env.NODE_ENV === 'production');

let nuxt = new Nuxt(config);

const promise = (!(config.dev) ? Promise.resolve() : nuxt.build());

promise.then(() => {
  app.use(nuxt.render);
  app.listen(3000);
  console.log('Server is listening on http://localhost:3000');
})
.catch((error) => {
  console.error(error);
  process.exit(1);
});
