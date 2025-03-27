'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

// Define the Experience type
const ExperienceSection = () => {
  // Sample experience data - replace with your actual experience
  const experiences = [
    {
      id: 'exp-1',
      role: 'Senior Frontend Developer',
      company: 'TechLabs Inc.',
      duration: '1 year 3 months',
      date: 'Jan 2024 - Present',
      description: 'Lead the development of responsive web applications with modern frameworks. Collaborated with UX designers to create intuitive user interfaces.',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
      achievements: [
        'Reduced load time by 40% through code optimization',
        'Implemented CI/CD pipeline that decreased deployment time by 25%',
        'Created reusable component library used across 5 different projects'
      ],
      type: 'web'
    },
    {
      id: 'exp-2',
      role: 'Mobile App Developer',
      company: 'AppWorks Studio',
      duration: '1 year 2 months',
      date: 'Nov 2022 - Jan 2024',
      description: 'Developed cross-platform mobile applications. Worked closely with backend teams to integrate APIs and optimize performance.',
      skills: ['React Native', 'Flutter', 'Firebase', 'Redux', 'GraphQL'],
      achievements: [
        'Developed 3 apps with 4.5+ star ratings on app stores',
        'Reduced app size by 30% while adding new features',
        'Implemented offline-first architecture for improved user experience'
      ],
      type: 'mobile'
    },
    {
      id: 'exp-3',
      role: 'Web Developer',
      company: 'Digital Solutions',
      duration: '1 year',
      date: 'Nov 2021 - Nov 2022',
      description: 'Created responsive websites and web applications for clients across various industries. Focused on performance optimization and accessibility.',
      skills: ['JavaScript', 'HTML/CSS', 'Vue.js', 'SASS', 'WordPress'],
      achievements: [
        'Delivered 12+ client projects ahead of schedule',
        'Improved website SEO rankings resulting in 35% traffic increase',
        'Implemented accessibility standards across all projects'
      ],
      type: 'web'
    }
  ];

  // State and refs
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, -100]);

  // Filter experiences based on active filter
  const filteredExperiences = experiences.filter(exp => {
    if (activeFilter === 'all') return true;
    return exp.type === activeFilter || exp.type === 'both';
  });

  // Three.js particles effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    // Create floating particles - fewer than in projects section for a different look
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x303030,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0001;
      particlesMesh.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.remove(particlesMesh);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen bg-black text-white relative overflow-hidden py-24"
    >
      {/* Three.js particle background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20" />

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-70 z-10" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'<journey>'}</div>
      <div className="absolute bottom-10 right-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'</journey>'}</div>

      <div className="container mx-auto px-4 z-20 relative">
        <motion.div
          style={{ opacity, y }}
          className="flex flex-col items-center"
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
                Professional Journey
              </span>
              {/* Underline effect */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-0.5 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 absolute bottom-0 left-0"
              />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mt-4">
              Fast-paced growth from web development to cross-platform mastery
            </p>
          </motion.div>

          {/* Experience Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center gap-3 mb-10"
          >
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'border-gray-400 bg-gray-800 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              All Experiences
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              onClick={() => setActiveFilter('web')}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === 'web'
                  ? 'border-gray-400 bg-gray-800 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              Web Development
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              onClick={() => setActiveFilter('mobile')}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                activeFilter === 'mobile'
                  ? 'border-gray-400 bg-gray-800 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              Mobile Development
            </motion.button>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Vertical Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800 transform -translate-x-1/2" />

            {/* Experience Items */}
            {filteredExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-16 md:mb-24 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0 md:mr-auto' : 'md:pl-12 md:text-left md:ml-auto md:mr-0'
                } z-20`}
                style={{
                  width: '100%',
                  maxWidth: '85%',
                }}
              >
                {/* Timeline Node */}
                <div className={`absolute top-1 md:top-2 w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-600 z-30 ${
                  index % 2 === 0 ? 'md:-right-14' : 'md:-left-14'
                } left-0`} />
                {/* Card */}
                <div className="relative bg-gray-900 bg-opacity-60 border border-gray-800 rounded-lg p-6 group hover:bg-opacity-80 transition-all duration-300 overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-lg opacity-0 group-hover:opacity-20 transition-all duration-500 blur-sm z-0"></div>
                  
                  {/* Date Tag */}
                  <div className={`absolute top-6 bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 ${
                    index % 2 === 0 ? 'md:-right-2 md:translate-x-full -top-10 left-0' : 'md:-left-2 md:-translate-x-full -top-10 left-0'
                  } md:top-6 group-hover:bg-gray-700 group-hover:text-white transition-all duration-300`}>
                    {exp.date}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-200 mt-6 md:mt-0 group-hover:text-white transition-colors duration-300">{exp.role}</h3>
                  <p className="text-gray-400 font-semibold mt-1 mb-3 group-hover:text-gray-300 transition-colors duration-300">{exp.company} · {exp.duration}</p>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">{exp.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4 justify-start md:justify-start">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700 group-hover:border-gray-600 group-hover:bg-gray-700 group-hover:text-gray-300 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="mt-4">
                    <h4 className="text-sm font-bold text-gray-300 mb-2 group-hover:text-white transition-colors duration-300">Key Achievements:</h4>
                    <ul className={`text-sm text-gray-400 space-y-1 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 group-hover:text-gray-300 transition-colors duration-300">
                          <span className="text-gray-500 mt-0.5 group-hover:text-blue-400 transition-colors duration-300">✦</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Subtle shine effect that moves across the card on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out z-10"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
