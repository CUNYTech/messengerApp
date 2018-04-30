const IOTA = require('iota.lib.js');
const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const config = require('../../config/db.config');

const router = new express.Router();

mongoose.connect(config.database);
const User = require('../models/user');

// Create a new instance of the IOTA class object. 
// Use 'provider' variable to specify which Full Node to talk to
const iota = new IOTA({
  provider: "https://nodes.testnet.iota.org:443"
});

// Import the Powbox Patch for the IOTA lib
const remoteCurl = require('@iota/curl-remote');

// Patch the current IOTA instance
remoteCurl(iota, `https://powbox.testnet.iota.org`, 500);

// SORT MESSAGE LOG BY TIMESTAMP
const sortLog = (block) => {
  let messagelog = [];
  for (let i = 0; i < block.length; i++) {
    // get signatureMessageFragment, truncate trailing 9's, and convert from Trytes
    let msg = iota.utils.fromTrytes(block[i]['signatureMessageFragment'].replace(/9+$/, ""));
    let timestamp = block[i]['timestamp'];
    messagelog.push({ message: msg, timestamp: timestamp });
  }
  messagelog.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
  return messagelog;
};

// GET NODE INFO
router.get('/', (req, res) => {
  iota.api.getNodeInfo((error, info) => {
    if (error) {
      res.status(500);
      throw new Error(error);
    }
    res.status(200);
    res.json({ success: info });
  });
});

// GET NEW ADDRESS
router.post('/new_address', (req, res) => {
  const seed = iota.utils.toTrytes(req.body.passphrase);
  // const seed = 'AZXSPSLGLSJLUYTXPPFIEYMDCXJLZLSAZKSEGUHBZVP9OPUPOEJFOOQCHAOOIBOKOYOMQRRIUXWRJZBBC';  // TESTING
  iota.api.getNewAddress(seed, (error, address) => {
    if (error) {
      res.status(500);
      throw new Error(error);
    }
    res.status(200);
    res.json({ success: address });
  });
});

// CREATE NEW GROUP
router.post('/new_group', (req, res) => {
  // TODO: handle private chatrooms
  // if (req.body.isPrivate) {
  //   const passphrase = req.body.passphrase;
  //   // encrypt chatroom
  // }

  const username = req.body.username;
  const groupname = req.body.groupname;

  const seed = iota.utils.toTrytes(crypto.randomBytes(20).toString('hex'));  // auto-generate a seed (e.g. e065e801d55557ab3c5303a9c1bf2d86341b9a4b)
  iota.api.getNewAddress(seed, (error, address) => {
    if (error) {
      res.status(500);
      throw new Error(error);
    }
    // save new address into database
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        res.status(500);
        throw new Error(err);
      }
      user.addresses.push({
        name: groupname,
        address: address,
        isPrivate: false,
      });
      user.save((err) => {
        if (err) {
          res.status(500);
          throw new Error(err);
        }
        res.status(200);
        res.json({ success: 'Group successfully created.', address: address });
      });
    });
  });
});

// POST NEW MESSAGE
// In the callback, a response is created with the new message retreived from the tangle,
// this is to ensure that the message is on the tangle before our app attempts to retrieve the full log
// TODO: In the request body, include user id (from the session data) and the group name (from the React component state),
// the group name will then be used to access the corresponding address from a Mongo model (id, address, groupName)
router.post('/send', (req, res) => {
  const address = req.body.address;
  const message = iota.utils.toTrytes(req.body.message);
  const transfers = [{
    value: 0,
    address: address,
    message: message
  }];
  // post message to the address on the tangle, sendTransfer(source, minimum weight magnitude, depth, transfers, callback)
  iota.api.sendTransfer(address, 3, 9, transfers, (error, result) => {
    if (error) {
      res.status(500);
      throw new Error(error);
    }
    // retrieve message from the address on the tangle
    iota.api.findTransactionObjects({ 'addresses': [address] }, (error, result) => {
      if (error) {
        res.status(500);
        throw new Error(error);
      }
      const newMessage = sortLog(result)[result.length-1];  // retrieve last message (most recent)
      res.status(200);
      res.json({ success: 'message successfully sent.', new: newMessage });
    });
  });
});

// GET FULL MESSAGE LOG
// Request should include the address and the seed to get the messages from the tangle
// Seed must be required to prevent unauthorized access to messages
// router.get('/retrieve', (req, res) => {
//   // This is a problem since a given seed will not generate the same address if the address already exists (this is unique to IOTA)
//   return;
// });

// [TEMPORARY] GET FULL MESSAGE LOG
// This is unsecure because there is no authorization to access the messages for a given address
router.post('/retrieve', (req, res) => {
  const address = req.body.address;
  iota.api.findTransactionObjects({ 'addresses': [address] }, (error, result) => {
    if (error) {
      res.status(500);
      throw new Error(error);
    }
    const messagelog = sortLog(result);
    res.status(200);
    res.json({ success: 'log successfully retrieved.', log: messagelog });
  });
});

module.exports = router;
