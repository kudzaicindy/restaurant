const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5001', 'http://localhost:5000'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware to all routes
router.use(cors(corsOptions));

// GET all menu items
router.get('/', async (req, res) => {
  try {
    console.log('Fetching menu items...');
    const menuItems = await MenuItem.find().maxTimeMS(30000);
    console.log('Fetched menu items:', menuItems);
    res.json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ message: 'Error fetching menu items', error: err.message });
  }
});

// GET menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ category: req.params.category }).maxTimeMS(30000);
    res.json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items by category:', err);
    res.status(500).json({ message: 'Error fetching menu items by category', error: err.message });
  }
});

// POST to add a new menu item
router.post('/', upload.single('image'), async (req, res) => {
  console.log('Received menu item data:', req.body);
  console.log('Received file:', req.file);

  try {
    if (!req.file) {
      throw new Error('No image file uploaded');
    }

    const menuItem = new MenuItem({
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      category: req.body.category,
      imageUrl: `/uploads/${req.file.filename}`
    });

    const newMenuItem = await menuItem.save({ maxTimeMS: 30000 });
    console.log('Saved menu item:', newMenuItem);
    res.status(201).json(newMenuItem);
  } catch (err) {
    console.error('Error saving menu item:', err);
    res.status(400).json({ message: 'Error saving menu item', error: err.message });
  }
});

module.exports = router;