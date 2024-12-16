import React from 'react';
import img from '../assets/side-img1.png'; // Import your image here

const Screen3 = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row md:px-8 gap-6 items-center">
            {/* Left Section */}
            <div className="w-full md:w-1/2 hidden md:block">
                <img src={img} alt="Repair Services" className="object-cover w-full h-full" />
            </div>
            <div className="w-full md:w-1/2 text-left px-6 py-8">
                <h1 className="text-3xl font-bold mb-6">
                    <span className="text-[#ED1C24]">22</span> years of Experience in Digital Device Repair Services
                </h1>

                <p className="font-light text-lg mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis orci non nulla volutpat, a sodales ante laoreet. Etiam maximus leo libero, sit amet tempor purus hendrerit non. Vestibulum vel lorem malesuada, posuere augue sed, facilisis odio.
                </p>
                <p className="font-light text-lg mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Quisque ut tristique ante. Mauris lacinia eget lectus sit amet varius. Phasellus bibendum scelerisque ante, nec pharetra libero congue at. In hac habitasse platea dictumst.
                </p>

                {/* Buttons Row */}
                <div className="flex space-x-4">
                    {/* Call Button */}
                    <button className="bg-[#ED1C24] text-white py-3 px-6 rounded-full flex items-center space-x-2">
                        <i className="fas fa-phone-alt"></i>
                        <span>123-456-789</span>
                    </button>

                    {/* 24/7 Button */}
                    <button className="bg-white text-[#ED1C24] border-2 border-[#ED1C24] py-3 px-6 rounded-full flex items-center space-x-2">
                        <span className="text-[#ED1C24]">24/7</span>
                        <span>Mon-Fri</span>
                    </button>
                </div>
            </div>

            {/* Image Section (Visible only on medium and larger screens) */}
            
        </div>
    );
};

export default Screen3;
