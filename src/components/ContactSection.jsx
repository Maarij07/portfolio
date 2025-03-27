'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const ContactSection = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState('idle');

    // Refs and animation setup
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

    // Form handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setFormStatus('success');

            // Reset form after 3 seconds on success
            setTimeout(() => {
                setFormData({ name: '', email: '', message: '' });
                setFormStatus('idle');
            }, 3000);
        } catch (error) {
            setFormStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Three.js aurora effect
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

        // Create aurora particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);
        const scaleArray = new Float32Array(particlesCount);
        const colorArray = new Float32Array(particlesCount * 3);

        // Generate particle positions in a vertical elliptical pattern
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2;
            const radius = 10 + Math.random() * 30;
            const height = (Math.random() - 0.5) * 30;

            posArray[i3] = Math.cos(angle) * radius * 1.5; // x
            posArray[i3 + 1] = height; // y
            posArray[i3 + 2] = Math.sin(angle) * radius; // z

            scaleArray[i] = Math.random() * 1.5;

            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colorArray[i3] = 0.1 + Math.random() * 0.2; // r
                colorArray[i3 + 1] = 0.1 + Math.random() * 0.3; // g
                colorArray[i3 + 2] = 0.5 + Math.random() * 0.5; // b
            } else if (colorChoice < 0.66) {
                colorArray[i3] = 0.3 + Math.random() * 0.3; // r
                colorArray[i3 + 1] = 0.1 + Math.random() * 0.2; // g
                colorArray[i3 + 2] = 0.5 + Math.random() * 0.5; // b
            } else {
                colorArray[i3] = 0.1 + Math.random() * 0.2; // r
                colorArray[i3 + 1] = 0.4 + Math.random() * 0.4; // g
                colorArray[i3 + 2] = 0.3 + Math.random() * 0.5; // b
            }
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
        particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

        // Create shader material for custom particle effects
        const particlesMaterial = new THREE.ShaderMaterial({
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexColors: true,
            vertexShader: `
        attribute float scale;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (30.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create circular particles
          float r = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (r > 0.5) discard;
          
          // Soft edge
          float alpha = 1.0 - smoothstep(0.3, 0.5, r);
          gl_FragColor = vec4(vColor, alpha * 0.5);
        }
      `
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Create a subtle glow effect in the center
        const glowGeometry = new THREE.SphereGeometry(6, 32, 32);
        const glowMaterial = new THREE.ShaderMaterial({
            transparent: true,
            blending: THREE.AdditiveBlending,
            vertexShader: `
        varying vec3 vNormal;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          vec3 color = mix(vec3(0.1, 0.2, 0.5), vec3(0.2, 0.5, 0.8), intensity);
          gl_FragColor = vec4(color, intensity * 0.3);
        }
      `
        });

        const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glowSphere);

        // Animation time and mouse position tracking
        let time = 0;
        const mouse = new THREE.Vector2(0, 0);

        // Track mouse movement
        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', onMouseMove);

        // Animation function
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.005;

            // Rotate based on time and subtle mouse influence
            particlesMesh.rotation.y = time * 0.1 + mouse.x * 0.05;
            particlesMesh.rotation.x = mouse.y * 0.05;

            // Make the glow sphere pulsate
            glowSphere.scale.setScalar(1 + Math.sin(time * 2) * 0.1);

            // Update individual particle positions for flowing effect
            const positions = particlesGeometry.attributes.position.array;
            for (let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                const y = positions[i3 + 1];

                // Add subtle vertical movement based on sine waves
                const newY = y + Math.sin(time + x * 0.1) * 0.03;
                positions[i3 + 1] = newY;
            }
            particlesGeometry.attributes.position.needsUpdate = true;

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
            window.removeEventListener('mousemove', onMouseMove);
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            glowGeometry.dispose();
            glowMaterial.dispose();
            scene.remove(particlesMesh);
            scene.remove(glowSphere);
            renderer.dispose();
        };
    }, []);

    const inputVariants = {
        focus: { scale: 1.02, borderColor: "rgba(120, 120, 255, 0.5)" },
        blur: { scale: 1, borderColor: "rgba(75, 75, 75, 0.3)" }
    };

    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 * i,
                duration: 0.6,
            }
        })
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="min-h-screen bg-black text-white relative overflow-hidden py-24"
        >
            {/* Three.js aurora background */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Overlay gradient for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50 z-10" />

            {/* Decorative elements */}
            <div className="absolute top-10 left-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'<contact>'}</div>
            <div className="absolute bottom-10 right-5 text-gray-800 opacity-10 text-5xl font-mono rotate-12 z-20">{'</contact>'}</div>

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
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-teal-300">
                                Get In Touch
                            </span>
                            {/* Underline effect */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="h-0.5 bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400 absolute bottom-0 left-0"
                            />
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto mt-4">
                            Have a project in mind or just want to connect? I&apos;d love to hear from you.
                        </p>
                    </motion.div>

                    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Contact Info Column */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-8"
                        >
                            <motion.div
                                custom={1}
                                variants={fadeInVariants}
                                className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_5px_15px_rgba(59,130,246,0.2)]"
                            >
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-lg bg-blue-600 bg-opacity-20 flex items-center justify-center mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-200 mb-1">Email</h3>
                                        <p className="text-gray-400">syedmuhammadmaarij@gmail.com</p>
                                        <a href="mailto:syedmuhammadmaarij@gmail.com" className="text-blue-400 hover:text-blue-300 inline-block mt-2 text-sm">Send an email →</a>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                custom={2}
                                variants={fadeInVariants}
                                className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_5px_15px_rgba(139,92,246,0.2)]"
                            >
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-lg bg-purple-600 bg-opacity-20 flex items-center justify-center mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-200 mb-1">Social</h3>
                                        <div className="flex gap-3 mt-2">
                                            <a href="https://github.com/Maarij07" className="text-gray-400 hover:text-white transition-colors" target='_blank'>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                            <a href="www.linkedin.com/in/maarij-bukhari" className="text-gray-400 hover:text-white transition-colors" target='_blank'>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                custom={3}
                                variants={fadeInVariants}
                                className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_5px_15px_rgba(45,212,191,0.2)]"
                            >
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-lg bg-teal-600 bg-opacity-20 flex items-center justify-center mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-200 mb-1">Location</h3>
                                        <p className="text-gray-400">Islamabad, Pakistan</p>
                                        <p className="text-gray-500 text-sm mt-1">Available for remote work worldwide</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 md:p-8 overflow-hidden relative">
                                {/* Glowing corners decoration */}
                                <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500 rounded-br-full opacity-10 blur-xl transform -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-500 rounded-tl-full opacity-10 blur-xl transform translate-x-1/2 translate-y-1/2" />

                                <h3 className="text-xl font-bold text-gray-200 mb-6">Send a Message</h3>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                        <motion.input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
                                            placeholder="Your name"
                                            variants={inputVariants}
                                            initial="blur"
                                            whileFocus="focus"
                                            whileTap="focus"
                                            animate="blur"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                        <motion.input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
                                            placeholder="Your email address"
                                            variants={inputVariants}
                                            initial="blur"
                                            whileFocus="focus"
                                            whileTap="focus"
                                            animate="blur"
                                        />

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                                            <motion.textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500 resize-none"
                                                placeholder="Your message"
                                                variants={inputVariants}
                                                initial="blur"
                                                whileFocus="focus"
                                                whileTap="focus"
                                                animate="blur"
                                            />
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full px-6 py-3 rounded-lg text-white font-medium relative overflow-hidden ${isSubmitting ? 'bg-gray-700' : 'bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500'
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {/* Animated background for the button */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"
                                                animate={{
                                                    x: ["0%", "100%", "0%"],
                                                }}
                                                transition={{
                                                    duration: 10,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                style={{
                                                    opacity: isSubmitting ? 0 : 1,
                                                    backgroundSize: "200% 100%"
                                                }}
                                            />

                                            {/* Button content with loading state */}
                                            <span className="relative">
                                                {isSubmitting ? (
                                                    <div className="flex items-center justify-center">
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </div>
                                                ) : (
                                                    "Send Message"
                                                )}
                                            </span>
                                        </motion.button>

                                        {/* Success and error messages */}
                                        <AnimatePresence>
                                            {formStatus === 'success' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="mt-4 p-3 bg-green-900 bg-opacity-50 border border-green-700 rounded-lg text-green-300 text-sm"
                                                >
                                                    <div className="flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Your message has been sent successfully!
                                                    </div>
                                                </motion.div>
                                            )}

                                                                                        {formStatus === 'error' && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="mt-4 p-3 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg text-red-300 text-sm"
                                                >
                                                    <div className="flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Something went wrong. Please try again.
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-float1"></div>
                    <div className="absolute top-40 right-40 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-float2"></div>
                    <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-teal-400 rounded-full opacity-60 animate-float3"></div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;