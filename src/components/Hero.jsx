'use client';

// components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';  // React Router for navigation
import profileImage from '../assets/profile.jpg';  // Make sure the image path is correct

const Hero = () => {
    const canvasRef = useRef(null);

    // Particle effect background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return; // Early return if context is null

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];

        const colors = ['#333', '#444', '#555', '#666'];
        const particleCount = Math.min(window.innerWidth / 10, 60);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        function animate() {
            requestAnimationFrame(animate);
            if (!ctx || !canvas) return; // Check both ctx and canvas

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.alpha;
                ctx.fill();

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Fixed the null check by ensuring canvas exists
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            });
        }

        animate();

        const handleResize = () => {
            if (!canvas) return; // Add null check here too
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="relative h-screen bg-black text-white flex items-center overflow-hidden">
            {/* Particle Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 opacity-40"
            ></canvas>

            {/* Vignette Effect */}
            <div className="absolute inset-0 z-10 bg-radial-gradient pointer-events-none"></div>

            {/* Content Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-2/3 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-2"
                        >
                            <h2 className="text-gray-400 text-xl md:text-2xl font-light">Hello, I am</h2>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                                <span className="block">Maarij</span>
                                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">Bukhari</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h3 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light">
                                Web &amp; Mobile <span className="text-gray-400">Developer</span>
                            </h3>
                            <p className="mt-4 text-gray-400 max-w-xl text-base md:text-lg">
                                Crafting immersive digital experiences with React, Next.js, React Native, and Flutter.
                                Building websites and applications that combine function with elegant design.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="pt-4"
                        >
                            <Link to="#projects">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-6 py-3 overflow-hidden rounded-md bg-transparent text-lg font-medium text-white shadow-inner border border-gray-700"
                                >
                                    <span className="relative z-10">View My Work</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute -inset-1 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500 group-hover:duration-200 bg-gradient-to-r from-gray-700 to-gray-500"></div>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    <div className="w-full md:w-1/3 mt-12 md:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            {/* Decorative code elements */}
                            <div className="absolute -top-8 -left-8 text-gray-800 opacity-40 text-xs md:text-sm font-mono">
                                <div>const developer = {`{`}</div>
                                <div className="pl-4">name: &quot;Maarij Bukhari&quot;,</div>
                                <div className="pl-4">skills: [&quot;React&quot;, &quot;Next.js&quot;, &quot;React Native&quot;, &quot;Flutter&quot;],</div>
                                <div className="pl-4">passion: &quot;Building amazing digital experiences&quot;</div>
                                <div>{`}`};</div>
                            </div>

                            {/* Gray geometric shape or placeholder for profile image */}
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-md relative overflow-hidden mx-auto">
                                <img
                                    src={profileImage}
                                    alt="Maarij Bukhari"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
                <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-6 h-10 rounded-full border border-gray-700 flex justify-center pt-2"
                >
                    <motion.div
                        animate={{ height: ['20%', '30%', '20%'] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1 bg-gray-500 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
