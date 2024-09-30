import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Add phone to the initial state
    date: '',
    time: '',
    guests: '',
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);

    try {
      const response = await fetch('http://localhost:5000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      const data = await response.json();
      console.log('Reservation successful:', data);
      
      if (data.confirmationSent) {
        alert(`Reservation submitted successfully! A confirmation message has been sent to ${formData.phone}.`);
      } else {
        alert('Reservation submitted successfully! However, we couldn\'t send a confirmation message to your phone. Our team will contact you shortly.');
      }

      // Reset the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        specialRequests: ''
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      if (error.message === 'Failed to submit reservation') {
        alert('Unable to submit your reservation. Please try again later.');
      } else {
        alert('There was an unexpected error. Please try again or contact support.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-800">
      <header className="bg-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold text-gray-800">Make a Reservation</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors text-lg">Back to Home</Link>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-4xl font-serif mb-8 text-center text-gray-800">Reserve Your Table</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-800">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-800">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-800">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-800">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-800">Number of Guests</label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    min="1"
                    max="20"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-800">Special Requests</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              <div>
                <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                  Submit Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">&copy; 2024 Elegance Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Reservations;
