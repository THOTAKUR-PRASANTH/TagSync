"use client";

import { motion } from "framer-motion";
import { Bell, User, Lock } from "lucide-react";

export default function SettingsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 text-white">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Settings ⚙️
        </h1>
        <p className="opacity-80 mb-8">Manage your preferences and account settings.</p>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 text-pink-400 mr-3" />
              <h2 className="text-xl font-semibold">Profile Settings</h2>
            </div>
            <p className="opacity-70 mb-4">Update your personal details like name, email, and profile picture.</p>
            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:opacity-90 transition">
              Edit Profile
            </button>
          </motion.div>

          <motion.div
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-purple-400 mr-3" />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>
            <p className="opacity-70 mb-4">Manage your password, 2FA, and connected devices.</p>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:opacity-90 transition">
              Manage Security
            </button>
          </motion.div>

          <motion.div
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-lg border border-white/20 md:col-span-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <p className="opacity-70 mb-4">Choose how you want to receive updates and alerts.</p>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:opacity-90 transition">
              Notification Settings
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}


