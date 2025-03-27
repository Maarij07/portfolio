"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';  // React Router for navigation

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  const { scrollY: scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <motion.header 
      className="fixed w-full z-50 transition-all"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${scrollY > 10 ? Math.min(scrollY / 100, 0.8) : 0})`,
        backdropFilter: `blur(${scrollY > 10 ? Math.min(scrollY / 10, 8) : 0}px)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Name with Aura Effect */}
          <div className="relative group">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <Link to="/">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-500">
                  Maarij Bukhari
                </span>
              </Link>
            </motion.div>

            {/* Subtle Aura Effect */}
            <div className="absolute -inset-1 rounded-lg blur-xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`#${item.toLowerCase()}`}>
                    <motion.span 
                      className="text-gray-300 hover:text-white hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      {item}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="relative p-2 rounded-md group"
              aria-label="Toggle Navigation"
            >
              <div className="w-6 h-0.5 mb-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
              <div className="w-6 h-0.5 mb-1.5 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"></div>
              <div className="w-6 h-0.5 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></div>
              <div className="absolute -inset-1 rounded-full blur-sm bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-30 transition duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Initially Hidden */}
      <div className="hidden md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md">
        <div className="px-4 py-3">
          <ul className="space-y-3">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={`#${item.toLowerCase()}`}>
                  <span className="block py-2 text-gray-300 hover:text-white hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400">
                    {item}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
