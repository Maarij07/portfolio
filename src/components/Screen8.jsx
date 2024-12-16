import React from 'react';
import img1 from '../assets/blog-1.png';
import img2 from '../assets/blog-2.png';
import img3 from '../assets/blog-3.png';

const blogs = [
  {
    img: img1,
    date: '20 Jan, 2024',
    title: 'Repair Your Samsung Line Issues with DIY',
    author: 'Don Maarij',
  },
  {
    img: img2,
    date: '20 Jan, 2024',
    title: 'Fix Your Broken Screen: A Step-by-Step Guide',
    author: 'Abdullah Burger',
  },
  {
    img: img3,
    date: '20 Jan, 2024',
    title: 'How to Repair Your Smartphone Battery Issues',
    author: 'Taha Bukhari',
  },
];

const Screen8 = () => {
  return (
    <div className='min-h-screen text-center flex flex-col gap-6 py-10'>
      <h1 className='text-4xl font-bold'>Free Repair Guide</h1>
      <p className='font-light px-10'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ab eum magnam similique, iste consequatur? Illo voluptate, iure nulla veritatis dignissimos tempora minima obcaecati deleniti quidem molestiae sit? Laudantium, doloribus beatae. Iste, itaque rerum?
      </p>

      {/* Blog Cards Row */}
      <div className='flex justify-center gap-6 mt-6 flex-wrap'>
        {blogs.map((blog, index) => (
          <div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4'>
            <div className='bg-gray-100 rounded-lg p-4'>
              <img src={blog.img} alt={blog.title} className='w-full h-40 object-cover rounded-lg mb-4' />
              <p className='text-gray-500 text-sm'>{blog.date}</p>
              <h2 className='font-semibold text-xl my-2'>{blog.title}</h2>
              <p className='text-gray-700'>{blog.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen8;
