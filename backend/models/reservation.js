const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: Date,
  time: String,
  guests: Number
});

module.exports = mongoose.model('Reservation', reservationSchema);