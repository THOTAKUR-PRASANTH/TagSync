"use client";
import React, { useState, useEffect } from 'react';
import { User, Phone, Calendar, Upload, Save, Check, Camera, Moon, Sun, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';



type InputFieldProps = {
  icon: React.ReactElement<any>;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  darkMode: boolean;
  delay?: number;
  required?: boolean;
};

const InputField = ({
  icon,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  darkMode,
  delay = 0,
  required = false
}: InputFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative transition-all duration-500 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <label className={`block text-sm font-semibold mb-2 transition-colors duration-300
        ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className={`relative group`}>
        <div className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-all duration-300
          ${isFocused 
            ? (darkMode ? 'text-purple-400' : 'text-purple-600') 
            : (darkMode ? 'text-gray-400' : 'text-slate-500')
          }`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-11 pr-3 py-3 rounded-xl border-2 transition-all duration-300
            backdrop-blur-lg font-medium text-sm
            ${darkMode 
              ? 'bg-gray-800/40 border-gray-700/50 text-gray-100 placeholder-gray-500' 
              : 'bg-white/40 border-white/60 text-slate-900 placeholder-slate-500'
            }
            ${isFocused 
              ? (darkMode 
                  ? 'border-purple-500/60 bg-gray-800/60 shadow-lg shadow-purple-500/10' 
                  : 'border-purple-500/60 bg-white/60 shadow-lg shadow-purple-500/10'
                ) 
              : (darkMode ? 'hover:border-gray-600/70' : 'hover:border-white')
            }
            focus:outline-none focus:ring-0`}
          required={required}
        />
        
        <div className={`absolute bottom-0 left-0 h-0.5
          transform origin-left transition-all duration-300
          ${isFocused ? 'scale-x-100' : 'scale-x-0'}
          ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`} />
      </div>
    </div>
  );
};

const SelectField = ({ 
  icon, 
  label, 
  value, 
  onChange, 
  options, 
  darkMode, 
  delay = 0,
  required = false 
}: {
  icon: React.ReactElement<any>;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  darkMode: boolean;
  delay?: number;
  required?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative transition-all duration-500 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <label className={`block text-sm font-semibold mb-2 transition-colors duration-300
        ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative group">
        <div className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 transition-all duration-300
          ${isFocused 
            ? (darkMode ? 'text-purple-400' : 'text-purple-600') 
            : (darkMode ? 'text-gray-400' : 'text-slate-500')
          }`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 transition-all duration-300
            backdrop-blur-lg font-medium appearance-none cursor-pointer text-sm
            ${darkMode 
              ? 'bg-gray-800/40 border-gray-700/50 text-gray-100' 
              : 'bg-white/40 border-white/60 text-slate-900'
            }
            ${isFocused 
              ? (darkMode 
                  ? 'border-purple-500/60 bg-gray-800/60 shadow-lg shadow-purple-500/10' 
                  : 'border-purple-500/60 bg-white/60 shadow-lg shadow-purple-500/10'
                ) 
              : (darkMode ? 'hover:border-gray-600/70' : 'hover:border-white')
            }
            focus:outline-none focus:ring-0`}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className={darkMode ? 'bg-gray-800' : 'bg-white'}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className={`absolute bottom-0 left-0 h-0.5
          transform origin-left transition-all duration-300
          ${isFocused ? 'scale-x-100' : 'scale-x-0'}
          ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`} />
      </div>
    </div>
  );
};

const AvatarUpload = ({ darkMode, currentAvatar, onAvatarChange, userName }: {
  darkMode: boolean;
  currentAvatar: string;
  onAvatarChange: (url: string) => void;
  userName: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState(currentAvatar);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPreview(currentAvatar);
  }, [currentAvatar]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      // Create a preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      // Upload to your server or ImageKit
      const formData = new FormData();
      formData.append('file', file);
      formData.append('username', userName || 'user');
      
      const response = await fetch('/api/updateimg', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.url) {
          setPreview(result.url);
          onAvatarChange(result.url);
        } else {
          throw new Error('No URL received from upload');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      
      // Show user-friendly error message
      if (errorMessage.includes('File too large')) {
        alert('Image is too large. Please select an image smaller than 5MB.');
      } else if (errorMessage.includes('Invalid file type')) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP).');
      } else if (errorMessage.includes('ImageKit not configured')) {
        alert('Image upload service is currently unavailable. Please try again later.');
      } else {
        alert(`Upload failed: ${errorMessage}. Please try again.`);
      }
      
      // Revert to previous preview
      setPreview(currentAvatar);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`relative text-center transition-all duration-500 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <label className={`block text-sm font-semibold mb-3 transition-colors duration-300
        ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
        Profile Picture
      </label>
      
      <div className="relative inline-block group">
        <div
          className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer transition-all duration-300 shadow-lg"
        >
          {preview ? (
            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-white text-4xl font-bold
              ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-200 to-gray-300 text-slate-600'}`}>
              {userName ? userName.charAt(0).toUpperCase() : 'dora'}
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 flex items-center justify-center">
            <Camera className="w-8 h-8 text-white" />
          </div>

          {/* Custom file input */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          {/* Upload indicator */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>

        <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-md
          hover:scale-110 transition-transform duration-300
          ${darkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
          <Upload className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

const contentFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

export default function ProfileEditForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    phone: "",
    gender: "",
    dob: "",
    avatar_url: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  // Fetch current user details from route on mount
  useEffect(() => {
    async function fetchDetails() {
      const res = await fetch('/dashboard/settings/edit-profile/update', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        if (data.userDetails) {
          setFormData({
            username: data.userDetails.username || "",
            name: data.userDetails.name || "",
            phone: data.userDetails.phone || "",
            gender: data.userDetails.gender || "",
            dob: data.userDetails.dob || "",
            avatar_url: data.userDetails.avatar_url || ""
          });
        }
      }
    }
    fetchDetails();
  }, []);

  // Validate form fields
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }
    
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Full name must be at least 2 characters";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.gender) {
      errors.gender = "Please select your gender";
    }
    
    if (!formData.dob) {
      errors.dob = "Date of birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 120) {
        errors.dob = "Age must be between 13 and 120 years";
      }
    }
    
    if (!formData.avatar_url) {
      errors.avatar_url = "Profile picture is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    // Validate form before saving
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/dashboard/settings/edit-profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        // Clear validation errors on success
        setValidationErrors({});
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert(`Failed to save profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className={`min-h-screen w-full relative transition-all duration-700 font-sans
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

      <div className="relative w-full px-4 sm:px-6 py-8">
        <div className="flex justify-between items-center mb-6">
        <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wider
             text-purple-600 uppercase bg-white/40 backdrop-blur-xl 
             rounded-full border border-purple-300/50 
             shadow-md shadow-purple-500/10 transition-all duration-300 hover:bg-white/60 
             hover:shadow-purple-500/30 active:scale-95 sm:px-6 sm:py-2 cursor-pointer"
          >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Settings
        </button>



          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full backdrop-blur-lg shadow-md transition-all duration-300 
              hover:scale-110 active:scale-95 group
              ${darkMode 
                ? 'bg-gray-800/50 hover:bg-gray-800/70' 
                : 'bg-white/50 hover:bg-white/70'
              }`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 group-hover:text-slate-800" />
            )}
          </button>
        </div>

        {/* Animated Edit Profile Header */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={contentFadeIn}
  className="text-center space-y-4 mb-10"
>
  <div>
    <span className="inline-block px-6 py-2 text-sm font-medium tracking-wider text-purple-600 uppercase bg-white/40 backdrop-blur-xl rounded-full border border-purple-300/50 shadow-lg shadow-purple-500/10">
      Profile Settings
    </span>
  </div>

  <h1 className="text-1xl sm:text-5xl md:text-1xl lg:text-4xl font-bold">
    <span className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-text ${darkMode ? 'text-white' : ''}`}>
      Edit   
    </span>{' '}
    <span className={`bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-transparent bg-clip-text animate-gradient-text ${darkMode ? 'text-white' : ''}`}>
      Profile
    </span>
  </h1>

  <p className={`text-md transition-colors duration-500 ${
    darkMode ? 'text-white' : 'text-slate-600'
  }`}>
    Keep your personal information up-to-date
  </p>
</motion.div>


        <div className={`backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-500
          mx-auto max-w-4xl hover:shadow-2xl hover:scale-[1.01]
          ${darkMode 
            ? 'bg-gray-800/50 border border-gray-700/50' 
            : 'bg-white/30 border border-white/40'
          }`}>
          
          <div className="mb-10 flex justify-center">
            <AvatarUpload 
              darkMode={darkMode}
              currentAvatar={formData.avatar_url}
              onAvatarChange={(url) => setFormData({...formData, avatar_url: url})}
              userName={formData.name}
            />
            {validationErrors.avatar_url && (
              <div className="text-red-500 text-sm mt-2">{validationErrors.avatar_url}</div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
            <InputField
              icon={<User />} 
              label="Username" 
              value={formData.username}
              onChange={(value) => setFormData({...formData, username: value})}
              placeholder="e.g., Dora" 
              darkMode={darkMode} 
              delay={200} 
              required 
            />
            {validationErrors.username && (
              <div className="text-red-500 text-sm mt-1">{validationErrors.username}</div>
            )}
            
            <InputField
              icon={<User />} 
              label="Full Name" 
              value={formData.name}
              onChange={(value) => setFormData({...formData, name: value})}
              placeholder="e.g., Dora Buji" 
              darkMode={darkMode} 
              delay={300} 
              required 
            />
            {validationErrors.name && (
              <div className="text-red-500 text-sm mt-1">{validationErrors.name}</div>
            )}
            
                           <InputField
                 icon={<Phone />} 
                 label="Phone Number" 
                 type="tel" 
                 value={formData.phone}
                 onChange={(value) => setFormData({...formData, phone: value})}
                 placeholder="(+91) 1234567890 (Optional)" 
                 darkMode={darkMode} 
                 delay={400}
               />
            {validationErrors.phone && (
              <div className="text-red-500 text-sm mt-1">{validationErrors.phone}</div>
            )}
            
            <SelectField
              icon={<User />} 
              label="Gender" 
              value={formData.gender}
              onChange={(value) => setFormData({...formData, gender: value})}
              options={genderOptions} 
              darkMode={darkMode} 
              delay={500}
              required
            />
            {validationErrors.gender && (
              <div className="text-red-500 text-sm mt-1">{validationErrors.gender}</div>
            )}
            
            <InputField
              icon={<Calendar />} 
              label="Date of Birth" 
              type="date" 
              value={formData.dob}
              onChange={(value) => setFormData({...formData, dob: value})}
              darkMode={darkMode} 
              delay={600}
              required
            />
            {validationErrors.dob && (
              <div className="text-red-500 text-sm mt-1">{validationErrors.dob}</div>
            )}
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t
           ${darkMode ? 'border-gray-700/50' : 'border-white/50'}`}>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`relative w-full sm:w-auto px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-300
                transform hover:scale-105 active:scale-95 overflow-hidden group cursor-pointer
                ${isSaving ? 'bg-gray-400 cursor-not-allowed' : (darkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600')}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent 
                transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <div className="relative flex items-center justify-center gap-2">
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : saveSuccess ? (
                  <> <Check className="w-5 h-5" /> <span>Saved!</span> </>
                ) : (
                  <> <Save className="w-5 h-5" /> <span>Save Changes</span> </>
                )}
              </div>
            </button>

            <button 
             onClick={() => window.history.back()}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold border-2 transition-all duration-300
              transform hover:scale-105 active:scale-95 cursor-pointer
              ${darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800/50' 
                : 'border-slate-300 text-slate-700 hover:bg-white/50'
              }`}>
              Cancel
            </button>
          </div>

          {saveSuccess && (
            <div className={`mt-6 p-4 rounded-lg border text-center transition-all duration-500
              ${darkMode 
                ? 'bg-emerald-900/30 border-emerald-600/40 text-emerald-300' 
                : 'bg-emerald-100/70 border-emerald-400/50 text-emerald-800'
              }`}>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                <span className="font-semibold text-sm">Profile updated successfully!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/*
@keyframes gradientText {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-text {
  background-size: 200% 200%;
  animation: gradientText 3s ease-in-out infinite;
}
*/