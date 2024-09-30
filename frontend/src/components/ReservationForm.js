import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending reservation data:', formData);
      const response = await axios.post('http://localhost:5000/api/reservations', formData);
      console.log('Reservation response:', response.data);
      alert('Reservation submitted successfully!');
      setFormData({ name: '', phone: '', date: '', time: '', guests: 1 });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="guests"
        value={formData.guests}
        onChange={handleChange}
        min="1"
        required
      />
      <button type="submit">Make Reservation</button>
    </form>
  );
};

export default ReservationForm;