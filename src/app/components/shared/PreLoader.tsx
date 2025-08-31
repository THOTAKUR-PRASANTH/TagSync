"use client";
import React, { useState, useEffect } from 'react';
import { Hash, Zap, Globe, Check } from 'lucide-react';

const PreLoader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading, syncing, complete
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setPhase('complete');
          return 100;
        }
        if (prev >= 70) setPhase('syncing');
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          
          @keyframes brandReveal {
            0% { 
              opacity: 0; 
              transform: scale(0.8) rotateY(-45deg);
              filter: blur(20px);
            }
            50% {
              transform: scale(1.1) rotateY(0deg);
              filter: blur(5px);
            }
            100% { 
              opacity: 1; 
              transform: scale(1) rotateY(0deg);
              filter: blur(0px);
            }
          }
          
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
          }
          
          @keyframes textShimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          
          @keyframes pulseRing {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(2.5); opacity: 0; }
          }
          
          @keyframes particleFloat {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
          }
          
          @keyframes progressFlow {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          
          @keyframes fadeSlideUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0px); }
          }
          
          @keyframes checkmarkDraw {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          
          @keyframes successBurst {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            100% { transform: scale(1.5) rotate(180deg); opacity: 0; }
          }
          
          .brand-text {
            font-family: 'Inter', sans-serif;
            font-size: 3.5rem;
            font-weight: 900;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: textShimmer 3s infinite linear, brandReveal 1.2s ease-out;
            letter-spacing: -2px;
            text-shadow: 0 0 40px rgba(102, 126, 234, 0.3);
          }
          
          .tagline {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            color: #8b5cf6;
            animation: fadeSlideUp 1s ease-out 0.5s both;
          }
          
          .logo-container {
            animation: logoFloat 4s ease-in-out infinite;
          }
          
          .pulse-ring {
            position: absolute;
            border: 2px solid #667eea;
            border-radius: 50%;
            animation: pulseRing 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          }
          
          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            animation: particleFloat 3s ease-out infinite;
          }
          
          .progress-bar {
            background: linear-gradient(90deg, 
              #667eea 0%, 
              #764ba2 25%, 
              #f093fb 50%, 
              #f5576c 75%, 
              #4facfe 100%
            );
            background-size: 300% 100%;
            animation: progressFlow 2s linear infinite;
          }
          
          .status-text {
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            animation: fadeSlideUp 0.5s ease-out;
          }
          
          @media (max-width: 640px) {
            .brand-text {
              font-size: 2.5rem;
            }
          }
          
          @media (max-width: 480px) {
            .brand-text {
              font-size: 2rem;
            }
          }
        `}
      </style>

      <div className="fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center z-[999999] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
        {/* Animated Background Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${(i * 5 + 10) % 100}%`, // deterministic position for SSR/CSR match
              animationDelay: `${(i * 0.2) % 3}s`, // deterministic delay
              animationDuration: `${3 + (i % 5) * 0.3}s`, // deterministic duration
            }}
          />
        ))}
        
        {/* Main Logo Section */}
        <div className="relative flex flex-col items-center">
          {/* Pulsing Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="pulse-ring" style={{ animationDelay: '0s' }} />
            <div className="pulse-ring" style={{ animationDelay: '1s' }} />
            <div className="pulse-ring" style={{ animationDelay: '2s' }} />
          </div>
          
          {/* Logo Icon */}
          <div className="logo-container relative z-10 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 rounded-2xl shadow-2xl">
                <Hash className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          {/* Brand Name */}
          <div className="text-center mb-4">
            <h1 className="brand-text">TagSync</h1>
            <p className="tagline text-lg sm:text-xl text-purple-300 mt-2">
              Synchronizing Your Digital World
            </p>
          </div>
        </div>
        
        {/* Progress Section */}
        <div className="w-full max-w-md px-8 mt-8">
          {/* Progress Bar */}
          <div className="relative mb-6">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="progress-bar h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="absolute -top-1 -bottom-1 left-0 right-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse" />
          </div>
          
          {/* Status Text */}
          <div className="text-center">
            <p className="status-text text-white/90 text-sm mb-2">
              {phase === 'loading' && 'Initializing TagSync...'}
              {phase === 'syncing' && 'Syncing your preferences...'}
              {phase === 'complete' && 'Ready to go!'}
            </p>
            <p className="text-white/60 text-xs">
              {Math.round(progress)}% Complete
            </p>
          </div>
        </div>
        
        {/* Loading Icons */}
        <div className="flex items-center gap-6 mt-8">
          <div className={`p-3 rounded-xl transition-all duration-500 ${
            phase === 'loading' ? 'bg-blue-500/20 scale-110' : 'bg-white/10'
          } backdrop-blur-sm`}>
            <Globe className={`w-5 h-5 ${
              phase === 'loading' ? 'text-blue-300 animate-spin' : 'text-white/50'
            }`} />
          </div>
          
          <div className={`p-3 rounded-xl transition-all duration-500 ${
            phase === 'syncing' ? 'bg-purple-500/20 scale-110' : 'bg-white/10'
          } backdrop-blur-sm`}>
            <Zap className={`w-5 h-5 ${
              phase === 'syncing' ? 'text-purple-300 animate-bounce' : 'text-white/50'
            }`} />
          </div>
          
          <div className={`p-3 rounded-xl transition-all duration-500 ${
            phase === 'complete' ? 'bg-green-500/20 scale-110' : 'bg-white/10'
          } backdrop-blur-sm`}>
            {phase === 'complete' ? (
              <div className="relative">
                <Check className="w-5 h-5 text-green-300" />
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30" />
              </div>
            ) : (
              <Check className="w-5 h-5 text-white/50" />
            )}
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 blur-xl animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/4 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '2s' }} />
        
        {/* Success Burst Effect */}
        {phase === 'complete' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 border-4 border-green-400/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute w-80 h-80 border-2 border-purple-400/20 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.2s' }} />
          </div>
        )}
      </div>
    </>
  );
};

export default PreLoader;