"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

export default function SecureClient() {
  type ActivityStatus = "success" | "warning" | "info";
  type Activity = { action: string; time: string; status: ActivityStatus };

  const activities: Activity[] = [
    { action: "New user registration", time: "2 minutes ago", status: "success" },
    { action: "Payment processed", time: "15 minutes ago", status: "success" },
    { action: "System maintenance", time: "1 hour ago", status: "info" },
    { action: "API rate limit reached", time: "3 hours ago", status: "warning" },
    { action: "Backup completed", time: "6 hours ago", status: "success" },
  ];

  const statusIcon: Record<ActivityStatus, ReactNode> = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-4xl font-extrabold tracking-wide text-white mb-2 drop-shadow-lg">📊 Analytics Dashboard</h1>
        <p className="text-white/70 text-lg">Track your performance and insights</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "1,234", icon: <Users className="w-6 h-6 text-blue-600" />, color: "bg-gradient-to-br from-blue-500 to-blue-700", change: "+12%", trend: "up", trendColor: "text-green-500" },
          { label: "Success Rate", value: "89.2%", icon: <BarChart3 className="w-6 h-6 text-green-600" />, color: "bg-gradient-to-br from-green-500 to-green-700", change: "+5%", trend: "up", trendColor: "text-green-500" },
          { label: "Revenue", value: "$45.2K", icon: <DollarSign className="w-6 h-6 text-purple-600" />, color: "bg-gradient-to-br from-purple-500 to-purple-700", change: "+18%", trend: "up", trendColor: "text-green-500" },
          { label: "Avg Response", value: "2.4s", icon: <Clock className="w-6 h-6 text-orange-600" />, color: "bg-gradient-to-br from-orange-500 to-orange-700", change: "-8%", trend: "down", trendColor: "text-red-500" },
        ].map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={`${stat.color} rounded-2xl shadow-xl p-6 text-center text-white`}>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">{stat.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="opacity-90">{stat.label}</p>
            <div className={`flex items-center justify-center mt-2 ${stat.trendColor}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${stat.trend === "down" ? "rotate-180" : ""}`} />
              <span className="text-sm">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-gray-8 00 to-gray-900 rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold mb-6 text-white">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center justify-between p-4 bg-gray-700/60 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="flex items-center space-x-3">
                {statusIcon[item.status]}
                <span className="text-white">{item.action}</span>
              </div>
              <span className="text-white/60 text-sm">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold mb-6 text-white">Performance Overview</h2>
        <div className="h-64 bg-gray-700/60 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
          <div className="text-center text-white/60">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Chart visualization would go here</p>
            <p className="text-sm">Integration with charting library</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


