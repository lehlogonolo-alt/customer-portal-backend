const Payment = require('../models/Payment');

exports.submitPayment = async (req, res) => {
  const { amount, currency, provider, payeeAccount, swiftCode } = req.body;
  const payment = new Payment({
    customerId: req.user.userId,
    amount,
    currency,
    provider,
    payeeAccount,
    swiftCode
  });
  await payment.save();
  res.status(201).json({ message: 'Payment submitted' });
};

exports.getPayments = async (req, res) => {
  const payments = await Payment.find({ submittedToSwift: false });
  res.json(payments);
};

exports.verifyPayment = async (req, res) => {
  const { id } = req.params;
  await Payment.findByIdAndUpdate(id, { verified: true });
  res.json({ message: 'Payment verified' });
};

exports.submitToSwift = async (req, res) => {
  const { id } = req.params;
  await Payment.findByIdAndUpdate(id, { submittedToSwift: true });
  res.json({ message: 'Submitted to SWIFT' });
};
