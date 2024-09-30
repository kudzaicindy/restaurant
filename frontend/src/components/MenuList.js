import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        console.log('Fetching menu items from backend...');
        const response = await axios.get('http://localhost:5001/api/menu');
        console.log('Received menu items:', response.data);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error.response ? error.response.data : error.message);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="menu-list">
      <h2>Our Menu</h2>
      {['lunch', 'dinner'].map(category => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          {menuItems.filter(item => item.category === category).map(item => (
            <div key={item._id} className="menu-item">
              <img src={`http://localhost:5001${item.imageUrl}`} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p><strong>${item.price.toFixed(2)}</strong></p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuList;