const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String // Add this line
});

module.exports = mongoose.model('MenuItem', menuItemSchema);