const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// 🔐 Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// 🔗 Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/employee', require('./routes/employeeRoutes'));  // employee-only routes

// ⚠️ Fallback error handler (optional)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


