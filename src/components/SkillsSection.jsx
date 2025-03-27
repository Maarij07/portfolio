'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';

const SkillCard = ({ name, icon, color, delay, description }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 10 }}
        className="w-full h-40 relative rounded-xl backdrop-blur-sm bg-black bg-opacity-30 border border-gray-800 p-4 flex flex-col items-center justify-center group"
      >
        {/* Background gradients */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 rounded-xl z-0 group-hover:opacity-10 transition-opacity duration-300`} />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl blur opacity-10 group-hover:opacity-30 transition-all duration-300 -z-10" />
        
        {/* Foreground content */}
        <div className="z-10 text-center">
          <div className="text-3xl mb-3">{icon}</div>
          <h3 className="text-xl font-semibold text-gray-100 mb-1">{name}</h3>
          <p className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const springScale = useSpring(scale, { damping: 15, stiffness: 100 });

  // Skills data with appropriate icons and colors
  const skills = [
    { 
      name: "React",
      icon: "⚛️",
      color: "from-blue-600 to-cyan-400",
      description: "Building responsive UI components and managing state efficiently" 
    },
    { 
      name: "React Native",
      icon: "📱",
      color: "from-blue-500 to-purple-500",
      description: "Cross-platform mobile app development with native performance" 
    },
    { 
      name: "Flutter", 
      icon: "🦋",
      color: "from-cyan-500 to-blue-500",
      description: "Beautiful native apps in record time from a single codebase" 
    },
    { 
      name: "Next.js",
      icon: "▲",
      color: "from-gray-600 to-gray-400",
      description: "Server-side rendering and static site generation for React" 
    },
    { 
      name: "Firebase",
      icon: "🔥",
      color: "from-yellow-600 to-orange-500",
      description: "Backend services including auth, databases, and hosting" 
    },
    { 
      name: "Pinecone",
      icon: "🌲",
      color: "from-green-600 to-green-400",
      description: "Vector database for similarity search and AI applications" 
    },
    { 
      name: "Tailwind CSS",
      icon: "🎨",
      color: "from-cyan-600 to-blue-500",
      description: "Utility-first CSS framework for rapid UI development" 
    },
    { 
      name: "shadcn/ui",
      icon: "🧩",
      color: "from-gray-500 to-gray-700",
      description: "Accessible and customizable component library for React" 
    }
  ];

  // Three.js background effect with connecting lines
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

    // Create a starfield effect
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 200;
    const posArray = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 50;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x888888,
      transparent: true,
      opacity: 0.8
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create connecting lines between stars
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x303030,
      transparent: true,
      opacity: 0.2
    });
    
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    // Connect some random stars together
    for (let i = 0; i < 50; i++) {
      const startIndex = Math.floor(Math.random() * starCount) * 3;
      const endIndex = Math.floor(Math.random() * starCount) * 3;
      
      linePositions.push(
        posArray[startIndex], posArray[startIndex + 1], posArray[startIndex + 2],
        posArray[endIndex], posArray[endIndex + 1], posArray[endIndex + 2]
      );
    }
    
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      stars.rotation.x += 0.0001;
      stars.rotation.y += 0.0002;
      
      lines.rotation.x += 0.0001;
      lines.rotation.y += 0.0002;
      
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
      starGeometry.dispose();
      starMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      scene.remove(stars);
      scene.remove(lines);
      renderer.dispose();
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="min-h-[80vh] bg-black text-white relative overflow-hidden py-16"
    >
      {/* Three.js networked nodes background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-70 z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'<skills>'}</div>
      <div className="absolute bottom-10 right-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'</skills>'}</div>
      
      <div className="container mx-auto px-4 z-20 relative">
        <motion.div 
          style={{ opacity, scale: springScale }}
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
                Skills & Technologies
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
              My technical toolkit for creating seamless digital experiences
            </p>
          </motion.div>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                color={skill.color}
                delay={0.1 + index * 0.1}
                description={skill.description}
              />
            ))}
          </div>
          
          {/* Connecting line visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 text-sm italic">
              Technologies I combine to build modern, performant applications
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
