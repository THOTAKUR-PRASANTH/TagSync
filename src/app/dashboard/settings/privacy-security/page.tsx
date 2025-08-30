"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff, Shield, Palette, Check, X, Lock, Key, Smartphone, Info, Zap, Activity, Clock } from 'lucide-react';

interface PasswordSettingsProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function  PasswordSettings({ user }: PasswordSettingsProps)
{
  const [theme, setTheme] = useState(1); // Default to Arctic Glass (index 1)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const themes = [
    { name: 'Cyber Neon', bg: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900', card: 'bg-white/5 border-purple-500/20 backdrop-blur-2xl', cardHover: 'hover:bg-white/10 hover:border-purple-400/30', text: 'text-white', textSecondary: 'text-purple-200', accent: 'from-purple-500 via-pink-500 to-cyan-500', accentSolid: 'bg-purple-500', particles: 'bg-purple-400', glow: 'shadow-purple-500/20', input: 'bg-black/20 border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20' },
    { name: 'Arctic Glass', bg: 'bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50', card: 'bg-white/40 border-white/60 backdrop-blur-2xl', cardHover: 'hover:bg-white/60 hover:border-white/80', text: 'text-slate-800', textSecondary: 'text-slate-600', accent: 'from-blue-500 via-cyan-500 to-indigo-500', accentSolid: 'bg-blue-500', particles: 'bg-blue-300', glow: 'shadow-blue-500/20', input: 'bg-white/30 border-blue-300/50 focus:border-blue-400 focus:ring-blue-400/20' },
    { name: 'Sunset Bloom', bg: 'bg-gradient-to-br from-rose-100 via-orange-50 to-pink-100', card: 'bg-white/50 border-orange-200/80 backdrop-blur-2xl', cardHover: 'hover:bg-white/70 hover:border-orange-300', text: 'text-slate-900', textSecondary: 'text-orange-800', accent: 'from-orange-400 via-rose-500 to-pink-500', accentSolid: 'bg-orange-500', particles: 'bg-orange-300', glow: 'shadow-orange-500/20', input: 'bg-white/40 border-orange-300/60 focus:border-orange-400 focus:ring-orange-400/20' },
    { name: 'Emerald Mist', bg: 'bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900', card: 'bg-emerald-500/10 border-emerald-400/30 backdrop-blur-2xl', cardHover: 'hover:bg-emerald-500/20 hover:border-emerald-400/50', text: 'text-emerald-50', textSecondary: 'text-emerald-200', accent: 'from-emerald-400 via-teal-400 to-cyan-400', accentSolid: 'bg-emerald-500', particles: 'bg-emerald-300', glow: 'shadow-emerald-500/20', input: 'bg-emerald-900/30 border-emerald-400/30 focus:border-emerald-400 focus:ring-emerald-400/20' },
    { name: 'Midnight Aurora', bg: 'bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950', card: 'bg-white/5 border-indigo-400/20 backdrop-blur-2xl', cardHover: 'hover:bg-white/10 hover:border-indigo-400/40', text: 'text-white', textSecondary: 'text-indigo-200', accent: 'from-indigo-400 via-purple-400 to-pink-400', accentSolid: 'bg-indigo-500', particles: 'bg-indigo-300', glow: 'shadow-indigo-500/20', input: 'bg-black/30 border-indigo-400/30 focus:border-indigo-400 focus:ring-indigo-400/20' }
  ];

  const currentTheme = themes[theme];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(newPassword));
  }, [newPassword]);

  const getStrengthColor = () => {
    if (passwordStrength < 30) return 'from-red-500 to-red-600';
    if (passwordStrength < 60) return 'from-yellow-500 to-orange-500';
    if (passwordStrength < 80) return 'from-blue-500 to-cyan-500';
    return 'from-green-500 to-emerald-500';
  };

  const getStrengthText = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Fair';
    if (passwordStrength < 80) return 'Good';
    return 'Strong';
  };
  
  const cycleTheme = () => setTheme((prev) => (prev + 1) % themes.length);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log('Password update submitted'); };

  return (
    // FIXES APPLIED HERE:
    // 1. Changed `h-screen` to `min-h-screen` to allow the container to grow.
    // 2. Removed `overflow-hidden` to enable scrolling.
    <div className={`min-h-screen w-full relative transition-all duration-1000 ${currentTheme.bg}`}>
      
      {/* Background Elements (No changes needed here) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse opacity-25 ${currentTheme.particles}`} style={{ animationDuration: '6s' }} />
        <div className={`absolute bottom-20 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse opacity-20 ${currentTheme.particles}`} style={{ animationDelay: '3s', animationDuration: '8s' }} />
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`absolute w-1.5 h-1.5 rounded-full animate-bounce ${currentTheme.particles} opacity-50`} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s`, animationDuration: `${3 + Math.random() * 3}s` }} />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button onClick={() => window.history.back()} className={`flex items-center space-x-2 px-4 py-2 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 group ${currentTheme.card} ${currentTheme.cardHover} ${currentTheme.text} shadow-lg ${currentTheme.glow}`}>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold text-sm">Back to Settings</span>
          </button>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-lg ${currentTheme.card} border font-medium text-sm ${currentTheme.textSecondary}`}>{currentTheme.name}</div>
            <button onClick={cycleTheme} className={`p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 active:scale-95 group ${currentTheme.card} ${currentTheme.cardHover} ${currentTheme.text} shadow-lg ${currentTheme.glow}`}>
              <Palette className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {/* Added `pb-8` to give some extra space at the bottom on mobile */}
      <main className="relative z-10 px-4 pb-8">
        <div className={`max-w-7xl mx-auto h-full border transition-all duration-1000 rounded-2xl shadow-2xl transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${currentTheme.card} ${currentTheme.glow}`}>
          <div className="p-4 sm:p-6 h-full flex flex-col">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 transition-all duration-500 hover:scale-110 bg-gradient-to-br ${currentTheme.accent} shadow-xl ${currentTheme.glow}`}>
                <Shield className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <h1 className={`text-2xl font-bold mb-1 ${currentTheme.text} drop-shadow-sm`}>Password & Security</h1>
              <p className={`text-base ${currentTheme.textSecondary}`}>Manage your password and keep your account secure.</p>
            </div>

            <div className="flex-1 flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className={`block font-semibold text-sm ${currentTheme.text}`}><Lock className="w-4 h-4 inline mr-2" />Current Password</label>
                  <div className="relative group">
                    <input type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 group-hover:scale-[1.02] ${currentTheme.input} ${currentTheme.text} placeholder-opacity-60 text-sm font-medium shadow-md`} placeholder="Enter current password"/>
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 ${currentTheme.textSecondary}`}>
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {/* New Password */}
                <div className="space-y-2">
                  <label className={`block font-semibold text-sm ${currentTheme.text}`}><Key className="w-4 h-4 inline mr-2" />New Password</label>
                  <div className="relative group">
                    <input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 group-hover:scale-[1.02] ${currentTheme.input} ${currentTheme.text} placeholder-opacity-60 text-sm font-medium shadow-md`} placeholder="Enter new password"/>
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 ${currentTheme.textSecondary}`}>
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className={`block font-semibold text-sm ${currentTheme.text}`}><Key className="w-4 h-4 inline mr-2" />Confirm Password</label>
                  <div className="relative group">
                    <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 group-hover:scale-[1.02] ${currentTheme.input} ${currentTheme.text} placeholder-opacity-60 text-sm font-medium shadow-md`} placeholder="Confirm new password"/>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {confirmPassword && <div className="transition-all duration-300">{newPassword === confirmPassword ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</div>}
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={`transition-all duration-300 hover:scale-125 ${currentTheme.textSecondary}`}>
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {newPassword && (
                  <div className="space-y-3 p-4 rounded-xl border" style={{ backgroundColor: currentTheme.card.split(' ')[0] + '/50' }}>
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold text-sm ${currentTheme.textSecondary}`}>Password Strength</span>
                      <span className={`font-bold text-sm px-2 py-0.5 rounded-md ${passwordStrength < 30 ? 'text-red-500 bg-red-500/10' : passwordStrength < 60 ? 'text-yellow-500 bg-yellow-500/10' : passwordStrength < 80 ? 'text-blue-500 bg-blue-500/10' : 'text-green-500 bg-green-500/10'}`}>{getStrengthText()}</span>
                    </div>
                    <div className={`relative h-2.5 rounded-full overflow-hidden ${currentTheme.card} shadow-inner border`}>
                      <div className={`h-full bg-gradient-to-r ${getStrengthColor()} transition-all duration-1000 ease-out`} style={{ width: `${passwordStrength}%` }} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-semibold">
                      {[
                        { label: 'Mixed Case', valid: /^(?=.*[a-z])(?=.*[A-Z])/.test(newPassword) },
                        { label: '8+ Characters', valid: newPassword.length >= 8 },
                        { label: 'Numbers', valid: /[0-9]/.test(newPassword) },
                        { label: 'Symbols', valid: /[^A-Za-z0-9]/.test(newPassword) }
                      ].map(rule => (
                        <div key={rule.label} className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${rule.valid ? 'text-green-500 bg-green-500/10 border border-green-500/20' : `${currentTheme.textSecondary} ${currentTheme.card} border`}`}>
                          {rule.valid ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>{rule.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-center pt-2">
                  <button onClick={handleSubmit} className={`px-10 py-3 rounded-xl font-bold text-base transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl bg-gradient-to-r ${currentTheme.accent} text-white hover:brightness-110 ${currentTheme.glow}`}>
                    <Shield className="w-5 h-5 inline mr-2" />Update Password
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                {/* Two-Factor Authentication */}
                <div className={`p-5 rounded-xl border transition-all duration-500 hover:scale-[1.02] ${currentTheme.card} ${currentTheme.cardHover} shadow-lg ${currentTheme.glow} flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg shadow-md ${twoFactorEnabled ? 'bg-gradient-to-br from-green-500 to-emerald-600' : `${currentTheme.card} border`}`}><Smartphone className={`w-5 h-5 ${twoFactorEnabled ? 'text-white' : currentTheme.text}`} /></div>
                        <div>
                          <h3 className={`font-bold text-base ${currentTheme.text}`}>Two-Factor Auth</h3>
                          <p className={`text-xs ${currentTheme.textSecondary}`}>Enhanced security</p>
                        </div>
                      </div>
                      <button type="button" onClick={() => setTwoFactorEnabled(!twoFactorEnabled)} className={`relative w-12 h-6 rounded-full transition-colors duration-300 shadow-inner ${twoFactorEnabled ? 'bg-gradient-to-r from-green-500 to-emerald-600' : `${currentTheme.card} border`}`}>
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-300 ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>
                  <div className={`w-full p-2 rounded-lg ${currentTheme.card} border`}>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-yellow-500" />
                      <span className={`text-xs font-medium ${currentTheme.textSecondary}`}>{twoFactorEnabled ? '2FA is Active' : 'Enable 2FA for protection'}</span>
                    </div>
                  </div>
                </div>
                {/* Last Login Activity */}
                <div className={`p-5 rounded-xl border transition-all duration-500 hover:scale-[1.02] ${currentTheme.card} ${currentTheme.cardHover} shadow-lg ${currentTheme.glow} flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-lg ${currentTheme.card} border shadow-md`}><Activity className={`w-5 h-5 ${currentTheme.text}`} /></div>
                      <div>
                        <h4 className={`font-bold text-base ${currentTheme.text}`}>Last Login</h4>
                        <p className={`text-xs ${currentTheme.textSecondary}`}>Recent account access</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className={`flex justify-between items-center p-2 rounded-md ${currentTheme.card} border`}><span className={`font-semibold ${currentTheme.textSecondary}`}>IP Address:</span><span className={`font-mono ${currentTheme.text}`}>192.168.1.100</span></div>
                      <div className={`flex justify-between items-center p-2 rounded-md ${currentTheme.card} border`}><span className={`font-semibold ${currentTheme.textSecondary}`}>Location:</span><span className={currentTheme.text}>San Francisco, CA</span></div>
                      <div className={`flex justify-between items-center p-2 rounded-md ${currentTheme.card} border`}><span className={`font-semibold ${currentTheme.textSecondary}`}>Device:</span><span className={currentTheme.text}>Chrome/macOS</span></div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 p-2 mt-3 rounded-lg bg-green-500/10 border border-green-500/20`}>
                    <Clock className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs font-medium text-green-500">2 hours ago</span>
                  </div>
                </div>
                {/* Security Best Practices */}
                <div className={`p-5 rounded-xl border transition-all duration-500 hover:scale-[1.02] ${currentTheme.card} ${currentTheme.cardHover} shadow-lg ${currentTheme.glow} flex flex-col justify-between`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-lg ${currentTheme.card} border shadow-md`}><Info className={`w-5 h-5 ${currentTheme.text}`} /></div>
                      <div>
                        <h4 className={`font-bold text-base ${currentTheme.text}`}>Security Tips</h4>
                        <p className={`text-xs ${currentTheme.textSecondary}`}>Stay protected online</p>
                      </div>
                    </div>
                    <div className="space-y-2 flex-1">
                      {[
                        { text: 'Use unique passwords for each account', color: 'green' },
                        { text: 'Enable two-factor authentication', color: 'yellow' },
                        { text: 'Keep your devices and apps updated', color: 'blue' }
                      ].map(tip => (
                        <div key={tip.text} className={`flex items-center gap-2 p-2 rounded-lg bg-${tip.color}-500/10 border border-${tip.color}-500/20`}>
                          <Check className={`w-4 h-4 text-${tip.color}-500 flex-shrink-0`} />
                          <span className={`text-xs font-medium text-${tip.color}-500`}>{tip.text}</span>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

