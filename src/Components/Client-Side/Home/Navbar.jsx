import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('home');

  // Update active link when route changes
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    
    if (path === '/' || path === '/home') {
      setActiveLink('home');
    } else if (path.includes('services') || path.includes('Services')) {
      setActiveLink('services');
    } else if (path.includes('about') || path.includes('About')) {
      setActiveLink('about');
    } else if (path.includes('contact') || path.includes('Contact')) {
      setActiveLink('contact');
    } else {
      setActiveLink('home');
    }
  }, [location.pathname]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#0a2472] h-20 px-8">
      <div className="w-full h-full mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex">
          <img 
            src="/Images/Rectangle 1.webp" 
            alt="Logo" 
            className="h-28 md:h-42 w-auto rounded-lg"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-12">
          <Link 
            to="/" 
            onClick={() => handleLinkClick('home')}
            className={`text-lg font-medium transition-colors ${
              activeLink === 'home' 
                ? 'text-[#ff7b54]' 
                : 'text-white hover:text-gray-200'
            }`}
          >
            Home
          </Link>
          
          <Link 
            to="/Services" 
            onClick={() => handleLinkClick('services')}
            className={`text-lg font-medium transition-colors ${
              activeLink === 'services' 
                ? 'text-[#ff7b54]' 
                : 'text-white hover:text-gray-200'
            }`}
          >
            Services
          </Link>
          
          <Link 
            to="/About"
            onClick={() => handleLinkClick('about')}
            className={`text-lg font-medium transition-colors ${
              activeLink === 'about' 
                ? 'text-[#ff7b54]' 
                : 'text-white hover:text-gray-200'
            }`}
          >
            About
          </Link>
          
          <Link 
            to="/Contact"
            onClick={() => handleLinkClick('contact')}
            className={`text-lg font-medium transition-colors ${
              activeLink === 'contact' 
                ? 'text-[#ff7b54]' 
                : 'text-white hover:text-gray-200'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Apply Now Button */}
        <Link to="/Contact">
          <button className="hidden lg:block bg-[#ff7b54] hover:bg-[#ff6b44] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Apply Now
          </button>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white focus:outline-none z-50 relative"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed top-20 right-0 h-[calc(100vh-5rem)] w-full bg-[#0a2472] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          <Link 
            to="/" 
            onClick={() => handleLinkClick('home')}
            className={`text-lg font-medium transition-all duration-300 ease-in-out border-b border-[#1a3f8f] pb-3 px-4 rounded-lg ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            } ${
              activeLink === 'home' 
                ? 'bg-[#ff7b54] text-white' 
                : 'text-white hover:bg-[#1a3f8f]'
            }`}
            style={{ transitionDelay: isOpen ? '100ms' : '0ms' }}
          >
            Home
          </Link>
          
          <Link 
            to="/Services" 
            onClick={() => handleLinkClick('services')}
            className={`text-lg font-medium transition-all duration-300 ease-in-out border-b border-[#1a3f8f] pb-3 px-4 rounded-lg ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            } ${
              activeLink === 'services' 
                ? 'bg-[#ff7b54] text-white' 
                : 'text-white hover:bg-[#1a3f8f]'
            }`}
            style={{ transitionDelay: isOpen ? '200ms' : '0ms' }}
          >
            Services
          </Link>
          
          <Link 
            to="/About" 
            onClick={() => handleLinkClick('about')}
            className={`text-lg font-medium transition-all duration-300 ease-in-out border-b border-[#1a3f8f] pb-3 px-4 rounded-lg ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            } ${
              activeLink === 'about' 
                ? 'bg-[#ff7b54] text-white' 
                : 'text-white hover:bg-[#1a3f8f]'
            }`}
            style={{ transitionDelay: isOpen ? '300ms' : '0ms' }}
          >
            About
          </Link>
          
          <Link 
            to="/Contact" 
            onClick={() => handleLinkClick('contact')}
            className={`text-lg font-medium transition-all duration-300 ease-in-out border-b border-[#1a3f8f] pb-3 px-4 rounded-lg ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            } ${
              activeLink === 'contact' 
                ? 'bg-[#ff7b54] text-white' 
                : 'text-white hover:bg-[#1a3f8f]'
            }`}
            style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}
          >
            Contact
          </Link>
          
          <Link to="/Contact">
            <button 
              onClick={() => setIsOpen(false)}
              className={`bg-[#ff7b54] hover:bg-[#ff6b44] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 ease-in-out w-full mt-4 ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? '500ms' : '0ms' }}
            >
              Apply Now
            </button>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 top-20"
        />
      )}
    </nav>
  );
};

export default Navbar;