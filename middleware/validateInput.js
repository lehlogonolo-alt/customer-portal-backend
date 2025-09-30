const { body } = require('express-validator');

exports.registerValidation = [
  body('fullName').matches(/^[A-Za-z\s]{2,50}$/),
  body('idNumber').matches(/^\d{13}$/),
  body('accountNumber').matches(/^\d{10}$/),
  body('password').matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
];

exports.loginValidation = [
  body('username').notEmpty(),
  body('accountNumber').matches(/^\d{10}$/),
  body('password').notEmpty()
];
