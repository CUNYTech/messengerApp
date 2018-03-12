const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/tanglechat');

// const User = require('./models/user');

const app = express();
// const router = express.Router();

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

// router.get('/', (req, res) => {
//   res.json({message: 'API Initialized'});
// });

// READ ALL USERS
// router.get('/users', (req, res) => {
//   User.find((err, users) => {
//     if(err) {
//       res.send(err);
//     }
//     res.json(users);
//   });
// });

// // CREATE A NEW USER
// router.post('/register', (req, res) => {
//   // add a new user to the database
//   let user = new User();
//   user.email = req.body.email;
//   user.username = req.body.username;
//   user.password = req.body.password;
//   user.save((err) => {
//     if(err) {
//       res.send(err);
//     }
//     res.json({message: 'User successfully registered.'});
//   });
// });

// // UPDATE AN EXISTING USER
// router.put('/users/:id', (req, res) => {
//   User.findById(req.params.id, (err, user) => {
//     if(err) {
//       res.send(err);
//     }
//     // set fields to whatever has changed. If nothing changed, we will not alter the field.
//     (req.body.email) ? user.email = req.body.email : null;
//     (req.body.username) ? user.username = req.body.username : null;
//     (req.body.password) ? user.password = req.body.password : null;
//     user.save((err) => {
//       if(err) {
//         res.send(err);
//       }
//       res.json({message: 'User has been updated.'});
//     });
//   });
// });

// // DELETE AN EXISTING USER
// router.delete('/users/:id', (req, res) => {
//   User.remove({_id: req.params.id}, (err, user) => {
//     if(err) {
//       res.send(err);
//     }
//     res.json({message: 'User has been deleted.'});
//   });
// });

// use router configuration when we call /api
// app.use('/api', router);

// configure users API
const users = require('./routes/users');
app.use('/users', users);

const port = process.env.API_PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on:\n\n\thttp://localhost:${port}`);
});