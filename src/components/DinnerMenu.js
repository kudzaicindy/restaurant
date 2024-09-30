import React from 'react';
import { Link } from 'react-router-dom';

const DinnerItem = ({ name, image, description, price }) => (
  <div className="bg-black p-6 rounded-lg shadow-lg text-center">
    <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 className="text-2xl mb-2 font-serif">{name}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <span className="text-xl font-semibold">${price.toFixed(2)}</span>
  </div>
);

const DinnerMenu = () => {
  const dinnerItems = [
    {
      name: 'Filet Mignon',
      image: '/dinner1.jpg',
      description: 'Tender beef filet with red wine reduction',
      price: 32.99
    },
    {
      name: 'Grilled Salmon',
      image: '/dinner2.jpg',
      description: 'Fresh salmon with lemon butter sauce',
      price: 28.99
    },
    {
      name: 'Vegetarian Risotto',
      image: '/dinner3.jpg',
      description: 'Creamy risotto with seasonal vegetables',
      price: 22.99
    },
    {
      name: 'Roast Chicken',
      image: '/dinner4.jpg',
      description: 'Herb-roasted chicken with garlic mashed potatoes',
      price: 24.99
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-serif">Dinner Menu</h1>
          <Link to="/menu" className="text-white hover:text-gray-300 transition-colors">Back to Menu</Link>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif mb-12 text-center">Our Dinner Offerings</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {dinnerItems.map((item) => (
              <DinnerItem key={item.name} {...item} />
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Elegance Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DinnerMenu;