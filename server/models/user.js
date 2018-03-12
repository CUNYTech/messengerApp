const mongoose = require('mongoose');

// User Schema
let UserSchema = mongoose.Schema({
  email: {
      type: String
  },
  username: {
      type: String
  },
  password: {
      type: String
  }
});

module.exports = mongoose.model('User', UserSchema);