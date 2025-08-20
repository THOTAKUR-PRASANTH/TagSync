"use client";
import { motion } from "framer-motion";
import { BarChart2, Bell, User, Activity } from "lucide-react";

interface User {
  email?: string;
}

export default function DashboardClient({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 text-white">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold tracking-wide mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          ✨ Welcome, {user.email?.split("@")[0]}!
        </h1>
        <p className="text-white/70 text-lg">
          Here’s what’s happening with your account
        </p>
      </motion.div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <User className="w-5 h-5 text-pink-400" /> Your Profile
          </h2>
          <div className="space-y-2 text-white/90">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Status:</strong> ✅ Active
            </p>
            <p>
              <strong>Member since:</strong> Aug 2024
            </p>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Bell className="w-5 h-5 text-blue-400" /> Notifications
          </h2>
          <ul className="space-y-3">
            <li className="bg-white/5 p-3 rounded-lg">🎉 You logged in successfully</li>
            <li className="bg-white/5 p-3 rounded-lg">🚀 New feature update is live</li>
            <li className="bg-white/5 p-3 rounded-lg">🔥 Stay tuned for more content</li>
          </ul>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <BarChart2 className="w-5 h-5 text-green-400" /> Quick Stats
          </h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-3xl font-bold">12</p>
              <p className="opacity-70">Projects</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-3xl font-bold">5</p>
              <p className="opacity-70">Messages</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-3xl font-bold">9</p>
              <p className="opacity-70">Tasks</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <p className="text-3xl font-bold">98%</p>
              <p className="opacity-70">Progress</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-1 md:col-span-2 lg:col-span-3 p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
            <Activity className="w-5 h-5 text-yellow-400" /> Recent Activity
          </h2>
          <ul className="space-y-3">
            <li className="bg-white/5 p-3 rounded-lg">🕑 Logged in at 10:45 AM</li>
            <li className="bg-white/5 p-3 rounded-lg">👀 Viewed "User Dashboard"</li>
            <li className="bg-white/5 p-3 rounded-lg">⚙️ Updated profile settings</li>
            <li className="bg-white/5 p-3 rounded-lg">🔒 Logged out at 9:30 PM</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
