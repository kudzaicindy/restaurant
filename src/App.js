import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Menu from './components/Menu';
import About from './components/About';
import Blog from './components/Blog';
import Reservations from './components/Reservations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </Router>
  );
}

export default App;