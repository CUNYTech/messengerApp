const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const config = require('../../config/db.config');

mongoose.connect(config.database);

const router = new express.Router();

// Passport config
require('../../config/passport.config')(passport);

// Passport middlesware
router.use(passport.initialize());
router.use(passport.session());

const User = require('../models/user');

// READ ALL USERS
router.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) res.send(err);
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
    req.session.user = user;
    res.status(200);
    res.json({ success: 'User successfully logged in!' });
    // res.json('Hello ' + req.session.user.username);
    // res.json(req.session);
  })(req, res, next);
});

// LOGOUT PROCESS
router.post('/logout', (req, res) => {
  if (req.session) req.session.destroy();    // clear session data
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

// UPDATE AN EXISTING USER
router.put('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) res.send(err);
    if (req.body.email) user.email = req.body.email;
    if (req.body.username) user.username = req.body.username;
    if (req.body.password) user.password = req.body.password;
    user.save((err1) => {
      if (err1) res.send(err1);
      res.json({ message: 'User has been updated.' });
    });
  });
});

// DELETE AN EXISTING USER
router.delete('/:id', (req, res) => {
  User.remove({ _id: req.params.id }, (err) => {
    if (err) res.send(err);
    res.json({ message: 'User has been deleted.' });
  });
});

module.exports = router;
