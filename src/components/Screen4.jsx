import React from 'react';
import img from '../assets/main-img2.png';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Screen4 = () => {
  // Intersection Observer hook to trigger CountUp when component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation once when the component enters the view
    threshold: 0.5, // Trigger the animation when 50% of the component is in view
  });

  return (
    <div
      ref={ref}
      className="min-h-[50vh] w-full bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">Our Statistics</h2>
        <p className="text-lg font-light mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        {/* 4 Stats in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-semibold">
              {inView ? <CountUp start={0} end={275} duration={3} /> : 0}
            </div>
            <p className="text-lg font-light mt-2">Current Fixing</p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-semibold">
              {inView ? <CountUp start={0} end={6325} duration={3} /> : 0}
            </div>
            <p className="text-lg font-light mt-2">Happy Clients</p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-semibold">
              {inView ? <CountUp start={0} end={22} duration={3} /> : 0}
            </div>
            <p className="text-lg font-light mt-2">Years of Experience</p>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center">
            <div className="text-3xl font-semibold">
              {inView ? <CountUp start={0} end={5750} duration={3} /> : 0}
            </div>
            <p className="text-lg font-light mt-2">Devices Fixed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen4;
