const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const users = require('./routes/users');

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// TODO: app use session with server-side memory cache (redis) - this is faster than using mongo database
app.use(session({
  secret: 'secret',
  resave: true,            // autosave session everytime there is a change
  saveUninitialized: true,  // save uninitialized (new) sessions
  cookie: { httpOnly: true, maxAge: 2419200000 }  // configure when sessions expire
}));

// To prevent errors from Cross Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Methods, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// configure users API
app.use('/users', users);

const port = process.env.API_PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on:\n\n\thttp://localhost:${port}`);
});
