import React from 'react'
import img from '../assets/side-img2.png'
const Screen5 = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row md:px-8 gap-6 items-center">
            {/* Left Section */}
            <div className="w-full md:w-1/2 text-center px-6 py-8">
                <h1 className="text-3xl font-bold mb-6">
                    <span className="text-[#ED1C24]">OUR</span> clients opinion about us
                </h1>

                <p className="font-light text-center text-lg mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis orci non nulla volutpat, a sodales ante laoreet. Etiam maximus leo libero, sit amet tempor purus hendrerit non. Vestibulum vel lorem malesuada, posuere augue sed, facilisis odio.
                </p>
                <p className='font-semibold text-2xl'>Nayyar Abbas</p>
                <p className='font-light'>CEO, One Tech</p>
            </div>

            {/* Image Section (Visible only on medium and larger screens) */}
            <div className="w-full md:w-1/2 hidden md:block">
                <img src={img} alt="Repair Services" className="" />
            </div>
        </div>
    )
}

export default Screen5