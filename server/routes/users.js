const express = require('express');
const mongoose = require('mongoose');

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
  const user = new User();
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;
  user.save((err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'User successfully registered.' });
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
