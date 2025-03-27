'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const TestimonialsSection = () => {
  // Sample testimonials data - replace with your actual testimonials
  const testimonials = [
    {
      id: 'testimonial1',
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechVision Inc.',
      avatar: null, // Add path to avatar image if available
      content: 'Working with a developer who excels in both web and mobile development is rare. The ability to quickly grasp complex requirements and turn them into beautiful, functional solutions saved us countless hours and resources.',
      rating: 5,
      featured: true
    },
    {
      id: 'testimonial2',
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLabs',
      avatar: null,
      content: 'Our app needed a complete redesign with a tight deadline. Not only was the work delivered ahead of schedule, but the attention to detail and focus on user experience transformed our product completely.',
      rating: 5,
      featured: true
    },
    {
      id: 'testimonial3',
      name: 'Alex Rivera',
      role: 'Startup Founder',
      company: 'NextWave Solutions',
      avatar: null,
      content: 'As a startup founder, finding a developer who can adapt quickly and wear multiple hats is crucial. The technical expertise across platforms helped us launch our MVP in record time, giving us a competitive edge.',
      rating: 5,
      featured: false
    },
    {
      id: 'testimonial4',
      name: 'Emma Thompson',
      role: 'UI/UX Director',
      company: 'CreativeEdge',
      avatar: null,
      content: 'I\'ve worked with many developers, but rarely find someone who truly understands design principles. The collaborative approach and technical implementation of our designs exceeded our expectations.',
      rating: 5,
      featured: false
    },
    {
      id: 'testimonial5',
      name: 'David Wilson',
      role: 'E-commerce Manager',
      company: 'RetailFusion',
      avatar: null,
      content: 'Our e-commerce platform needed serious performance improvements. The optimization work resulted in 40% faster load times and a significant increase in conversion rates. Highly recommended!',
      rating: 5,
      featured: true
    }
  ];

  // State and refs
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
  const [viewMode, setViewMode] = useState('carousel');
  const [isHovering, setIsHovering] = useState(false);
  
  // Animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, -100]);

  // Filter featured testimonials for carousel
  useEffect(() => {
    const featured = testimonials.filter(t => t.featured);
    setFeaturedTestimonials(featured);
  }, [testimonials]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % featuredTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, featuredTestimonials.length]);

  // Pause autoplay when hovering
  const handleMouseEnter = () => {
    setAutoplay(false);
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setAutoplay(true);
    setIsHovering(false);
  };

  // Navigate to previous testimonial
  const goToPrevious = () => {
    setActiveIndex(prev => 
      prev === 0 ? featuredTestimonials.length - 1 : prev - 1
    );
  };

  // Navigate to next testimonial
  const goToNext = () => {
    setActiveIndex(prev => 
      (prev + 1) % featuredTestimonials.length
    );
  };

  // Three.js background effect
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

    // Enhanced particle effect with color variation
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 60;
      posArray[i+1] = (Math.random() - 0.5) * 60;
      posArray[i+2] = (Math.random() - 0.5) * 60;
      
      // Color - subtle blue/purple gradient
      colorArray[i] = 0.3 + Math.random() * 0.2;     // R
      colorArray[i+1] = 0.3 + Math.random() * 0.1;   // G
      colorArray[i+2] = 0.5 + Math.random() * 0.3;   // B
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation function with mouse interaction
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

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.remove(particlesMesh);
      renderer.dispose();
    };
  }, []);

  // Generate star rating component with animation
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <motion.span 
            key={i} 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`text-xl ${i < rating 
              ? 'text-yellow-400' 
              : 'text-gray-700'}`}
          >
            ★
          </motion.span>
        ))}
      </div>
    );
  };

  // Enhanced profile image with gradient border
  const ProfileImage = ({ name, avatar }) => {
    if (avatar) {
      return (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <img 
            src={avatar} 
            alt={name} 
            className="object-cover w-full h-full rounded-full"
          />
        </div>
      );
    }
    
    // Generate initials with gradient background
    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
      
    return (
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white text-xl font-medium">
          {initials}
        </div>
      </div>
    );
  };

  // Carousel navigation indicators
  const CarouselIndicators = () => {
    return (
      <div className="flex justify-center mt-6 space-x-2">
        {featuredTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 w-8' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} 
      className="min-h-screen bg-black text-white relative overflow-hidden py-24"
    >
      {/* Three.js particle background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black opacity-70 z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'<praise>'}</div>
      <div className="absolute bottom-10 right-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'</praise>'}</div>
      
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
            className="mb-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                Client Testimonials
              </span>
              {/* Animated underline effect */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 absolute bottom-0 left-0"
              />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mt-4 text-lg">
              What clients and collaborators have to say about working with me
            </p>
          </motion.div>
          
          {/* View Mode Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center gap-3 mb-12"
          >
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              onClick={() => setViewMode('carousel')}
              className={`px-6 py-2.5 rounded-full border transition-all duration-300 ${
                viewMode === 'carousel' 
                  ? 'border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              Featured
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              onClick={() => setViewMode('grid')}
              className={`px-6 py-2.5 rounded-full border transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              All Testimonials
            </motion.button>
          </motion.div>
          
          {/* Testimonial Content */}
          <div className="w-full max-w-6xl mx-auto">
            {viewMode === 'carousel' ? (
              /* Enhanced Carousel View */
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="overflow-hidden relative rounded-2xl shadow-xl shadow-blue-900/10">
                  {/* Navigation Arrows */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 ml-4 md:ml-6">
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovering ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={goToPrevious}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-white border border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                      aria-label="Previous testimonial"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 mr-4 md:mr-6">
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovering ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={goToNext}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-white border border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                      aria-label="Next testimonial"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {featuredTestimonials.length > 0 && (
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-12 border border-gray-800 rounded-2xl relative overflow-hidden group"
                      >
                        {/* Animated gradient border on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                        
                        {/* Quote mark decoration */}
                        <div className="absolute top-6 left-6 text-7xl text-blue-500/20 opacity-30 font-serif">
                          "
                        </div>
                        <div className="absolute bottom-6 right-6 text-7xl text-purple-500/20 opacity-30 font-serif transform rotate-180">
                          "
                        </div>
                        
                        {/* Content */}
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                          <div className="w-full md:w-1/3 flex justify-center">
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <ProfileImage name={featuredTestimonials[activeIndex].name} avatar={featuredTestimonials[activeIndex].avatar} />
                            </motion.div>
                          </div>
                          <div className="w-full md:w-2/3">
                            <motion.p 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed italic"
                            >
                              "{featuredTestimonials[activeIndex].content}"
                            </motion.p>
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              className="text-gray-400 text-lg"
                            >
                              <strong className="text-white font-semibold">{featuredTestimonials[activeIndex].name}</strong>
                              <span className="block mt-1 text-blue-400/80">{featuredTestimonials[activeIndex].role} @ {featuredTestimonials[activeIndex].company}</span>
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                              className="mt-4"
                            >
                              {renderStars(featuredTestimonials[activeIndex].rating)}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Carousel Indicators */}
                <CarouselIndicators />
              </div>
            ) : (
              /* Enhanced Grid View */
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={testimonial.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 border border-gray-800 rounded-xl relative overflow-hidden group"
                  >
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Quote mark */}
                    <div className="absolute top-4 right-4 text-5xl text-gray-800 opacity-20 font-serif">
                      "
                    </div>
                    
                    <div className="flex flex-col gap-6 relative z-10">
                      <p className="text-lg text-gray-300 mb-4 italic leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center gap-4 mt-auto">
                        <ProfileImage name={testimonial.name} avatar={testimonial.avatar} />
                        <div>
                          <div className="text-white font-semibold">{testimonial.name}</div>
                          <div className="text-blue-400/80 text-sm">{testimonial.role} @ {testimonial.company}</div>
                          <div className="mt-2">{renderStars(testimonial.rating)}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;