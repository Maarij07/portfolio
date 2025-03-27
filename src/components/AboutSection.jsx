'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('about');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  // Three.js background effect with enhanced particles
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
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

    // Create particles with color variation
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 60;
      posArray[i+1] = (Math.random() - 0.5) * 60;
      posArray[i+2] = (Math.random() - 0.5) * 60;
      
      // Color - subtle blue/gray gradient
      colorArray[i] = 0.3 + Math.random() * 0.2;     // R
      colorArray[i+1] = 0.3 + Math.random() * 0.2;   // G
      colorArray[i+2] = 0.4 + Math.random() * 0.3;   // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Material with vertex colors
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Animation with mouse interaction
    const animate = () => {
      requestAnimationFrame(animate);
      
      targetX = mouseX * 0.2;
      targetY = mouseY * 0.2;
      
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.02;
      particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.02;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Clean up Three.js resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.remove(particlesMesh);
      renderer.dispose();
    };
  }, []);

  // Content for different tabs
  const tabContent = {
    about: {
      title: "Full-Stack Developer & Designer",
      paragraphs: [
        "I craft engaging digital experiences that merge function with elegant design. My passion lies in creating solutions that are not only technically sound but also visually captivating.",
        "With expertise in React, Next.js, Flutter, and React Native, I build applications that respond to modern development needs while maintaining a focus on performance and user experience."
      ]
    },
    journey: {
      title: "My Professional Journey",
      paragraphs: [
        "Starting as a front-end developer, I quickly expanded my skills to encompass the full development stack. My journey has been driven by curiosity and a desire to master the tools that create exceptional digital experiences.",
        "Each project has been an opportunity to refine my approach, combining technical excellence with creative problem-solving to deliver solutions that exceed expectations."
      ]
    },
    philosophy: {
      title: "Development Philosophy",
      paragraphs: [
        "I believe that great software is born at the intersection of technical excellence and thoughtful design. My approach centers on creating intuitive, accessible experiences that solve real problems.",
        "Every line of code I write is guided by a commitment to maintainability, performance, and user-centered design principles that prioritize the people who will ultimately use what I build."
      ]
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="min-h-screen bg-black text-white relative overflow-hidden flex items-center py-20"
    >
      {/* Three.js particle background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black to-black opacity-70 z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'<about>'}</div>
      <div className="absolute bottom-10 right-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'</about>'}</div>
      
      {/* Animated light beams */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent opacity-30"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent opacity-30"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-30"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 z-20 relative">
        <motion.div 
          style={{ opacity, y }}
          className="flex flex-col items-center"
        >
          {/* Section Title with enhanced gradient */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-gray-200 to-purple-300">
                About Me
              </span>
              {/* Animated underline effect */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-0.5 bg-gradient-to-r from-blue-500 via-gray-400 to-purple-500 absolute bottom-0 left-0"
              />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mt-4">
              Crafting digital experiences with code and creativity
            </p>
          </motion.div>
          
          {/* Main content card with enhanced glow effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl w-full relative bg-gray-900 bg-opacity-40 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-gray-800"
          >
            {/* Enhanced glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-900/30 via-gray-800/30 to-purple-900/30 rounded-xl blur opacity-50 -z-10 group-hover:opacity-75 transition duration-300" />
            
            {/* Tab navigation */}
            <div className="flex justify-center mb-8 border-b border-gray-800">
              {Object.keys(tabContent).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium relative ${
                    activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                      initial={false}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Left Column - Profile image and social links */}
              <div className="md:col-span-2 flex flex-col items-center md:items-start">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative w-48 h-48 mb-6"
                >
                  {/* Profile image with gradient border */}
                  <div className="w-full h-full rounded-full p-1 bg-gradient-to-r from-blue-500 via-gray-500 to-purple-500">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                      {/* Replace with your actual image */}
                      <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">MB</div>
                    </div>
                  </div>
                  
                  {/* Decorative elements around profile */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/50"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/50"></div>
                </motion.div>
                
                {/* Social links */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex space-x-4 mb-6"
                >
                  {[
                    { name: 'GitHub', icon: 'github', url: 'https://github.com/Maarij07' },
                    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/maarij-bukhari' },
                    { name: 'Twitter', icon: 'twitter', url: '#' }
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 transition-colors"
                      aria-label={social.name}
                    >
                      <SocialIcon type={social.icon} />
                    </motion.a>
                  ))}
                </motion.div>
                
                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="grid grid-cols-2 gap-4 w-full"
                >
                  {[
                    { label: 'Experience', value: '5+ Years' },
                    { label: 'Projects', value: '50+' },
                    { label: 'Clients', value: '20+' },
                    { label: 'Countries', value: '5+' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center"
                    >
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Right Column - Content with tab system */}
              <div className="md:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.h3 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"
                    >
                      {tabContent[activeTab].title}
                    </motion.h3>
                    
                    {tabContent[activeTab].paragraphs.map((paragraph, index) => (
                      <motion.p 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                        className="text-gray-300 mb-4 leading-relaxed"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                    
                    {/* Core Strengths */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <h4 className="text-xl font-semibold mb-4 text-gray-200 mt-6">Core Strengths</h4>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { skill: 'Web Development', level: 95 },
                          { skill: 'Mobile Apps', level: 90 },
                          { skill: 'UI/UX Design', level: 85 },
                          { skill: 'Modern Frameworks', level: 92 }
                        ].map((skill, index) => (
                          <motion.div
                            key={skill.skill}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                            className="flex flex-col"
                          >
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300 text-sm">{skill.skill}</span>
                              <span className="text-gray-400 text-xs">{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.8 + (index * 0.1), ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Technologies */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="mt-8 flex flex-wrap gap-2"
                    >
                      {[
                        'React', 'Next.js', 'TypeScript', 'Flutter', 'React Native', 
                        'Tailwind CSS', 'Node.js', 'GraphQL', 'Firebase'
                      ].map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.1 + (index * 0.05) }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1.5 bg-gray-800 bg-opacity-70 rounded-full text-sm text-gray-300 border border-gray-700 hover:border-gray-500 hover:text-white transition-all duration-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Call to action */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium relative overflow-hidden group"
                  >
                    <span className="relative z-10">Explore My Work</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                  
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium transition-colors duration-300"
                  >
                    Get In Touch
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Social icons component
const SocialIcon = ({ type }) => {
  switch (type) {
    case 'github':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      );
    default:
      return null;
  }
};

export default AboutSection;