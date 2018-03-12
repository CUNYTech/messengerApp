const express = require('express');
const validator = require('validator');

const router = new express.Router();

router.post('/register', (req, res) => {
  // res.send({res: "hello"});
  return res.status(200).end();
});

router.post('/login', (req, res) => {
  return res.status(200).end();
});

module.exports = router;