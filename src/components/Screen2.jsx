import React from 'react';
import img1 from '../assets/monitor.png';
import img2 from '../assets/smartphone.png';
import img3 from '../assets/laptop.png';
import img4 from '../assets/ipad.png';

const Screen2 = () => {
  // Services object
  const services = [
    {
      id: 1,
      img: img1,
      title: 'Repair Computer',
      description: 'We provide quick and effective repair services for desktops and computers, ensuring minimal downtime and maximum performance.',
    },
    {
      id: 2,
      img: img2,
      title: 'Repair Mobile',
      description: 'Our mobile repair service covers all brands and models, fixing issues ranging from screen damage to battery replacements.',
    },
    {
      id: 3,
      img: img3,
      title: 'Repair Laptop',
      description: 'We offer comprehensive laptop repair services including hardware replacements, software troubleshooting, and screen repairs.',
    },
    {
      id: 4,
      img: img4,
      title: 'Repair Tablet',
      description: 'Get your tablet back in action with our repair services. We fix screen issues, charging ports, and more.',
    },
  ];

  return (
    <div className="min-h-screen text-center md:py-10 flex flex-col gap-5">
      <h1 className="font-semibold text-3xl mb-5">Our Repair Services</h1>
      <p className="font-light mx-16 mb-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe atque dolores obcaecati, laboriosam praesentium, sapiente illo autem nemo eveniet perspiciatis asperiores non vero. Similique ea, ad autem reiciendis officia alias porro nostrum excepturi animi!
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-14">
        {services.map(service => (
          <div key={service.id} className="bg-white shadow-lg rounded-lg p-6 text-center">
            <img src={service.img} alt={service.title} className="w-24 h-24 mx-auto mb-4" />
            <h2 className="font-semibold text-xl mb-4">{service.title}</h2>
            <p className="font-light text-justify text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen2;
