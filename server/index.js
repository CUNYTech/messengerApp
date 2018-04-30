const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

const users = require('./routes/users');
const iota_api = require('./routes/iota_api');

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// To prevent errors from Cross Origin Resource Sharing
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Methods, Access-Control-Request-Headers');
//   res.setHeader('Cache-Control', 'no-cache');
//   next();
// });

app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:8080', 'http://localhost:8080'];
  const origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// TODO: app use session with server-side memory cache (redis) - this is faster
app.use(session({
  secret: 'secret',
  resave: true,            // autosave session everytime there is a change
  saveUninitialized: true,  // save uninitialized sessions
  cookie: { 
    secure: false,
    maxAge: 60*60*1000,
  },
  store: new MongoStore({
    url: 'mongodb://localhost:27017/tanglechat',
    ttl: 60*60,
    autoRemove: 'interval',
    autoRemoveInterval: 10,  // in minutes
  }),
}));

// configure users API
app.use('/users', users);

// configure IOTA API
app.use('/iota', iota_api);

const port = process.env.API_PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on:\n\n\thttp://localhost:${port}`);
});
