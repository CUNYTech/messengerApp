const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// allow JSON data in request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
const users = require('./routes/users');
app.use('/users', users);

const port = process.env.API_PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on:\n\n\thttp://localhost:${port}`);
});