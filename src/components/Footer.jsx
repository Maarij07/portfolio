import React from 'react';
import logo from '../assets/logo.png';
import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-[#343434] text-white py-10">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* First Column - Logo, Lorem Text, Social Icons */}
        <div>
          <img src={logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, explicabo!
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-red-600 hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="text-red-600 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-red-600 hover:text-white">
              <FaGoogle />
            </a>
          </div>
        </div>

        {/* Second Column - Shop Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Shop Info</h3>
          <ul>
            <li className="mb-2">
              <strong>Address:</strong> 1234 Street Name, City, Country
            </li>
            <li className="mb-2">
              <strong>Phone:</strong> (098) 765-4321
            </li>
            <li className="mb-2">
              <strong>Email:</strong> info@example.com
            </li>
            <li className="mb-2">
              <strong>Hours:</strong> Mon-Sat, 9:00 AM - 6:00 PM
            </li>
          </ul>
        </div>

        {/* Third Column - Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul>
            <li className="flex items-center mb-2">
              <span className="text-red-600 mr-2">→</span> Laptop Repair
            </li>
            <li className="flex items-center mb-2">
              <span className="text-red-600 mr-2">→</span> Mobile Repair
            </li>
            <li className="flex items-center mb-2">
              <span className="text-red-600 mr-2">→</span> Computer Repair
            </li>
            <li className="flex items-center mb-2">
              <span className="text-red-600 mr-2">→</span> iPad Repair
            </li>
            <li className="flex items-center mb-2">
              <span className="text-red-600 mr-2">→</span> Smartphone Repair
            </li>
            <li className="flex items-center mb-2">
              <span className="text-red-600 mr-2">→</span> Gadget Repair
            </li>
            <li className="flex items-center mb-2">
              <span className="text-red-600 mr-2">→</span> Backup Data
            </li>
          </ul>
        </div>

        {/* Fourth Column - Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">Sign up for the latest updates</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-lg w-full"
            />
            <button className="bg-red-600 text-white p-2 rounded-r-lg">
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
