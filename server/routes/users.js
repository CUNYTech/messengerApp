const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const config = require('../../config/db.config');

mongoose.connect(config.database);

const router = new express.Router();

// Passport middlesware
router.use(passport.initialize());
router.use(passport.session());

// Passport config
require('../../config/passport.config')(passport);

const User = require('../models/user');

// GET SERVER STATUS
router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Server is running...' });
});

// GET ALL USERS
router.get('/all', (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.status(500);
      throw new Error(err);
    }
    res.json(users);
  });
});

// LOGIN PROCESS
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(500);
      throw new Error(err);
    }
    if (!user) {
      res.status(401);
      return res.json(info);
    }
    // req.session.user = user;
    // req.session.save((err) => {
    //   if (err) {
    //     res.status(500);
    //     throw new Error(err);
    //   }
    //   res.status(200);
    //   // res.json({ success: 'User successfully logged in!' });
    //   res.json({ success: 'User successfully logged in!', session: req.session });
    //   // res.json(req.sessionID);
    // });
    req.login(user, (err) => {
      if (err) {
        res.status(500);
        throw new Error(err);
      }
      req.session.sessionID = req.sessionID;
      res.status(200);
      res.json({ 
        success: 'User successfully logged in!', 
        sessionID: req.sessionID,
        session: req.session,
        userID: req.session.passport.user, 
        user: req.user,
        isAuthenticated: req.isAuthenticated(),
        headers: req.headers,
      });
    });
  })(req, res, next);
});

// const isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) 
//     return next();
//   else {
//     return res.status(401).json({ error: 'User is not authenticated.', session: req.session, user: typeof getLastSessionUser() });
//   }
// };

// router.get('/check_auth', isAuthenticated, (req, res) => {
//   res.status(200).json({ status: 'User is authenticated.', session: req.session });
// });

router.get('/session', (req, res) => {
  mongoose.connect(config.database);
  mongoose.connection.on('open', (err) => {
    mongoose.connection.db.collection('sessions', (err, docs) => {
      docs.find().limit(1).sort({ $natural:-1 }).toArray((err, result) => {
        // res.write(JSON.stringify(result) + '\n');
        // res.write(typeof result[0].session)
        if (JSON.parse(result[0].session).passport) {
          res.send(JSON.parse(result[0].session).passport.user);
        } else {
          res.send('no active session');
        }
      });
    });
  });
});

// LOGOUT PROCESS
router.post('/logout', (req, res) => {
  // if (req.session) req.session.destroy();    // clear session data
  req.logout();
  res.status(200);
  res.json({ success: 'Successfully logged out!' });
});


// CREATE A NEW USER
router.post('/register', (req, res) => {
  // add a new user to the database
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  bcrypt.genSalt(10, (saltErr, salt) => {
    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) {
        res.status(500);
        res.json({ error: hashErr });
      }
      user.password = hash;
      user.save((writeErr) => {
        if (writeErr) {
          res.status(500);
          res.json({ error: writeErr });
        }
        res.status(200);
        res.json({ success: 'User successfully registered!' });
      });
    });
  });
});

module.exports = router;
