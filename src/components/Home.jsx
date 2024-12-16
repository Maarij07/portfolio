import React from 'react';
import img from '../assets/home-1.png';

const Home = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover mt-[20vh] bg-center flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className=" px-4 md:px-8">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
          Fast Repair Service
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-lg md:text-xl mb-6 max-w-xl sm:max-w-3xl mx-auto">
          Just send your valuable Laptop, PC, Mobile, Gaming device, or Smartphone,
          and we'll take care of it. We'll be happy to serve our best to you, just keep faith in us.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Get Started Button */}
          <button className="bg-white text-[#ED1C24] py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 w-full sm:w-auto">
            Get Started Now
          </button>

          {/* Learn More Button */}
          <button className="bg-[#ED1C24] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#d01620] w-full sm:w-auto">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
