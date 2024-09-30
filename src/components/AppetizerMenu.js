// Importing necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// AppetizerItem component: Renders a single appetizer item
const AppetizerItem = ({ name, image, description, price }) => (
  <div className="bg-black p-6 rounded-lg shadow-lg text-center">
    <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 className="text-2xl mb-2 font-serif">{name}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <span className="text-xl font-semibold">${price.toFixed(2)}</span>
  </div>
);

// Main AppetizerMenu component
const AppetizerMenu = () => {
  // Array of appetizer items
  const appetizerItems = [
    {
      name: 'Bruschetta',
      image: '/appetizer1.jpg',
      description: 'Toasted bread topped with tomatoes, garlic, and basil',
      price: 8.99
    },
    {
      name: 'Calamari',
      image: '/appetizer2.jpg',
      description: 'Crispy fried squid rings with marinara sauce',
      price: 10.99
    },
    {
      name: 'Spinach Artichoke Dip',
      image: '/appetizer3.jpg',
      description: 'Creamy dip served with tortilla chips',
      price: 9.99
    },
    {
      name: 'Stuffed Mushrooms',
      image: '/appetizer4.jpg',
      description: 'Mushroom caps filled with herbs and cheese',
      price: 11.99
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header section */}
      <header className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-serif">Appetizer Menu</h1>
          <Link to="/menu" className="text-white hover:text-gray-300 transition-colors">Back to Menu</Link>
        </div>
      </header>

      {/* Main content */}
      <main className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif mb-12 text-center">Our Appetizer Offerings</h2>
          {/* Grid layout for appetizer items */}
          <div className="grid md:grid-cols-2 gap-8">
            {appetizerItems.map((item) => (
              <AppetizerItem key={item.name} {...item} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Elegance Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppetizerMenu;