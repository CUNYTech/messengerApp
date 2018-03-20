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
    if (err) return next(err);
    if (!user) return res.json(info);
    res.json({ message: 'User successfully logged in!' });
  })(req, res, next);
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
        res.send(hashErr);
      }
      user.password = hash;
      user.save((wrErr) => {
        if (wrErr) {
          res.send(wrErr);
        }
        res.json({ message: 'User successfully registered!' });
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
