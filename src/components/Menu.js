// Importing necessary dependencies
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Tabs from "@radix-ui/react-tabs";

// MenuItem component: Renders a single menu item
const MenuItem = ({ name, imageUrl, description, price }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
    {/* Render image if imageUrl is provided */}
    {imageUrl && <img src={`http://localhost:5000${imageUrl}`} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />}
    <h3 className="text-2xl mb-2 font-serif text-gray-800">{name}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <span className="text-xl font-semibold text-blue-600">${parseFloat(price).toFixed(2)}</span>
  </div>
);

// Main Menu component
const Menu = () => {
  // State variables
  const [selectedTab, setSelectedTab] = useState("lunch");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Array of menu categories
  const tabItems = [
    "lunch",
    "dinner",
    "breakfast",
    "appetizers",
    "main course",
    "dessert"
  ];

  // Effect hook to fetch menu items when component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Filter out items with missing required fields
        setMenuItems(data.filter(item => item.name && item.description && item.price));
        setError(null);
      } catch (e) {
        console.error("Fetching menu items failed:", e);
        setError("Failed to load menu items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter menu items based on selected category
  const filteredMenuItems = menuItems.filter(item => item.category === selectedTab);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header section */}
      <header className="bg-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-gray-800">Hyatt Regency Menu</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">Back to Home</Link>
        </div>
      </header>

      {/* Main content */}
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif mb-12 text-center text-gray-800">Our Menu</h2>
          {/* Tabs component for menu categories */}
          <Tabs.Root
            className="max-w-screen-xl mt-2 mx-auto"
            value={selectedTab}
            onValueChange={(val) => setSelectedTab(val)}
          >
            {/* Tab list for larger screens */}
            <Tabs.List
              className="hidden bg-gray-200 py-1.5 px-2.5 rounded-lg gap-x-3 overflow-x-auto text-sm sm:flex"
              aria-label="Menu categories"
            >
              {tabItems.map((item, idx) => (
                <Tabs.Trigger
                  key={idx}
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm py-1.5 px-3 rounded-lg duration-150 text-gray-500 hover:text-blue-600 hover:bg-white active:bg-white/50 font-medium"
                  value={item}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {/* Dropdown for mobile screens */}
            <div className="relative text-gray-500 sm:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <select
                value={selectedTab}
                className="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-blue-600 text-sm"
                onChange={(e) => setSelectedTab(e.target.value)}
              >
                {tabItems.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {/* Tab content */}
            {tabItems.map((item, idx) => (
              <Tabs.Content key={idx} className="py-6" value={item}>
                {loading ? (
                  <p className="text-center">Loading menu items...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : filteredMenuItems.length === 0 ? (
                  <p className="text-center">No menu items available for this category.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                    {filteredMenuItems.map((menuItem, index) => (
                      <MenuItem key={index} {...menuItem} />
                    ))}
                  </div>
                )}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-800 font-semibold">Hyatt Regency Harare - The Meikles</p>
        </div>
      </footer>
    </div>
  );
};

export default Menu;