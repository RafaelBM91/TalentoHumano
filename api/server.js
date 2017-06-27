const express = require('express');
const Nuxt = require('nuxt');
const bodyParser = require('body-parser');
const Session = require('express-session');
const graphQLHTTP = require('express-graphql');
const MySQLStore = require('express-mysql-session')(Session);
const uuid = require('uuid');
var cors = require('cors');

let config = require('../nuxt.config.js');
const port = process.env.PORT || '3000'

const Schema = require('./schema');
const models = require('./database');

const page = require('./reports/recibo')

const app = express();

app.use(cors());
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

var Store = new MySQLStore({
  host: 'localhost',
  port: 3306,
  user: 'dev',
  password: 'sistema',
  database: 'talento_humano'
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
  models.usuario.findOne({
    where: { cedula }
  })
  .then((doc) => {
    if(doc) {
      if (doc.clave === clave) {
        ndoc = {
          cedula: doc.cedula,
          nombre: doc.nombre,
          grado: doc.grado,
        };
        req.session.auth = ndoc;
        res.json(ndoc)
      } else {
        res.status(401).json({ message: 'Clave erronea, acceso denegado.' });
      }
    } else {
      res.status(401).json({ message: 'Cedula no registrada, acceso denegado.' });
    }
  });
})

app.post('/logout', (req, res) => {
  delete req.session.auth;
  res.json({ ok: true });
});

app.get('/report/recibo', (req, res) => {
  page(req,res);
});

config.dev = !(process.env.NODE_ENV === 'production');

let nuxt = new Nuxt(config);

const promise = (!(config.dev) ? Promise.resolve() : nuxt.build());

promise.then(() => {
  app.use(nuxt.render);
  app.listen(3000);
})
.catch((error) => {
  console.error(error);
  process.exit(1);
});
