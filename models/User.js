const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  idNumber: String,
  accountNumber: String,
  username: String,
  password: String,
  role: { type: String, enum: ['customer', 'employee'], default: 'customer' }
});

module.exports = mongoose.model('User', userSchema);
