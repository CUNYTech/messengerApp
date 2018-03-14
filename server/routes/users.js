const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/tanglechat');

const router = new express.Router();

const User = require('../models/user');

// READ ALL USERS
router.get('/', (req, res) => {
  User.find((err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
});

// CREATE A NEW USER
router.post('/register', (req, res) => {
  // add a new user to the database
  let user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        res.send(error);
      }
      user.password = hash;
      user.save((wr_error) => {
        if (wr_error) {
          res.send(wr_error);
        }
        res.json({ message: 'User successfully registered.' });
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
