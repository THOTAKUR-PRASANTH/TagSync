"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const icons = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const themes = {
  success: {
    bg: "bg-gradient-to-r from-green-400/40 to-emerald-500/40",
    icon: "text-green-200",
    timer: "from-green-400 to-emerald-500",
    text: "text-white",
  },
  error: {
    bg: "bg-gradient-to-r from-red-400/30 via-rose-500/30 to-pink-500/30",
    icon: "text-red-200",
    timer: "from-red-400 via-rose-500 to-pink-500",
    text: "text-white",
  },
  info: {
    bg: "bg-gradient-to-r from-blue-400/40 to-indigo-500/40",
    icon: "text-blue-200",
    timer: "from-blue-400 to-indigo-500",
    text: "text-white",
  },
};

type AlertType = "success" | "error" | "info";

interface Props {
  message: string;
  type?: AlertType;
  duration?: number;
  onClose: () => void;
}

export default function AnimatedAlert({ message, type = "info", duration = 4000, onClose }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400); 
  };

  const theme = themes[type] || themes.info;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 80 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className={`fixed top-6 right-6 w-[400px] max-w-[92%] rounded-2xl shadow-2xl overflow-hidden z-50
            ${theme.bg} backdrop-blur-xl border border-white/20`}
        >
          <div className="px-5 py-2 flex items-center space-x-3">
            <div className={`flex-shrink-0 ${theme.icon}`}>{icons[type]}</div>
            <div className="flex-1">
              <p className={`font-medium text-sm ${theme.text}`}>{message}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <motion.div
            className={`h-1 bg-gradient-to-r ${theme.timer}`}
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
