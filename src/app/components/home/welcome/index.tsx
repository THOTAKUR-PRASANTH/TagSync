'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

  // A more performant fade-up animation variant
  const fadeUp = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 1, 0.5, 1] // A smooth, fast ease-out curve
      }
    },
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-slate-50 py-12 font-sans sm:py-16"
      style={{ paddingTop: '5rem' }}
    >
      {/* Background blur elements */}
      <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-purple-200/50 to-transparent filter blur-3xl"></div>
      <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-cyan-200/50 to-transparent filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-pink-200/50 to-transparent filter blur-3xl"></div>

      <div className="relative flex w-full flex-col items-center justify-center px-2 sm:px-4">
        {/* Glassmorphic Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Triggers animation once
          variants={staggerContainer}
          className="relative w-full max-w-7xl overflow-hidden rounded-[2.5rem] bg-white/60 p-1.5 shadow-2xl backdrop-blur-xl"
        >
          {/* Performant CSS animation for the border glow */}
          <div className="animate-spin-slow absolute inset-0 -z-10">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 blur-2xl opacity-90"></div>
          </div>

          <div className="relative rounded-[2rem] border border-white/30 bg-white/70">
            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 items-center gap-y-8 lg:grid-cols-12 lg:gap-x-12">
                
                {/* Image Column */}
                <motion.div
                  className="relative h-[45vh] w-full sm:h-[50vh] lg:col-span-5 lg:h-[70vh] lg:max-h-[600px] will-change-transform"
                  variants={fadeUp}
                >
                  <Image
                    src={heroImageUrl}
                    alt="A person lovingly hugging their dog"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="rounded-2xl object-cover shadow-lg"
                    priority
                  />
                </motion.div>

                {/* Text Content Column */}
                <motion.div
                  className="flex flex-col justify-center space-y-4 text-center lg:col-span-7 lg:text-left will-change-transform"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.h1
                    className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
                    variants={fadeUp}
                  >
                    <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      TagSync:
                    </span>{" "}
                    Lost & Found, Made Kind.
                  </motion.h1>

                  <motion.p
                    className="mx-auto max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg lg:mx-0 lg:text-xl"
                    variants={fadeUp}
                  >
                    Losing a beloved pet or something precious feels like losing a piece of your heart. The panic, the searching, the “what ifs”—it's overwhelming.
                  </motion.p>

                  <motion.p
                    className="mx-auto max-w-2xl text-base leading-relaxed text-gray-700 md:text-lg lg:mx-0 lg:text-xl"
                    variants={fadeUp}
                  >
                    But TagSync turns those moments of fear into stories of reunion. With a simple scan, finders become helpers, and strangers become heroes.
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
