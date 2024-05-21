const app = require('../app')
const mongoose = require('mongoose');
const socket = require('./socket');


mongoose.connect('mongodb://localhost:27017/your_database')
.then(() => {
  console.log('MongoDB connection established')
    })
.catch((err) => console.error('MongoDB connection error:', err));
