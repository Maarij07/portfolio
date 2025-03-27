import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const ProjectsSection = () => {
  // Refs and animation setup
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  // State for projects and filtering
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState({});
  
  // Number of projects to show initially
  const initialProjectCount = 6;

  // Fetch projects from JSON file
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In production, you would fetch this from an API or JSON file
        // For now, we'll import it directly
        const response = await import('../data/projects.json');
        const data = response.default;
        
        // Initialize currentIndex for each project
        const initialIndices = {};
        data.forEach((project) => {
          initialIndices[project.id] = 0;
        });
        
        setCurrentIndex(initialIndices);
        setProjects(data);
        setFilteredProjects(data.slice(0, initialProjectCount));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    
    fetchProjects();
  }, []);

  // Apply filters when activeFilter changes
  useEffect(() => {
    let filtered = projects;
    
    if (activeFilter !== "all") {
      filtered = projects.filter(project => 
        project.category.includes(activeFilter)
      );
    }
    
    setFilteredProjects(isExpanded ? filtered : filtered.slice(0, initialProjectCount));
  }, [activeFilter, projects, isExpanded]);

  // Three.js floating particles effect
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

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x404040,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0001;
      particlesMesh.rotation.y += 0.0002;
      
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

  // Handle image cycling for projects with multiple images
  const cycleImage = (projectId, direction) => {
    const project = projects.find(p => p.id === projectId);
    if (!project?.images || project.images.length <= 1) return;
    
    setCurrentIndex(prev => {
      const current = prev[projectId] || 0;
      const imageCount = project.images.length;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (current + 1) % imageCount;
      } else {
        newIndex = (current - 1 + imageCount) % imageCount;
      }
      
      return { ...prev, [projectId]: newIndex };
    });
  };

  // Filter buttons for categories
  const filterButtons = [
    { name: "All", value: "all" },
    { name: "Web", value: "web" },
    { name: "Mobile", value: "mobile" },
    { name: "UI/UX", value: "ui" }
  ];

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="min-h-screen bg-black text-white relative overflow-hidden py-24"
    >
      {/* Three.js particle background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-70 z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'<projects>'}</div>
      <div className="absolute bottom-10 right-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'</projects>'}</div>
      
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
                Featured Projects
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
              A showcase of my technical capabilities across various platforms
            </p>
          </motion.div>
          
          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center flex-wrap gap-3 mb-10"
          >
            {filterButtons.map((button, index) => (
              <motion.button
                key={button.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                onClick={() => setActiveFilter(button.value)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${activeFilter === button.value ? 'border-gray-400 bg-gray-800 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
              >
                {button.name}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Projects Grid */}
          <div className="w-full max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeFilter + (isExpanded ? '-expanded' : '-collapsed')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="relative group"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gray-900 bg-opacity-50 border border-gray-800 h-full">
                      {/* Image area with navigation arrows if multiple images */}
                      <div className="relative h-56 overflow-hidden">
                        {project.images && project.images.length > 0 ? (
                          <>
                            <div className="relative w-full h-full">
                              <img
                                src={project.images[currentIndex[project.id] || 0]} 
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300" />
                            </div>
                            
                            {/* Image navigation buttons if multiple images */}
                            {project.images.length > 1 && (
                              <>
                                <button 
                                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    cycleImage(project.id, 'prev');
                                  }}
                                >
                                  ◀
                                </button>
                                <button 
                                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    cycleImage(project.id, 'next');
                                  }}
                                >
                                  ▶
                                </button>
                                
                                {/* Image indicator dots */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                  {project.images.map((_, index) => (
                                    <div 
                                      key={index} 
                                      className={`w-1.5 h-1.5 rounded-full transition-all ${index === (currentIndex[project.id] || 0) ? 'bg-white' : 'bg-white bg-opacity-50'}`} 
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <span className="text-3xl text-gray-600">✦</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content area */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-200 mb-2">{project.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                        
                        {/* Technologies used */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span 
                              key={tech} 
                              className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                        
                        {/* Links */}
                        {project.links && Object.keys(project.links).length > 0 && (
                          <div className="flex gap-3 mt-4">
                            {project.links.live && (
                              <a 
                                href={project.links.live} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                              >
                                View Live
                              </a>
                            )}
                            {project.links.github && (
                              <a 
                                href={project.links.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                              >
                                GitHub
                              </a>
                            )}
                            {project.links.appStore && (
                              <a 
                                href={project.links.appStore} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                              >
                                App Store
                              </a>
                            )}
                            {project.links.playStore && (
                              <a 
                                href={project.links.playStore} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-gray-300 hover:text-white transition-colors"
                              >
                                Play Store
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Highlight border effect on hover */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* See More/Less Button */}
            {(activeFilter === "all" ? projects.length : projects.filter(p => p.category.includes(activeFilter)).length) > initialProjectCount && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 text-center"
              >
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-6 py-2 rounded-md bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 hover:text-white relative group overflow-hidden"
                >
                  <span className="relative z-10">
                    {isExpanded ? "Show Less" : "See All Projects"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -inset-1 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500 group-hover:duration-200 bg-gradient-to-r from-gray-600 to-gray-400" />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
