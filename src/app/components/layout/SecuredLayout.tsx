"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Settings, 
  CreditCard, 
  BarChart3,
  Bell,
  Menu,
  X,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

/* Custom styles for the new theme and scrollbar */
const GlobalStyles = () => (
  <style jsx global>{`
    /* Custom ultra-thin, attractive scrollbar for the new theme */
    .thin-scrollbar::-webkit-scrollbar {
      width: 5px;
    }
    .thin-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .thin-scrollbar::-webkit-scrollbar-thumb {
      background: #f9a8d4; /* pink-300 */
      border-radius: 10px;
    }
    .thin-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #f472b6; /* pink-400 */
    }
  `}</style>
);

interface SecuredLayoutProps {
  children: React.ReactNode;
  user?: {
    email?: string;
  };
}

// Sidebar Component (Mobile Only)
function Sidebar({ isOpen, onClose, user }: { 
  isOpen: boolean; 
  onClose: () => void; 
  user?: { email?: string; }
}) {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Analytics', href: '/secure', icon: BarChart3 },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Notifications', href: '#', icon: Bell },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-2xl shadow-2xl rounded-r-2xl border-r border-slate-200/80"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-3">
               <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                TagSync
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto thin-scrollbar">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 text-slate-700 font-medium hover:text-white hover:bg-purple-500 rounded-xl transition-all duration-300 group"
              >
                <item.icon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200/80">
             <a href="/dashboard/settings" className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-slate-200/50 transition-colors group">
              <div className="w-10 h-10 bg-slate-200/50 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate group-hover:text-purple-700">
                  {user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  Profile & Settings
                </p>
              </div>
            </a>
            <form action="/api/Auth/signout" method="post" className="mt-2">
              <button type="submit" className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-500/10 transition-colors flex items-center gap-3 rounded-lg" role="menuitem">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}


export default function SecuredLayout({ children, user }: SecuredLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const mainNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Analytics', href: '/secure', icon: BarChart3 },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Notifications', href: '#', icon: Bell },
  ];

  return (
    <>
    <GlobalStyles />
    <div className="h-screen overflow-hidden flex text-slate-700 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 240 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 h-screen bg-white/30 backdrop-blur-xl border-r border-white/40"
      >
        <div className="flex items-center justify-between h-16 px-6">
            {!sidebarCollapsed && (
                 <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    TagSync
                </span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-white/40 transition-colors"
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 text-slate-600" />
              ) : (
                <PanelLeftClose className="w-5 h-5 text-slate-600" />
              )}
            </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto thin-scrollbar">
          {mainNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 text-slate-600 hover:text-purple-700 hover:bg-white/40 rounded-xl transition-all duration-300 group ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? item.name : undefined}
            >
              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-purple-500 transition-colors flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="font-medium truncate">{item.name}</span>
              )}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-white/40">
          <a href="/dashboard/settings" className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/40 group transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`} title={sidebarCollapsed ? 'Profile & Settings' : undefined}>
            <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate group-hover:text-purple-700">
                  {user?.email?.split("@")[0] || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  Profile & Settings
                </p>
              </div>
            )}
          </a>
           <form action="/api/Auth/signout" method="post" className="mt-2">
              <button type="submit" className={`w-full text-left px-3 py-3 text-sm text-red-600 hover:bg-red-500/10 transition-colors flex items-center gap-3 rounded-lg group ${sidebarCollapsed ? 'justify-center' : ''}`} role="menuitem" title={sidebarCollapsed ? 'Logout' : undefined}>
                <LogOut className="w-5 h-5 flex-shrink-0" />
                 {!sidebarCollapsed && (
                    <span className="font-medium truncate">Logout</span>
                 )}
              </button>
            </form>
        </div>
      </motion.div>
      
      <div className="lg:hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          user={user} 
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <motion.button
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-14 h-14 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-xl shadow-lg hover:bg-white/90 transition-colors fixed bottom-6 left-6 z-10"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-slate-600" />
        </motion.button>
        <main className="flex-1 overflow-y-auto thin-scrollbar">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
