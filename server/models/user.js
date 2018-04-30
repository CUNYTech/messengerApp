const mongoose = require('mongoose');

// Address Schema
const AddressSchema = mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
  },
});

// User Schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: [AddressSchema],
});

module.exports = mongoose.model('User', UserSchema);
