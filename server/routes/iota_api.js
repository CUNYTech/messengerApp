const IOTA = require("iota.lib.js");
const express = require('express');
const router = new express.Router();

// Create a new instance of the IOTA class object. 
// Use 'provider' variable to specify which Full Node to talk to
const iota = new IOTA({
  provider: "https://nodes.testnet.iota.org:443"
});

// Import the Powbox Patch for the IOTA lib
const remoteCurl = require('@iota/curl-remote');

// Patch the current IOTA instance
remoteCurl(iota, `https://powbox.testnet.iota.org`, 500);

// function to sort message log by timestamp
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
router.get('/new_address', (req, res) => {
  const seed = 'AZXSPSLGLSJLUYTXPPFIEYMDCXJLZLSAZKSEGUHBZVP9OPUPOEJFOOQCHAOOIBOKOYOMQRRIUXWRJZBBC';
  iota.api.getNewAddress(seed, (error, address) => {
    if (error) {
      res.status(500);
      throw new Error(error);
    }
    res.status(200);
    res.json({ success: address });
  });
});

// POST NEW MESSAGE
// request should include address and transfers
// result is a callback that responds with the new message retreived from the tangle,
// this is to ensure that the asycnronous api call is completed before our app updates the message history
router.post('/send', (req, res) => {
  const address = req.body.address;
  const message = iota.utils.toTrytes(req.body.message);
  const transfers = [{
    value: 0,
    address: address,
    message: message
  }];
  // post message to the address on the tangle
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
      res.json({ success: newMessage });
    });
  });
});

// GET FULL MESSAGE LOG
// request should include the address and the seed to get the messages from the tangle
// seed must be required to prevent unauthorized access to messages
router.get('/retrieve', (req, res) => {
  // the problem is that when we generate the address from the seed, it is different if the address already exists
  return;
});

// [TEMPORARY] GET FULL MESSAGE LOG
router.post('/retrieve_unsecure', (req, res) => {
  const address = req.body.address;
  iota.api.findTransactionObjects({ 'addresses': [address] }, (error, result) => {
    if (error) {
      res.status(500);
      throw new Error(error);
    }
    const messagelog = sortLog(result);
    res.status(200);
    res.json({ success: messagelog });
  });
});

module.exports = router;
