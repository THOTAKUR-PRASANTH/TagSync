"use client";
import React, { useState } from 'react';
import { Globe, MapPin, Sun, Moon, Save, Edit2, Check, X, Navigation } from 'lucide-react';

const LanguageRegionSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState<{[key: string]: boolean}>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [settings, setSettings] = useState({
    interfaceLanguage: 'English',
    contentLanguage: 'English',
    currentLocation: 'Vijayawada, Andhra Pradesh',
    autoDetectLocation: false,
    region: 'India',
    state: 'Andhra Pradesh'
  });

  const languages = ['English', 'Telugu', 'Hindi', 'Tamil', 'Kannada', 'Malayalam'];
  const regions = ['India', 'United States', 'United Kingdom', 'Australia', 'Canada'];
  const statesByRegion: {[key: string]: string[]} = {
    'India': ['Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Bihar', 'Odisha', 'Madhya Pradesh', 'Haryana', 'Punjab', 'Jharkhand', 'Assam', 'Himachal Pradesh', 'Uttarakhand', 'Goa', 'Manipur', 'Meghalaya', 'Tripura', 'Nagaland', 'Mizoram', 'Arunachal Pradesh', 'Sikkim', 'Delhi', 'Chandigarh', 'Puducherry'],
    'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan', 'New Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts', 'Tennessee', 'Indiana', 'Missouri', 'Maryland', 'Wisconsin'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island', 'Northwest Territories', 'Nunavut', 'Yukon']
  };

  const handleEdit = (field: string) => {
    setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = (field: string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev, [field]: value };
      if (field === 'region' && value !== prev.region) {
        newSettings.state = statesByRegion[value]?.[0] || '';
      }
      return newSettings;
    });
    setIsEditing(prev => ({ ...prev, [field]: false }));
  };

  const handleGlobalSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const SettingCard = ({
    icon: Icon,
    title,
    description,
    field,
    options,
    value,
    isToggle = false
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    field: string;
    options?: string[];
    value: any;
    isToggle?: boolean;
  }) => (
    <div className={`group relative overflow-hidden rounded-xl p-5 sm:p-6 transition-all duration-500 hover:scale-[1.02] ${
      darkMode 
        ? 'bg-gray-700/30 border border-gray-600/40 hover:bg-gray-600/40 hover:border-gray-500/50' 
        : 'bg-white/35 border border-white/60 hover:bg-white/45 hover:border-white/70'
    } backdrop-blur-xl shadow-lg hover:shadow-2xl`}>
      {darkMode && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      )}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`p-3 rounded-xl flex-shrink-0 ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/10' 
                : 'bg-gradient-to-br from-blue-400/30 to-purple-400/30'
            } backdrop-blur-sm`}>
              <Icon className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={`font-semibold text-base ${darkMode ? 'text-gray-100' : 'text-gray-800'} truncate`}>{title}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>{description}</p>
            </div>
          </div>
          {!isToggle && (
            <button
              onClick={() => handleEdit(field)}
              className={`p-2.5 rounded-lg transition-all duration-300 flex-shrink-0 ml-3 ${
                isEditing[field] 
                  ? `${darkMode ? 'bg-red-500/20 text-red-300 shadow-lg shadow-red-500/10' : 'bg-red-400/20 text-red-600'}` 
                  : `${darkMode ? 'bg-gray-600/40 hover:bg-gray-500/50 text-gray-300 hover:shadow-lg hover:shadow-white/5' : 'bg-white/30 hover:bg-white/50 text-gray-600'}`
              }`}
            >
              {isEditing[field] ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
            </button>
          )}
        </div>
        {isToggle ? (
          <div className="flex items-center justify-between">
            <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {value ? 'Enabled' : 'Disabled'}
            </span>
            <button
              onClick={() => handleSave(field, !value)}
              className={`relative w-14 h-7 rounded-full transition-all duration-500 ${
                value 
                  ? `bg-gradient-to-r from-blue-500 to-purple-500 ${darkMode ? 'shadow-lg shadow-blue-500/20' : ''}` 
                  : `${darkMode ? 'bg-gray-600 shadow-inner' : 'bg-gray-300'}`
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-lg ${
                darkMode && value ? 'shadow-white/30' : ''
              } ${value ? 'left-8' : 'left-1'}`} />
            </button>
          </div>
        ) : isEditing[field] ? (
          <div className="space-y-3">
            <select
              value={value}
              onChange={(e) => handleSave(field, e.target.value)}
              className={`w-full p-3 rounded-xl border transition-all duration-300 text-sm ${
                darkMode 
                  ? 'bg-gray-800/60 border-gray-500/40 text-gray-100 focus:border-blue-400 shadow-lg shadow-black/20' 
                  : 'bg-white/60 border-white/70 text-gray-800 focus:border-blue-500'
              } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40`}
            >
              {options?.map(option => (
                <option key={option} value={option} className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                  {option}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleSave(field, value)}
              className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-sm ${
                darkMode ? 'shadow-lg shadow-green-500/20' : ''
              }`}
            >
              <Check className="w-4 h-4" />
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className={`font-medium text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'} truncate flex-1`}>
              {value}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full ml-3 flex-shrink-0 ${
              darkMode ? 'bg-blue-500/20 text-blue-300 shadow-inner' : 'bg-blue-400/25 text-blue-600'
            }`}>
              Active
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20' // match SettingsClient dark theme
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {darkMode ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse transition-all duration-700 bg-purple-500 opacity-10" style={{ animationDelay: '0s', animationDuration: '4s' }} />
            <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse transition-all duration-700 bg-pink-500 opacity-10" style={{ animationDelay: '2s', animationDuration: '4s' }} />
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse transition-all duration-700 bg-blue-500 opacity-10" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          </>
        ) : (
          <>
            <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse bg-blue-400" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse bg-purple-400" style={{ animationDelay: '2s' }} />
          </>
        )}
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Thin Header Navbar */}
        <div className={`rounded-xl p-4 sm:p-5 mb-6 transition-all duration-700 ${
          darkMode 
            ? 'bg-gray-800/50 border border-gray-700/50 shadow-2xl' // match SettingsClient card
            : 'bg-white/30 border border-white/60'
        } backdrop-blur-2xl shadow-xl`}>
          {darkMode && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/3 to-white/8 rounded-xl" />
          )}
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br backdrop-blur-sm transform transition-all duration-500 hover:rotate-6 hover:scale-110 ${
                darkMode 
                  ? 'from-blue-500/25 to-purple-500/25 shadow-xl shadow-blue-500/15' 
                  : 'from-blue-400/35 to-purple-400/35'
              }`}>
                <Globe className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  Language & Location
                </h1>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Customize your regional preferences
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-lg transition-all duration-700 transform hover:scale-110 ${
                  darkMode 
                    ? 'bg-yellow-500/25 text-yellow-300 hover:bg-yellow-500/35 hover:rotate-12 shadow-lg shadow-yellow-500/15' 
                    : 'bg-indigo-500/25 text-indigo-600 hover:bg-indigo-500/35 hover:rotate-12'
                } backdrop-blur-sm`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                onClick={handleGlobalSave}
                disabled={isSaving}
                className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r rounded-lg transition-all duration-500 text-sm font-medium relative overflow-hidden ${
                  saveSuccess 
                    ? 'from-green-500 to-emerald-500' 
                    : 'from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                } text-white ${
                  !isSaving && !saveSuccess ? 'hover:scale-105' : ''
                } ${darkMode ? 'shadow-xl shadow-blue-500/25' : 'shadow-lg'}`}
              >
                {isSaving && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-400/50 animate-pulse" />
                )}
                <div className={`flex items-center gap-2 transition-all duration-300 ${
                  isSaving ? 'animate-pulse' : ''
                }`}>
                  {saveSuccess ? (
                    <Check className="w-4 h-4 animate-bounce" />
                  ) : (
                    <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
                  )}
                  {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Language Preferences */}
            <div className={`rounded-2xl p-6 sm:p-7 transition-all duration-700 ${
              darkMode 
                ? 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/60 shadow-xl' // match SettingsClient card
                : 'bg-white/30 border border-white/60 hover:bg-white/40'
            } backdrop-blur-2xl shadow-lg hover:shadow-2xl`}>
              {darkMode && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/4 to-transparent rounded-2xl" />
              )}
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br backdrop-blur-sm transition-transform duration-500 hover:rotate-3 ${
                    darkMode ? 'from-emerald-500/25 to-teal-500/25 shadow-xl shadow-emerald-500/15' : 'from-emerald-400/35 to-teal-400/35'
                  }`}>
                    <Globe className={`w-6 h-6 ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`} />
                  </div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    🌐 Language Preferences
                  </h2>
                </div>
                <div className="space-y-4">
                  <SettingCard
                    icon={Globe}
                    title="Interface Language"
                    description="Primary language for dashboard UI and navigation"
                    field="interfaceLanguage"
                    options={languages}
                    value={settings.interfaceLanguage}
                  />
                  <SettingCard
                    icon={Globe}
                    title="Content Language"
                    description="Language for messages, notifications and help content"
                    field="contentLanguage"
                    options={languages}
                    value={settings.contentLanguage}
                  />
                </div>
              </div>
            </div>
            {/* Location Settings */}
            <div className={`rounded-2xl p-6 sm:p-7 transition-all duration-700 ${
              darkMode 
                ? 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/60 shadow-xl' // match SettingsClient card
                : 'bg-white/30 border border-white/60 hover:bg-white/40'
            } backdrop-blur-2xl shadow-lg hover:shadow-2xl`}>
              {darkMode && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/4 to-transparent rounded-2xl" />
              )}
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br backdrop-blur-sm transition-transform duration-500 hover:rotate-3 ${
                    darkMode ? 'from-violet-500/25 to-fuchsia-500/25 shadow-xl shadow-violet-500/15' : 'from-violet-400/35 to-fuchsia-400/35'
                  }`}>
                    <MapPin className={`w-6 h-6 ${darkMode ? 'text-violet-300' : 'text-violet-600'}`} />
                  </div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    📍 Location Settings
                  </h2>
                </div>
                <div className="space-y-4">
                  <SettingCard
                    icon={Navigation}
                    title="Auto-detect Location"
                    description="Automatically detect location using device services"
                    field="autoDetectLocation"
                    value={settings.autoDetectLocation}
                    isToggle={true}
                  />
                  <SettingCard
                    icon={MapPin}
                    title="Current Region"
                    description="Select your primary country or region"
                    field="region"
                    options={regions}
                    value={settings.region}
                  />
                  <SettingCard
                    icon={Globe}
                    title="State/Province"
                    description={`Select your state within ${settings.region}`}
                    field="state"
                    options={statesByRegion[settings.region] || []}
                    value={settings.state}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Preview Section */}
          <div className={`mt-6 sm:mt-8 rounded-2xl p-6 sm:p-7 transition-all duration-700 ${
            darkMode 
              ? 'bg-gray-800/50 border border-gray-700/50 shadow-xl' // match SettingsClient card
              : 'bg-white/30 border border-white/60'
          } backdrop-blur-2xl shadow-lg`}>
            {darkMode && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/4 to-transparent rounded-2xl" />
            )}
            <div className="relative">
              <h2 className={`text-xl font-bold mb-5 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                ✨ Current Configuration
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-xl transition-all duration-500 hover:scale-105 ${
                  darkMode ? 'bg-gray-600/30 hover:bg-gray-600/40 shadow-lg shadow-black/10' : 'bg-white/35 hover:bg-white/45'
                } backdrop-blur-sm`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Interface</p>
                  <p className={`font-semibold text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {settings.interfaceLanguage}
                  </p>
                </div>
                <div className={`p-4 rounded-xl transition-all duration-500 hover:scale-105 ${
                  darkMode ? 'bg-gray-600/30 hover:bg-gray-600/40 shadow-lg shadow-black/10' : 'bg-white/35 hover:bg-white/45'
                } backdrop-blur-sm`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Content</p>
                  <p className={`font-semibold text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {settings.contentLanguage}
                  </p>
                </div>
                <div className={`p-4 rounded-xl transition-all duration-500 hover:scale-105 ${
                  darkMode ? 'bg-gray-600/30 hover:bg-gray-600/40 shadow-lg shadow-black/10' : 'bg-white/35 hover:bg-white/45'
                } backdrop-blur-sm`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Region</p>
                  <p className={`font-semibold text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'} truncate`}>
                    {settings.region}
                  </p>
                </div>
                <div className={`p-4 rounded-xl transition-all duration-500 hover:scale-105 ${
                  darkMode ? 'bg-gray-600/30 hover:bg-gray-600/40 shadow-lg shadow-black/10' : 'bg-white/35 hover:bg-white/45'
                } backdrop-blur-sm`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>State</p>
                  <p className={`font-semibold text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'} truncate`}>
                    {settings.state}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Current Location Display */}
          <div className={`mt-5 rounded-xl p-5 transition-all duration-700 hover:scale-[1.01] ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 shadow-lg shadow-purple-700/10' // match SettingsClient accent
              : 'bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/40'
          } backdrop-blur-xl`}>
            {darkMode && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/3 rounded-xl" />
            )}
            <div className="relative flex items-center gap-3">
              <div className={`p-2.5 rounded-lg transition-transform duration-500 hover:rotate-12 ${
                darkMode ? 'bg-blue-500/25 shadow-lg shadow-blue-500/15' : 'bg-cyan-400/35'
              }`}>
                <MapPin className={`w-5 h-5 ${darkMode ? 'text-blue-300' : 'text-cyan-600'}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  📍 Current Location: {settings.currentLocation}
                </p>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {settings.autoDetectLocation ? 'Auto-detected location' : 'Manually set location'} • {settings.region}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
        @keyframes saveSuccess {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes slideIn {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LanguageRegionSettings;