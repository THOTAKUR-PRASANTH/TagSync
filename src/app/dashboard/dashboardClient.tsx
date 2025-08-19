"use client";
import { motion } from 'framer-motion';

interface User {
  email?: string;
}
export default function DashboardClient({ user }: { user: User }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-400 text-white flex flex-col">
      <header className="flex justify-between items-center px-10 py-6 bg-black/20 backdrop-blur-md shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">
          ✨ Welcome, {user.email?.split("@")[0]}!
        </h1>

        <form action="/api/Auth/signout" method="post">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition-colors text-white py-2 px-6 rounded-lg shadow-lg"
          >
            Logout
          </button>
        </form>
      </header>

      <main className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4">👤 Your Profile</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Status:</strong> Active
          </p>
          <p>
            <strong>Member since:</strong> Aug 2024
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4">🔔 Notifications</h2>
          <ul className="space-y-3">
            <li className="bg-white/10 p-3 rounded-lg">
              You logged in successfully 🎉
            </li>
            <li className="bg-white/10 p-3 rounded-lg">
              New feature update is live 🚀
            </li>
            <li className="bg-white/10 p-3 rounded-lg">
              Stay tuned for more content 🔥
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4">📊 Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">12</p>
              <p>Projects</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">5</p>
              <p>Messages</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">9</p>
              <p>Tasks</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold">98%</p>
              <p>Progress</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="col-span-1 md:col-span-2 lg:col-span-3 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold mb-4">📅 Recent Activity</h2>
          <ul className="space-y-3">
            <li className="bg-white/10 p-3 rounded-lg">Logged in at 10:45 AM</li>
            <li className="bg-white/10 p-3 rounded-lg">Viewed "User Dashboard"</li>
            <li className="bg-white/10 p-3 rounded-lg">Updated profile settings</li>
            <li className="bg-white/10 p-3 rounded-lg">
              Logged out last night at 9:30 PM
            </li>
          </ul>
        </motion.div>
      </main>
    </div>
  );
}


