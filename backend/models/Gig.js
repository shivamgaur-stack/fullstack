const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Design & Creative',
      'Web Development',
      'Mobile Apps',
      'Digital Marketing',
      'Content Writing',
      'Video & Animation',
    ],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 5,
  },
  deliveryDays: {
    type: Number,
    required: true,
    default: 3,
  },
  image: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Gig', gigSchema);
