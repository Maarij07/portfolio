'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  // Three.js background effect
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

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Material with custom shader for glowing effect
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x505050,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0003;
      
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
      
      // Clean up Three.js resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.remove(particlesMesh);
      renderer.dispose();
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="h-screen bg-black text-white relative overflow-hidden flex items-center"
    >
      {/* Three.js particle background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black to-black opacity-70 z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'<about>'}</div>
      <div className="absolute bottom-10 right-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'</about>'}</div>
      
      <div className="container mx-auto px-4 z-20 relative">
        <motion.div 
          style={{ opacity, y }}
          className="flex flex-col items-center"
        >
          {/* Section Title with gradient */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
              About Me
            </span>
          </motion.h2>
          
          {/* Main content card with glow effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl w-full relative bg-gray-900 bg-opacity-40 backdrop-blur-sm p-6 md:p-8 rounded-lg"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg blur opacity-30 -z-10 group-hover:opacity-40" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Main description */}
              <div>
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-2xl font-bold mb-4 text-gray-100"
                >
                  Full-Stack Developer & Designer
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-gray-300 mb-4"
                >
                  I craft engaging digital experiences that merge function with elegant design. My passion lies in creating solutions that are not only technically sound but also visually captivating.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-gray-300"
                >
                  With expertise in React, Next.js, Flutter, and React Native, I build applications that respond to modern development needs while maintaining a focus on performance and user experience.
                </motion.p>
                
                {/* Animated background skill bar */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                  className="h-0.5 bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 mt-6"
                />
              </div>
              
              {/* Right Column - Key strengths with animated appearance */}
              <div>
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-xl font-semibold mb-4 text-gray-200"
                >
                  Core Strengths
                </motion.h4>
                
                <div className="space-y-3">
                  {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Modern Frameworks'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                      className="flex items-center"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mr-3" />
                      <span className="text-gray-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {['React', 'Next.js', 'TypeScript', 'Flutter', 'React Native', 'Tailwind'].map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1 bg-gray-800 bg-opacity-70 rounded-full text-sm text-gray-300 border border-gray-700"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
            
            {/* Call to action */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 text-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-2 rounded-md bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 hover:text-white relative group overflow-hidden"
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-1 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500 group-hover:duration-200 bg-gradient-to-r from-gray-600 to-gray-400" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
