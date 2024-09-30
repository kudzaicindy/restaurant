// Import necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// BlogPost component: Renders a single blog post
const BlogPost = ({ title, date, excerpt }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
    <h3 className="text-2xl mb-2 font-serif text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-4">{date}</p>
    <p className="mb-4 text-gray-700">{excerpt}</p>
    <Link to="#" className="text-blue-600 hover:text-blue-800 transition-colors">Read more</Link>
  </div>
);

// Main Blog component
const Blog = () => {
  // Array of blog post data
  const blogPosts = [
    {
      title: "Summer Menu Unveiled",
      date: "June 1, 2024",
      excerpt: "Discover our new summer dishes featuring fresh, seasonal ingredients..."
    },
    {
      title: "Meet Our New Head Chef",
      date: "May 15, 2024",
      excerpt: "We're excited to welcome Chef Sarah Johnson to the Elegance family..."
    },
    {
      title: "The Art of Food Plating",
      date: "April 22, 2024",
      excerpt: "Learn about the importance of presentation in culinary arts..."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header section */}
      <header className="bg-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-gray-800">Elegance Blog</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">Back to Home</Link>
        </div>
      </header>

      {/* Main content */}
      <main className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif mb-12 text-center text-gray-800">Latest Posts</h2>
          {/* Render BlogPost components for each blog post */}
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">&copy; 2024 Elegance Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;