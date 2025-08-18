'use client';

import React, { useEffect } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti"; 

const ThemedStyles = () => (
  <style jsx global>{`
    /* Import the Poppins font from Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

    :root {
      --shadow-mentor-shadow: 0px 8px 32px rgba(110, 127, 185, 0.2);
      --color-primary: #ff4ecd;
      --color-secondary: #4ecbff;
      --color-body-bg: #f4f6fb;   /* Light off-white background */
      --color-text-dark: #334155; /* Darker text for readability */
      --color-text-light: #64748b;/* Lighter text for subtitles */
      --font-body: 'Poppins', sans-serif; /* Define the new font */
    }

    /* Keyframes for the new glowing border effect */
    @keyframes glowing-border {
      0% {
        box-shadow: 0 0 5px var(--color-secondary), 0 0 10px var(--color-secondary);
      }
      50% {
        box-shadow: 0 0 20px var(--color-primary), 0 0 30px var(--color-primary);
      }
      100% {
        box-shadow: 0 0 5px var(--color-secondary), 0 0 10px var(--color-secondary);
      }
    }

    /* New class for the static gradient text highlight */
    .gradient-text {
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}</style>
);

const VerifyEmailCelebration = () => {
  useEffect(() => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    const rainbowColors = [
      "#d602c5ff",
      "#00affaff",
      "#00ffa2ff",
      "#fcc900ff",
      "#ff6a00ff",
      "#ff0000ff",
      "#4000ffff",
    ];

    (function frame() {
      confetti({
        particleCount: 7,
        startVelocity: 30,
        spread: 360,
        ticks: 150,
        origin: { x: Math.random(), y: 0 },
        colors: rainbowColors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <>
      <ThemedStyles />
      <div
        className="flex min-h-screen items-center justify-center relative overflow-hidden"
        style={{
          background: `var(--color-body-bg)`,
          fontFamily: `var(--font-body)` 
        }}
      >
        <motion.div
          initial={{ y: -500, opacity: 0, rotate: -10 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 12 }}
          className="relative z-10 mx-4 w-full max-w-lg overflow-hidden rounded-2xl p-12 text-center backdrop-blur-lg"
          style={{
            background: `linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))`,
            border: "1px solid rgba(255, 255, 255, 0.8)",
            animation: "glowing-border 4s ease-in-out infinite",
          }}
        >
          <div className="relative mb-6 h-24 w-24 mx-auto">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
            >
              <Mail
                className="h-12 w-12 animate-pulse"
                style={{ color: "var(--color-primary)" }}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: "var(--color-secondary)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>

          <h1 className="text-4xl font-extrabold gradient-text mb-4">
            🎉 Verify Your Email
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg mb-6"
            style={{ color: "var(--color-text-dark)" }}
          >
            Your signup was successful. We've sent a verification link to your inbox 🚀
          </motion.p>


          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm"
            style={{ color: "var(--color-text-light)" }}
          >
            Didn’t receive the email? Check your spam folder.
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default VerifyEmailCelebration;
