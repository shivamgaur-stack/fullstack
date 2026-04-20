const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true    
  },
  email: {
    type: String,
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true 
  },
  phone: {
    type: String,
    required: true,
    unique:true
  },
  joinedAt: {
    type: Date,
    default: Date.now 
  }
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

module.exports = Waitlist;
