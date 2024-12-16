import React from 'react';
import img1 from '../assets/brand-1.png';
import img2 from '../assets/brand-2.png';
import img3 from '../assets/brand-3.png';
import img4 from '../assets/brand-4.png';
import img5 from '../assets/brand-5.png';

const Screen6 = () => {
  return (
    <div className='min-h-screen flex flex-col gap-6 text-center py-10'>
        <h1 className='font-bold text-3xl'>Brands We Work With</h1>
        <p className='font-light px-10'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ab eum magnam similique, iste consequatur? Illo voluptate, iure nulla veritatis dignissimos tempora minima obcaecati deleniti quidem molestiae sit? Laudantium, doloribus beatae. Iste, itaque rerum?
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
            <img src={img1} alt="Brand 1" className="w-24 h-24 object-contain" />
            <img src={img2} alt="Brand 2" className="w-24 h-24 object-contain" />
            <img src={img3} alt="Brand 3" className="w-24 h-24 object-contain" />
            <img src={img4} alt="Brand 4" className="w-24 h-24 object-contain" />
            <img src={img5} alt="Brand 5" className="w-24 h-24 object-contain" />
        </div>
    </div>
  );
};

export default Screen6;
