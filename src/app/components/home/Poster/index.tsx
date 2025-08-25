"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// Import icons from react-icons
import { FaShieldAlt, FaHeart, FaHandshake } from "react-icons/fa";

// Advanced Glassmorphic Card with Hover Effects (Light Theme)
const GlassCard = ({
  children,
  className,
  delay = 0,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99],
        scale: { type: "spring", stiffness: 100 },
      }}
      whileHover={
        hover
          ? {
              scale: 1.03,
              rotateX: 2,
              rotateY: 2,
              transition: { duration: 0.3 },
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      className={`relative group ${className}`}
    >
      {/* Multi-layer glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-transparent backdrop-blur-xl rounded-3xl" />

      {/* Dynamic gradient border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/30 via-blue-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main glass container */}
      <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl border border-white/50 shadow-[0_8px_32px_rgba(31,38,135,0.1)] overflow-hidden p-6 transition-all duration-500">
        {/* Animated shine effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.5), transparent 40%)`,
          }}
        />

        {/* Rainbow reflection */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic from-purple-400/15 via-blue-400/15 to-purple-400/15 opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-1000 group-hover:animate-spin-slow" />

        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
};

// Floating animation component
const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    {children}
  </motion.div>
);

// Animated gradient orbs
const GradientOrb = ({
  className,
  size = "w-96 h-96",
  color = "bg-purple-500",
  delay = 0,
}: {
  className?: string;
  size?: string;
  color?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: [0.1, 0.3, 0.1], // Reduced opacity for light theme
      scale: [1, 1.2, 1],
      x: [0, 50, 0],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
    // Switched to mix-blend-multiply for better effect on light background
    className={`absolute ${size} ${color} rounded-full blur-3xl mix-blend-multiply ${className}`}
  />
);

// Feature items with icons
const featureItems = [
  {
    title: "Trust",
    description: "Secure QR technology ensures your belongings return safely.",
    icon: <FaShieldAlt />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Compassion",
    description: "Creating heartfelt moments when lost becomes found.",
    icon: <FaHeart />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Commitment",
    description: "Dedicated to reuniting you with what matters most.",
    icon: <FaHandshake />,
    gradient: "from-orange-500 to-yellow-500",
  },
];

export default function TagSyncHeroPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fade animation variant for all children (fast and smooth)
  const fadeVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-100 via-sky-100 to-purple-100 text-slate-800 overflow-hidden p-4 sm:p-6"
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        paddingTop: "5rem",
      }}
    >
      {/* Multiple animated orbs for depth */}
      <GradientOrb className="top-0 -left-48" color="bg-blue-300" delay={0} />
      <GradientOrb
        className="bottom-0 -right-48"
        color="bg-purple-300"
        delay={2}
      />
      <GradientOrb
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        color="bg-cyan-300"
        size="w-[600px] h-[600px]"
        delay={4}
      />

      {/* Particle effect */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-slate-500/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
              }}
              animate={{
                y: -100,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
      </div>

      {/* Main Container */}
      <div className="z-10 max-w-7xl w-full flex flex-col items-center gap-8 sm:gap-12">
        {/* Animated Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeVariant}
          className="text-center space-y-4"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeVariant}
          >
            <span className="inline-block px-6 py-2 text-sm font-medium tracking-wider text-purple-600 uppercase bg-white/40 backdrop-blur-xl rounded-full border border-purple-300/50 shadow-lg shadow-purple-500/10">
              The Heart of TagSync
            </span>
          </motion.div>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeVariant}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-text">
              Kindness in Every
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text animate-gradient-text">
              Reunion
            </span>
          </motion.h1>
        </motion.div>

        {/* Images Section with enhanced glass cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Poster Card */}
          <GlassCard className="lg:col-span-3" delay={0.2}>
            <FloatingElement delay={0}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeVariant}
                className="space-y-6"
              >
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 text-transparent bg-clip-text leading-tight">
                    Everything you love finds its way home
                  </h2>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base">
                    Smart QR tags that connect hearts across distances.
                  </p>
                </div>

                <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/20 shadow-xl">
                  <Image
                    src="/images/hero/poster.png"
                    alt="Happy reunion with TagSync"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className="transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />

                  {/* Animated overlay text */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <span className="px-4 py-2 bg-black/10 backdrop-blur-lg rounded-full text-white text-sm inline-block border border-white/20">
                      ✨ Trusted by 10,000+ happy users
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </FloatingElement>
          </GlassCard>

          {/* Product Showcase Card */}
          <GlassCard className="lg:col-span-2" delay={0.4}>
            <FloatingElement delay={0.5}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeVariant}
                className="h-full flex flex-col justify-center space-y-4"
              >
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Smart Tags for Your Belongings
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm">
                    Elegant design meets cutting-edge technology.
                  </p>
                </div>

                <div className="relative w-full h-[250px] sm:h-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/20 group">
                  <Image
                    src="/images/hero/glass.png"
                    alt="TagSync product showcase"
                    fill
                    style={{ objectFit: "contain" }}
                    className="transition-all duration-700 group-hover:scale-105 group-hover:rotate-3"
                  />
                </div>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Waterproof", "Global", "Instant"].map((badge, i) => (
                    <motion.span
                      key={badge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-xs text-slate-700 font-medium border border-white/30"
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </FloatingElement>
          </GlassCard>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {featureItems.map((item, index) => (
            <GlassCard key={item.title} delay={0.6 + index * 0.1}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeVariant}
                className="text-center space-y-4"
              >
                <motion.div
                  className="text-5xl mx-auto w-fit"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  {item.icon}
                </motion.div>

                <h3
                  className={`text-2xl font-bold bg-gradient-to-r ${item.gradient} text-transparent bg-clip-text`}
                >
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                <motion.div
                  className={`h-1 bg-gradient-to-r ${item.gradient} rounded-full mx-auto`}
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                />
              </motion.div>
            </GlassCard>
          ))}
        </div>
      </div>
      <style jsx global>{`
        html,
        body {
          overscroll-behavior: contain;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes gradient-text {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        .animate-gradient-text {
          animation: gradient-text 3s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </main>
  );
}