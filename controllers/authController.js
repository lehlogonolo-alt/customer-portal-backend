const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { fullName, idNumber, accountNumber, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ fullName, idNumber, accountNumber, username, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { username, accountNumber, password } = req.body;
  const user = await User.findOne({ username, accountNumber });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
