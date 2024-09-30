import React from 'react';
import { Link } from 'react-router-dom';

const DessertItem = ({ name, image, description, price }) => (
  <div className="bg-black p-6 rounded-lg shadow-lg text-center">
    <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
    <h3 className="text-2xl mb-2 font-serif">{name}</h3>
    <p className="text-gray-400 mb-4">{description}</p>
    <span className="text-xl font-semibold">${price.toFixed(2)}</span>
  </div>
);

const DessertMenu = () => {
  const dessertItems = [
    {
      name: 'Chocolate Lava Cake',
      image: '/dessert1.jpg',
      description: 'Warm chocolate cake with a molten center',
      price: 8.99
    },
    {
      name: 'New York Cheesecake',
      image: '/dessert2.jpg',
      description: 'Classic cheesecake with berry compote',
      price: 7.99
    },
    {
      name: 'Tiramisu',
      image: '/dessert3.jpg',
      description: 'Italian coffee-flavored dessert',
      price: 8.99
    },
    {
      name: 'Crème Brûlée',
      image: '/dessert4.jpg',
      description: 'Rich custard topped with caramelized sugar',
      price: 7.99
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-serif">Dessert Menu</h1>
          <Link to="/menu" className="text-white hover:text-gray-300 transition-colors">Back to Menu</Link>
        </div>
      </header>

      <main className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif mb-12 text-center">Our Dessert Offerings</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {dessertItems.map((item) => (
              <DessertItem key={item.name} {...item} />
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

export default DessertMenu;