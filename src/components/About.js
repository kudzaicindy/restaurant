import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-gray-800">About Elegance</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">Back to Home</Link>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif mb-8 text-center text-gray-800">Our Story</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="mb-6 text-gray-700">
              Elegance Restaurant was founded in 2010 with a vision to bring exquisite dining experiences to our community. Our passion for culinary excellence and commitment to using the finest ingredients have made us a favorite among food enthusiasts.
            </p>
            <p className="mb-6 text-gray-700">
              Our team of expert chefs, led by renowned Chef John Doe, crafts each dish with precision and creativity, ensuring a memorable dining experience for all our guests.
            </p>
            <p className="text-gray-700">
              We believe in sustainable practices and source our ingredients from local farmers and suppliers whenever possible. Our commitment to quality extends beyond our food to our service, ambiance, and overall guest experience.
            </p>
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

export default About;