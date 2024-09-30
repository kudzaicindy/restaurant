// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { Clock, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define the background image path
const backgroundImage = '/hyatt.jpg';

// AnimatedSection component for smooth animations
const AnimatedSection = ({ children }) => {
  // Use intersection observer to trigger animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Define animation properties
  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: config.slow,
  });

  // Render animated section
  return (
    <animated.div ref={ref} style={animation}>
      {children}
    </animated.div>
  );
};

// Main HomePage component
const HomePage = () => {
  // State to track scroll position
  const [scrollY, setScrollY] = useState(0);

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation for header background opacity
  const headerAnimation = useSpring({
    backgroundColor: `rgba(255,255,255,${Math.min(scrollY / 300, 0.95)})`,
  });

  // Parallax effect for background image
  const parallaxProps = useSpring({
    from: { transform: 'translate3d(0,0px,0)' },
    to: { transform: `translate3d(0,${scrollY * 0.5}px,0)` },
  });

  // Render the HomePage component
  return (
    <div className="homepage min-h-screen bg-white text-gray-800">
      {/* Animated header */}
      <animated.header className="fixed w-full z-10 shadow-md" style={headerAnimation}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-serif text-gray-800 font-bold">Hyatt Regency</h1>
          <nav>
            <ul className="flex space-x-8">
              <li><Link to="/menu" className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-semibold">Menu</Link></li>
              <li><Link to="/about" className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-semibold">About</Link></li>
              <li><Link to="/blog" className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-semibold">Blog</Link></li>
              <li><Link to="/reservations" className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-semibold">Reservations</Link></li>
              <li><a href="#contact" className="text-gray-800 hover:text-blue-600 transition-colors text-lg font-semibold">Contact</a></li>
            </ul>
          </nav>
        </div>
      </animated.header>

      <main>
        {/* Hero section with parallax effect */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <animated.div className="absolute inset-0 z-0" style={parallaxProps}>
            <img src={backgroundImage} alt="Hyatt Regency" className="w-full h-full object-cover" />
          </animated.div>
          <div className="relative z-10 text-center bg-white bg-opacity-80 p-8 rounded-lg">
            <AnimatedSection>
              <h2 className="text-5xl md:text-7xl font-serif mb-4 text-gray-800">Hyatt Regency</h2>
              <p className="text-xl md:text-2xl mb-8 text-gray-700">Experience culinary artistry in every bite</p>
              <Link to="/reservations" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-colors inline-block">
                Reserve a Table
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Menu section */}
        <section id="menu" className="py-20 bg-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-4xl font-serif mb-12 text-center text-gray-800">Our Signature Dishes</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Map through menu categories */}
              {[
                { name: 'Appetizer', image: '/download (4).jpg', icon: '🍽️' },
                { name: 'Main Course', image: '/800px-Sirloin_steak.jpg', icon: '🍖' },
                { name: 'Dessert', image: '/cake-raspberries.jpg', icon: '🍰' }
              ].map((category) => (
                <AnimatedSection key={category.name}>
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl">
                      {category.icon}
                    </div>
                    <img src={category.image} alt={category.name} className="w-full h-48 object-cover rounded-lg mb-4 mt-6" />
                    <h3 className="text-2xl mb-2 font-serif text-gray-800">{category.name}</h3>
                    <p className="text-gray-600 mb-4">Description of our exquisite {category.name.toLowerCase()}</p>
                    <span className="text-xl font-semibold text-blue-600">${(Math.random() * 20 + 15).toFixed(2)}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Reservations section */}
        <section id="reservations" className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src="/jij.jpg" alt="Restaurant ambiance" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <AnimatedSection>
              <h2 className="text-4xl font-serif mb-8 text-gray-800">Experience Elegance</h2>
              <p className="mb-8 text-lg text-gray-700">Join us for an unforgettable dining experience. Reserve your table now and indulge in culinary excellence.</p>
              <Link to="/reservations" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition-colors inline-block">
                Book Your Experience
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="py-20 bg-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-4xl font-serif mb-12 text-center text-gray-800">Connect With Us</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatedSection>
                <div>
                  <h3 className="text-2xl mb-4 font-serif text-gray-800">Find Us</h3>
                  <p className="mb-4 text-gray-700">123 Gourmet Street, Culinary City, 12345</p>
                  <div className="flex items-center mb-2 text-gray-700">
                    <Phone className="mr-2" size={18} />
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-center mb-4 text-gray-700">
                    <Clock className="mr-2" size={18} />
                    <span>Mon-Sat: 5pm-11pm, Sun: Closed</span>
                  </div>
                  <div className="flex space-x-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors"><Instagram size={24} /></a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors"><Facebook size={24} /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors"><Twitter size={24} /></a>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="h-64 bg-white rounded-lg overflow-hidden shadow-lg">
                  {/* Placeholder for future map component */}
                  <div className="w-full h-full flex items-center justify-center text-gray-700">
                    <span className="text-lg">Interactive Map Coming Soon</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-800 font-semibold">Hyatt Regency Harare - The Meikles</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;