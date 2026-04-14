const express = require('express');
const mongoose = require('mongoose');
const port=3000;

const waitlistRoutes = require('./routes/waitlistRoutes');
const connectDB = require('./config/db');


const app = express();

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/waitlist', waitlistRoutes);

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});