import React from 'react';
import { Link } from 'react-router-dom';

const BreakfastItem = ({ name, image, description, price }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
    <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 className="text-2xl mb-2 font-serif text-gray-800">{name}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <span className="text-xl font-semibold text-blue-600">${price.toFixed(2)}</span>
  </div>
);

const BreakfastMenu = () => {
  const breakfastItems = [
    {
      name: 'Continental Breakfast',
      image: '/Breakfast-board28.jpg',
      description: 'A selection of pastries, fruits, and coffee',
      price: 12.99
    },
    {
      name: 'Full English Breakfast',
      image: '/breakfast.jpg',
      description: 'Eggs, bacon, sausage, beans, and toast',
      price: 15.99
    },
    {
      name: 'Healthy Start',
      image: '/breakfast1.jpg',
      description: 'Yogurt, granola, and fresh berries',
      price: 10.99
    },
    {
      name: 'Pancake Stack',
      image: '/breakfast2.jpg',
      description: 'Fluffy pancakes with maple syrup and butter',
      price: 11.99
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-gray-800">Breakfast Menu</h1>
          <Link to="/menu" className="text-blue-600 hover:text-blue-800 transition-colors">Back to Menu</Link>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif mb-12 text-center text-gray-800">Our Breakfast Offerings</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {breakfastItems.map((item) => (
              <BreakfastItem key={item.name} {...item} />
            ))}
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

export default BreakfastMenu;