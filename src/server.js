
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');   
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
  res.json({ message: 'COMP3123 Assignment 1 API is running' });
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);                      

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
