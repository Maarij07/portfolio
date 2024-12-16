import React from 'react';
import img1 from '../assets/grid-img1.png';
import img2 from '../assets/grid-img2.png';
import img3 from '../assets/grid-img3.png';
import img4 from '../assets/grid-img4.png';
import img5 from '../assets/grid-img5.png';
import img6 from '../assets/grid-img6.png';

const Screen7 = () => {
  return (
    <div className='min-h-screen text-center flex flex-col gap-6'>
        <h1 className='text-4xl font-bold'>Our Repair Gallery</h1>
        <p className='font-light px-10'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ab eum magnam similique, iste consequatur? Illo voluptate, iure nulla veritatis dignissimos tempora minima obcaecati deleniti quidem molestiae sit? Laudantium, doloribus beatae. Iste, itaque rerum?
        </p>

        {/* Grid of Images */}
        <div className="grid grid-cols-4 gap-4 mt-6">
            {/* First Row */}
            <img src={img1} alt="Gallery 1" className="w-full h-full object-cover" />
            <img src={img2} alt="Gallery 2" className="w-full h-full object-cover" />
            <img src={img3} alt="Gallery 3" className="w-full h-full object-cover col-span-2" />

            {/* Second Row */}
            <img src={img4} alt="Gallery 4" className="w-full h-full object-cover col-span-2" />
            <img src={img5} alt="Gallery 5" className="w-full h-full object-cover" />
            <img src={img6} alt="Gallery 6" className="w-full h-full object-cover" />
        </div>
    </div>
  );
}

export default Screen7;
