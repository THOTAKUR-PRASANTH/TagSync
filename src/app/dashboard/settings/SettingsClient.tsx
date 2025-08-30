"use client";
import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, ChevronRight, Settings, Palette, Globe, Shield, Mail, Phone, Camera, Eye, Moon, Sun } from 'lucide-react';

const SettingsOptionCard = ({
  icon,
  title,
  description,
  gradient,
  lightGradient,
  delay = 0,
  darkMode,
  link,
}: {
  icon: React.ReactElement;
  title: string;
  description: string;
  gradient: string;
  lightGradient: string;
  delay?: number;
  darkMode: boolean;
  link:string
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden 
        ${darkMode 
          ? 'backdrop-blur-lg bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600/70' 
          : 'backdrop-blur-lg bg-white/25 border border-white/30 hover:bg-white/35 hover:border-white/50'
        }
        shadow-xl group flex flex-col p-6 
        h-[220px] w-full cursor-pointer
        hover:shadow-2xl transition-all duration-500 ease-out
        transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        hover:scale-[1.02] hover:-translate-y-2`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Animated gradient border */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${darkMode ? gradient : lightGradient}
        transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700`} />
      
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${darkMode ? gradient : lightGradient} 
          rounded-full ${darkMode ? 'opacity-20' : 'opacity-10'} group-hover:opacity-30 transition-opacity duration-500
          group-hover:scale-110 transform transition-transform duration-700`} />
        <div className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr ${darkMode ? gradient : lightGradient} 
          rounded-full ${darkMode ? 'opacity-15' : 'opacity-5'} group-hover:opacity-25 transition-opacity duration-500
          group-hover:scale-110 transform transition-transform duration-700 delay-100`} />
      </div>

      <div className="flex flex-col h-full z-10 relative">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${darkMode ? gradient : lightGradient} shadow-lg
            group-hover:scale-110 transform transition-all duration-300
            group-hover:shadow-xl`}>
            {React.isValidElement(icon) ? React.cloneElement(icon, { className: "w-6 h-6 text-white" } as any) : icon}
          </div>
          <h3 className={`text-lg font-bold transition-colors
            ${darkMode ? 'text-gray-100 group-hover:text-white' : 'text-slate-900 group-hover:text-slate-800'}`}>
            {title}
          </h3>
        </div>
        <p className={`text-sm flex-grow leading-relaxed mb-4 transition-colors
          ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
          {description}
        </p>
        <button
          onClick={() => window.location.href = link}
          className={`flex items-center text-sm font-semibold transition-all duration-300 group-hover:translate-x-1
            ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'}`}>
          Manage
          <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  };
  darkMode: boolean;
}

const ProfileHeader = ({ user, darkMode }:ProfileHeaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setImageLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mb-12 text-center">
      {/* Background decoration */}
      <div className={`absolute inset-0 rounded-3xl blur-3xl transform -rotate-1
        ${darkMode 
          ? 'bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30' 
          : 'bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20'
        }`} />
      
      <div className={`relative backdrop-blur-lg rounded-3xl p-8 shadow-2xl transition-all duration-500
        ${darkMode 
          ? 'bg-gray-800/50 border border-gray-700/50' 
          : 'bg-white/30 border border-white/40'
        }`}>
        
        {/* Profile Image */}
        <div className="relative mb-6 inline-block">
          <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 
            flex items-center justify-center text-white text-2xl font-bold shadow-xl
            transform transition-all duration-700 ${imageLoaded ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
            
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    `https://placehold.co/600x600/FFC0CB/000000?text=No+Image`
                }}
              />
            ) : (
              user.name ? user.name.charAt(0).toUpperCase() : 'U'
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full 
            border-4 border-white shadow-lg">
            <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75" />
          </div>
        </div>

        <h1 className={`text-3xl font-bold mb-2 transition-colors duration-500
          ${darkMode ? 'text-gray-100' : 'text-slate-900'}`}>
          Welcome back, {user.name}
        </h1>
        <p className={`text-lg transition-colors duration-500
          ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
          {user.email}
        </p>
        
        {/* Floating stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center group cursor-pointer">
            <div className={`text-2xl font-bold transition-all duration-300 group-hover:scale-110
              ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>24</div>
            <div className={`text-xs transition-colors duration-500
              ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Settings</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className={`text-2xl font-bold transition-all duration-300 group-hover:scale-110
              ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>100%</div>
            <div className={`text-xs transition-colors duration-500
              ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Secure</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className={`text-2xl font-bold transition-all duration-300 group-hover:scale-110
              ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>5</div>
            <div className={`text-xs transition-colors duration-500
              ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Devices</div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuickSettingCardProps {
  icon: React.ReactElement<any>;
  title: string;
  color: string;
  darkMode: boolean;
  delay: number;
}

const QuickSettingCard = ({ icon, title, color, darkMode, delay }:QuickSettingCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`backdrop-blur-lg rounded-xl p-4 cursor-pointer group shadow-lg
        transition-all duration-500 hover:shadow-xl
        transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        hover:scale-105 hover:-translate-y-1
        ${darkMode 
          ? 'bg-gray-800/40 border border-gray-700/40 hover:bg-gray-800/60' 
          : 'bg-white/25 border border-white/30 hover:bg-white/35'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className={`${color} group-hover:scale-110 transition-transform duration-300`}>
          {React.isValidElement(icon) ? React.cloneElement(icon, { className: "w-5 h-5" } as any) : icon}
        </div>
        <span className={`text-sm font-semibold transition-colors duration-300
          ${darkMode 
            ? 'text-gray-200 group-hover:text-white' 
            : 'text-slate-800 group-hover:text-slate-900'
          }`}>
          {title}
        </span>
        <ChevronRight className={`w-4 h-4 ml-auto transition-all duration-300
          group-hover:translate-x-1
          ${darkMode ? 'text-gray-400' : 'text-slate-600'}`} />
      </div>
    </div>
  );
};

interface SettingsClientProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function SettingsClient({user}:SettingsClientProps) {
  const [darkMode, setDarkMode] = useState(false);

  const settingsOptions = [
    {
      icon: <User />,
      title: "Profile & Account",
      description: "Update your personal information, profile picture, and account details.",
      gradient: "from-pink-600 to-rose-600",
      lightGradient: "from-pink-500 to-rose-500",
      delay: 0,
      link: "settings/edit-profile",
    },
    {
      icon: <Lock />,
      title: "Privacy & Security",
      description: "Manage passwords, two-factor authentication, and privacy settings.",
      gradient: "from-purple-600 to-indigo-600",
      lightGradient: "from-purple-500 to-indigo-500",
      delay: 100,
      link: "settings/privacy-security",
    },
    {
      icon: <Bell />,
      title: "Notifications",
      description: "Configure alerts, email preferences, and notification timing.",
      gradient: "from-blue-600 to-cyan-600",
      lightGradient: "from-blue-500 to-cyan-500",
      delay: 200,
      link: "settings/notifications",
    },
    {
      icon: <Palette />,
      title: "Appearance",
      description: "Customize themes, colors, and visual preferences for your experience.",
      gradient: "from-emerald-600 to-teal-600",
      lightGradient: "from-emerald-500 to-teal-500",
      delay: 300,
      link: "settings/appearance",
    },
    {
      icon: <Globe />,
      title: "Language & Region",
      description: "Set your language, timezone, and regional formatting preferences.",
      gradient: "from-orange-600 to-red-600",
      lightGradient: "from-orange-500 to-red-500",
      delay: 400,
      link: "settings/language-region",
    },
    {
      icon: <Shield />,
      title: "Advanced Security",
      description: "Device management, session monitoring, and security analytics.",
      gradient: "from-violet-600 to-purple-600",
      lightGradient: "from-violet-500 to-purple-500",
      delay: 500,
      link: "settings/advanced-security",
    }
  ];

  const quickSettings = [
    { icon: <Mail />, title: "Email Settings", color: darkMode ? "text-blue-400" : "text-blue-500", delay: 600 },
    { icon: <Phone />, title: "SMS Preferences", color: darkMode ? "text-green-400" : "text-green-500", delay: 700 },
    { icon: <Camera />, title: "Media & Files", color: darkMode ? "text-purple-400" : "text-purple-500", delay: 800 },
    { icon: <Eye />, title: "Privacy Dashboard", color: darkMode ? "text-pink-400" : "text-pink-500", delay: 900 }
  ];

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen w-full relative transition-all duration-700
      ${darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
      }`}>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full 
          mix-blend-multiply filter blur-xl animate-pulse transition-all duration-700
          ${darkMode 
            ? 'bg-purple-500 opacity-10' 
            : 'bg-purple-300 opacity-20'
          }`}
          style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full 
          mix-blend-multiply filter blur-xl animate-pulse transition-all duration-700
          ${darkMode 
            ? 'bg-pink-500 opacity-10' 
            : 'bg-pink-300 opacity-20'
          }`}
          style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <div className={`absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full 
          mix-blend-multiply filter blur-xl animate-pulse transition-all duration-700
          ${darkMode 
            ? 'bg-blue-500 opacity-10' 
            : 'bg-blue-300 opacity-20'
          }`}
          style={{ animationDelay: '1s', animationDuration: '4s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-bounce transition-all duration-700
              ${darkMode ? 'bg-white/20' : 'bg-white/30'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 lg:pb-8">
        
        {/* Dark mode toggle - Hidden on mobile to avoid conflicts */}
        <div className="hidden lg:block fixed top-6 right-6 z-20">
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full backdrop-blur-lg shadow-lg transition-all duration-300 
              hover:scale-110 active:scale-95 group
              ${darkMode 
                ? 'bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80' 
                : 'bg-white/30 border border-white/40 hover:bg-white/40'
              }`}
          >
            <div className="relative">
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 group-hover:text-slate-800 transition-colors duration-300" />
              )}
              <div className={`absolute inset-0 rounded-full transition-all duration-300
                ${darkMode ? 'bg-yellow-400/20' : 'bg-slate-700/20'} 
                scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100`} />
            </div>
          </button>
        </div>

        {/* Mobile dark mode toggle - Positioned to not conflict with hamburger */}
        <div className="lg:hidden fixed top-6 right-6 z-5">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full backdrop-blur-lg shadow-lg transition-all duration-300 
              hover:scale-110 active:scale-95 group
              ${darkMode 
                ? 'bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80' 
                : 'bg-white/30 border border-white/40 hover:bg-white/40'
              }`}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 group-hover:text-slate-800 transition-colors duration-300" />
            )}
          </button>
        </div>

       
       

        {/* Profile Header */}
        <ProfileHeader user={user} darkMode={darkMode} />

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {settingsOptions.map((option, index) => (
            <SettingsOptionCard key={index} {...option} darkMode={darkMode} />
          ))}
        </div>

        {/* Quick Settings */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold mb-6 transition-colors duration-500
            ${darkMode ? 'text-gray-200' : 'text-slate-800'}`}>
            Quick Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickSettings.map((item, index) => (
              <QuickSettingCard 
                key={index} 
                {...item} 
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>

        {/* Additional Settings Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Data & Storage */}
          <div className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl transition-all duration-500
            ${darkMode 
              ? 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60' 
              : 'bg-white/25 border border-white/30 hover:bg-white/35'
            }`}>
            <h3 className={`text-xl font-bold mb-4 transition-colors duration-500
              ${darkMode ? 'text-gray-100' : 'text-slate-900'}`}>
              Data & Storage
            </h3>
            <div className="space-y-3">
              {['Download Data', 'Storage Usage', 'Backup Settings', 'Data Retention'].map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300
                  ${darkMode 
                    ? 'hover:bg-gray-700/50 text-gray-300' 
                    : 'hover:bg-white/50 text-slate-700'
                  } cursor-pointer group`}>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Account Actions */}
          <div className={`backdrop-blur-lg rounded-2xl p-6 shadow-xl transition-all duration-500
            ${darkMode 
              ? 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60' 
              : 'bg-white/25 border border-white/30 hover:bg-white/35'
            }`}>
            <h3 className={`text-xl font-bold mb-4 transition-colors duration-500
              ${darkMode ? 'text-gray-100' : 'text-slate-900'}`}>
              Account Actions
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Export Account', color: 'text-blue-500' },
                { name: 'Deactivate Account', color: 'text-yellow-500' },
                { name: 'Delete Account', color: 'text-red-500' },
                { name: 'Contact Support', color: 'text-green-500' }
              ].map((item, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300
                  ${darkMode 
                    ? 'hover:bg-gray-700/50' 
                    : 'hover:bg-white/50'
                  } cursor-pointer group`}>
                  <span className={`group-hover:translate-x-1 transition-transform duration-300 ${item.color}`}>
                    {item.name}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className={`backdrop-blur-lg rounded-2xl p-8 shadow-xl transition-all duration-500
            hover:shadow-2xl hover:scale-[1.01]
            ${darkMode 
              ? 'bg-gray-800/50 border border-gray-700/50' 
              : 'bg-white/20 border border-white/30'
            }`}>
            <div className="mb-6">
              <Settings className={`w-12 h-12 mx-auto mb-4 transition-all duration-500
                ${darkMode ? 'text-purple-400' : 'text-purple-600'} 
                hover:rotate-180`} />
              <h3 className={`text-xl font-bold mb-2 transition-colors duration-500
                ${darkMode ? 'text-gray-100' : 'text-slate-900'}`}>
                Need Help?
              </h3>
              <p className={`text-sm mb-6 transition-colors duration-500
                ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                Our support team is available 24/7 to assist you with any questions or concerns.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300
                transform hover:scale-105 hover:shadow-xl active:scale-95
                ${darkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                }`}>
                Contact Support
              </button>
              <button className={`px-8 py-3 rounded-xl font-semibold border-2 transition-all duration-300
                transform hover:scale-105 active:scale-95
                ${darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500' 
                  : 'border-slate-300 text-slate-700 hover:bg-white/50 hover:border-slate-400'
                }`}>
                Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
