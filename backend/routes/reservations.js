const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const twilio = require('twilio');
const cors = require('cors');

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5001', 'http://localhost:5000'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware to all routes
router.use(cors(corsOptions));

// Twilio setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Log Twilio credentials status
console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID ? 'Set' : 'Not set');
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN ? 'Set' : 'Not set');
console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);

// Helper function to send SMS
async function sendSMS(to, body) {
  try {
    const message = await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to
    });
    console.log('Twilio message sent:', message.sid);
    return true;
  } catch (twilioError) {
    console.error('Twilio Error:', twilioError);
    return false;
  }
}

// GET all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    res.json(reservations);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ message: 'Error fetching reservations', error: err.message });
  }
});

// POST to add a new reservation
router.post('/', async (req, res) => {
  console.log('Received reservation data:', req.body);

  const { name, date, time, guests, phone } = req.body;
  if (!name || !date || !time || !guests || !phone) {
    return res.status(400).json({ message: 'All fields are required: name, date, time, guests, phone' });
  }

  try {
    const newReservation = await new Reservation(req.body).save();
    console.log('Saved reservation:', newReservation);

    // Send confirmation message
    const confirmationSent = await sendSMS(
      newReservation.phone,
      `Your reservation for ${newReservation.guests} guests on ${newReservation.date} at ${newReservation.time} has been confirmed.`
    );

    res.status(201).json({ ...newReservation.toObject(), confirmationSent });
  } catch (err) {
    console.error('Error saving reservation:', err);
    res.status(400).json({ message: 'Error saving reservation', error: err.message });
  }
});

// Confirm a reservation and send a message
router.post('/confirm/:id', async (req, res) => {
  try {
    console.log('Confirming reservation with ID:', req.params.id);
    
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      console.log('Reservation not found');
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    console.log('Found reservation:', reservation);

    // Check if Twilio credentials are set
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      console.error('Twilio credentials are missing');
      return res.status(500).json({ message: 'Server configuration error: Twilio credentials missing' });
    }

    // Format the phone number (remove any non-digit characters and ensure it starts with '+')
    const formattedPhone = '+' + reservation.phone.replace(/\D/g, '');
    console.log('Formatted phone number:', formattedPhone);

    // Send confirmation message
    const messageSent = await sendSMS(
      formattedPhone,
      `Your reservation for ${reservation.guests} guests on ${reservation.date} at ${reservation.time} has been confirmed.`
    );

    if (!messageSent) {
      return res.status(500).json({ message: 'Error sending confirmation message' });
    }

    reservation.confirmed = true;
    await reservation.save();
    console.log('Reservation confirmed and saved');

    res.json({ message: 'Reservation confirmed and message sent' });
  } catch (err) {
    console.error('Error confirming reservation:', err);
    res.status(500).json({ message: 'Error confirming reservation', error: err.message, stack: err.stack });
  }
});

module.exports = router;
