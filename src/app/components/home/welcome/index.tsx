'use client';
import React from 'react';
import { motion } from 'framer-motion';

// You can place your hero image in the `public` directory of your Next.js project.
const heroImageUrl = '/images/hero/hero.png';

const HeroComponent = () => {
  // A container variant that staggers the animation of its children
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  // A simple fade-up animation variant for child elements
  const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: "easeInOut" }
    },
  };

  return (
    // Main section container with a new, more colorful background and increased height
    <section className="w-full bg-slate-50 font-sans overflow-hidden relative py-12 sm:py-16">

      {/* NEW: Glassmorphic colors on the edges of the background */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-200/50 to-transparent filter blur-3xl"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-200/50 to-transparent filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-pink-200/50 to-transparent filter blur-3xl"></div>

      {/* Outer container with reduced padding */}
      <div className="relative w-full flex flex-col items-center justify-center px-2 sm:px-4">

        {/* Glassmorphic Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          // UPDATED: Increased max-width for a wider card and adjusted padding/margins
          className="relative w-full max-w-7xl rounded-[2.5rem] shadow-2xl 
                     bg-white/60 backdrop-blur-xl 
                     overflow-hidden p-1.5"
        >
          {/* A cool, clean, ANIMATED gradient border */}
          {/* UPDATED: Added motion.div for animation and increased blur/opacity for a stronger glow */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 15,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-90"></div>
          </motion.div>
          
          <div className="relative bg-white/70 rounded-[2rem] border border-white/30">

            {/* Inner container with padding */}
            <div className="relative p-6 sm:p-8 md:p-10">

              {/* Mobile stacked | Desktop grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-8 items-center">

                {/* Image Column with increased height */}
                <motion.div
                  className="w-full h-[45vh] sm:h-[50vh] lg:h-[70vh] lg:max-h-[600px] lg:col-span-5"
                  variants={fadeUp}
                >
                  <img
                    src={heroImageUrl}
                    alt="A person lovingly hugging their dog"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x1000/ccc/FFF?text=Image'; }}
                  />
                </motion.div>

                {/* Text Content Column */}
                <motion.div
                  className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-4"
                  variants={staggerContainer}
                >
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight"
                    variants={fadeUp}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
                      TagSync:
                    </span>{" "}
                    Lost & Found, Made Kind.
                  </motion.h1>

                  <motion.p
                    className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    variants={fadeUp}
                  >
                    Losing a beloved pet or something precious feels like losing a piece of your heart.
                    The panic, the searching, the “what ifs”—it's overwhelming.
                  </motion.p>

                  <motion.p
                    className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
                    variants={fadeUp}
                  >
                    But TagSync turns those moments of fear into stories of reunion.
                    With a simple scan, finders become helpers, and strangers become heroes.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroComponent;
