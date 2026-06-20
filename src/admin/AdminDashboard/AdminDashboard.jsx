import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaStar,
  FaChartLine,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaComments,
} from "react-icons/fa";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalVendors: 0,
    totalMessages: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const vendors = JSON.parse(localStorage.getItem("vendors")) || [];
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    setStats({
      totalEvents: events.length,
      totalVendors: vendors.length,
      totalMessages: messages.length,
      totalReviews: reviews.length,
    });
  }, []);

  const dashboardCards = [
    { title: "Total Events", value: stats.totalEvents, icon: FaCalendarAlt, trend: "+12%", color: "text-blue-400" },
    { title: "Total Vendors", value: stats.totalVendors, icon: FaUsers, trend: "+8%", color: "text-emerald-400" },
    { title: "Messages", value: stats.totalMessages, icon: FaEnvelope, trend: "+23%", color: "text-purple-400" },
    { title: "Reviews", value: stats.totalReviews, icon: FaStar, trend: "+15%", color: "text-amber-400" },
  ];

  const recentActivities = [
    { type: "event", name: "Royal Wedding", action: "added", time: "2 min ago", icon: FaCalendarAlt },
    { type: "message", name: "John Doe", action: "sent a message", time: "15 min ago", icon: FaComments },
    { type: "review", name: "Sarah Johnson", action: "submitted a review", time: "1 hour ago", icon: FaStar },
    { type: "vendor", name: "ABC Catering", action: "registered", time: "3 hours ago", icon: FaUsers },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">
              Welcome back! Here's what's happening with your platform.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-gray-800 ${card.color}`}>
                    <card.icon className="text-lg" />
                  </div>
                  <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                    <FaArrowUp size={10} /> {card.trend}
                  </span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-gray-400 text-sm">{card.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traffic Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-5"
            >
              <h3 className="text-white font-semibold mb-4">Traffic Overview</h3>
              <div className="space-y-4">
                {[
                  { label: "Website Visits", value: "12,543", percentage: 75 },
                  { label: "Event Inquiries", value: "342", percentage: 45 },
                  { label: "New Users", value: "128", percentage: 30 },
                  { label: "Conversion Rate", value: "23.5%", percentage: 60 },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-5"
            >
              <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-gray-800 text-indigo-400">
                      <activity.icon className="text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        <span className="font-medium">{activity.name}</span> {activity.action}
                      </p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-5"
          >
            <h3 className="text-white font-semibold mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Avg. Response Time", value: "2.5", unit: "hours", icon: FaClock },
                { label: "Customer Satisfaction", value: "4.8", unit: "/5", icon: FaStar },
                { label: "Event Success Rate", value: "98", unit: "%", icon: FaChartLine },
              ].map((metric, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-gray-800/30">
                  <metric.icon className="text-indigo-400 text-xl mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{metric.value}{metric.unit}</p>
                  <p className="text-gray-400 text-sm">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;