import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > 50 && lastScrollY <= window.scrollY) {
        setScrolling(true); // Hide navbar when scrolling down
      } else if (window.scrollY < 5) {
        setScrolling(false); // Show navbar when scrolling up
      }

      lastScrollY = window.scrollY; // Update the last scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 w-full z-50 bg-white shadow-md transition-transform duration-300 ${scrolling ? '-top-[100px]' : 'top-0'}`}>
      {/* First Section */}
      <div className="flex items-center justify-between px-8 py-2">
        {/* Left Side - Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-32" />
        </div>

        {/* Center - Three Divs */}
        <div className="flex space-x-8 text-center">
          <div>
            <h3 className="text-red-600 font-semibold">Visit Us</h3>
            <p className="text-black">Air University Islamabad</p>
          </div>
          <div>
            <h3 className="text-red-600 font-semibold">Call Us Now</h3>
            <p className="text-black">09876543456</p>
          </div>
          <div>
            <h3 className="text-red-600 font-semibold">Mon-Sat</h3>
            <p className="text-black">9:00 - 18:00</p>
          </div>
        </div>

        {/* Right Side - Get Free Quote Button */}
        <div>
          <button className="border-2 border-red-600 text-red-600 bg-white py-2 px-6 rounded-full">
            Get Free Quote
          </button>
        </div>
      </div>

      {/* Second Section - Navbar Links and Social Icons */}
      <div className="flex items-center justify-between px-8 py-2 bg-[#343434]">
        {/* Left Side - Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:text-red-600">Home</Link>
          <Link to="/" className="text-white hover:text-red-600">About Us</Link>
          <Link to="/" className="text-white hover:text-red-600">Services</Link>
          <Link to="/" className="text-white hover:text-red-600">Page</Link>
          <Link to="/" className="text-white hover:text-red-600">Blog</Link>
          <Link to="/" className="text-white hover:text-red-600">Contact</Link>
          <Link to="/search" className="text-white hover:text-red-600">Search</Link>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="border-2 border-red-600 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white">
            <FaFacebook />
          </a>
          <a href="#" className="border-2 border-red-600 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white">
            <FaTwitter />
          </a>
          <a href="#" className="border-2 border-red-600 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white">
            <FaGoogle />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
