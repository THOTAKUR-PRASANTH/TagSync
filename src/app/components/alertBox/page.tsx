"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Icons
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
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14z" />
    </svg>
  ),
};

// Themes
const themes = {
  success: {
    bg: "bg-gradient-to-br from-emerald-500/90 via-green-500/80 to-teal-400/70 backdrop-blur-xl border border-emerald-200/50 shadow-2xl",
    icon: "text-white drop-shadow-[0_0_6px_rgba(16,185,129,0.9)]",
    timer: "bg-gradient-to-r from-emerald-600 to-emerald-800",
    text: "text-white font-semibold",
  },
  error: {
    bg: "bg-gradient-to-br from-rose-600/90 via-red-500/80 to-pink-500/70 backdrop-blur-xl border border-red-200/50 shadow-2xl",
    icon: "text-white drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]",
    timer: "bg-gradient-to-r from-red-700 to-rose-900",
    text: "text-white font-semibold",
  },
  info: {
    bg: "bg-gradient-to-br from-sky-500/90 via-blue-500/80 to-indigo-500/70 backdrop-blur-xl border border-blue-200/50 shadow-2xl",
    icon: "text-white drop-shadow-[0_0_6px_rgba(59,130,246,0.9)]",
    timer: "bg-gradient-to-r from-blue-700 to-indigo-900",
    text: "text-white font-semibold",
  },
  warning: {
    bg: "bg-gradient-to-br from-amber-500/90 via-orange-500/80 to-yellow-400/70 backdrop-blur-xl border border-amber-200/50 shadow-2xl",
    icon: "text-white drop-shadow-[0_0_6px_rgba(245,158,11,0.9)]",
    timer: "bg-gradient-to-r from-orange-700 to-amber-900",
    text: "text-white font-semibold",
  },
};

export interface AnimatedAlertProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose: () => void;
}

const AnimatedAlert = ({ message, type = "info", duration = 5000, onClose }: AnimatedAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
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
          initial={{ opacity: 0, x: 100, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className={`fixed top-5 right-5 w-full max-w-sm rounded-xl shadow-2xl overflow-hidden z-50 ${theme.bg}`}
        >
          <div className="p-4 flex items-start space-x-3">
            <div className={`flex-shrink-0 ${theme.icon}`}>{icons[type]}</div>
            <div className="flex-1">
              <p className={`font-medium text-sm ${theme.text}`}>{message}</p>
            </div>
            <button onClick={handleClose} className="text-gray-200 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Timer bar */}
          <motion.div
            className={`h-1 ${theme.timer}`}
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedAlert;
