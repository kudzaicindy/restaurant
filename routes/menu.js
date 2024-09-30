const express = require('express');
const router = express.Router();

// Sample menu data (you can replace this with a database connection later)
const menuItems = {
  Breakfast: [
    { id: 1, name: 'Continental Breakfast', price: 12.99, description: 'A selection of pastries, fruits, and coffee', image: '/Breakfast-board28.jpg' },
    { id: 2, name: 'Full English Breakfast', price: 15.99, description: 'Eggs, bacon, sausage, beans, and toast', image: '/breakfast.jpg' },
  ],
  Lunch: [
    { id: 3, name: 'Grilled Chicken Salad', price: 14.99, description: 'Fresh greens with grilled chicken and vinaigrette', image: '/800px-Sirloin_steak.jpg' },
    { id: 4, name: 'Vegetarian Wrap', price: 12.99, description: 'Assorted vegetables in a whole wheat wrap', image: '/download (4).jpg' },
  ],
  Dinner: [
    { id: 5, name: 'Filet Mignon', price: 32.99, description: 'Tender beef filet with red wine reduction', image: '/800px-Sirloin_steak.jpg' },
    { id: 6, name: 'Grilled Salmon', price: 28.99, description: 'Fresh salmon with lemon butter sauce', image: '/download (4).jpg' },
  ],
  Appetizers: [
    { id: 7, name: 'Bruschetta', price: 8.99, description: 'Toasted bread topped with tomatoes, garlic, and basil', image: '/download (4).jpg' },
    { id: 8, name: 'Calamari', price: 10.99, description: 'Crispy fried squid rings with marinara sauce', image: '/download (4).jpg' },
  ],
  "Main Course": [
    { id: 9, name: 'Grilled Ribeye Steak', price: 29.99, description: 'Prime ribeye steak with roasted vegetables', image: '/800px-Sirloin_steak.jpg' },
    { id: 10, name: 'Lobster Tail', price: 34.99, description: 'Butter-poached lobster tail with garlic mashed potatoes', image: '/800px-Sirloin_steak.jpg' },
  ],
  Dessert: [
    { id: 11, name: 'Chocolate Lava Cake', price: 8.99, description: 'Warm chocolate cake with a molten center', image: '/cake-raspberries.jpg' },
    { id: 12, name: 'New York Cheesecake', price: 7.99, description: 'Classic cheesecake with berry compote', image: '/cake-raspberries.jpg' },
  ]
};

// GET all menu items
router.get('/', (req, res) => {
  res.json(menuItems);
});

// GET items for a specific category
router.get('/:category', (req, res) => {
  const category = req.params.category;
  const items = menuItems[category];
  if (!items) return res.status(404).json({ message: 'Category not found' });
  res.json(items);
});

module.exports = router;