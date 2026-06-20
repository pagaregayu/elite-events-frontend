import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaStar,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaChartBar,
  FaChartPie,
  FaDownload,
  FaDollarSign
} from "react-icons/fa";

// Import recharts components
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState({
    events: [],
    vendors: [],
    messages: [],
    reviews: [],
    monthlyData: [],
    eventTypes: [],
    ratingDistribution: {},
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("year");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    // Load data from localStorage
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const vendors = JSON.parse(localStorage.getItem("vendors")) || [];
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // Generate monthly data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = months.map((month) => ({
      month,
      events: Math.floor(Math.random() * 30) + 10,
      messages: Math.floor(Math.random() * 60) + 20,
      reviews: Math.floor(Math.random() * 40) + 5,
      revenue: Math.floor(Math.random() * 50000) + 10000
    }));

    // Event type distribution
    const eventTypeCount = {};
    events.forEach(event => {
      const type = event.type || "Other";
      eventTypeCount[type] = (eventTypeCount[type] || 0) + 1;
    });
    
    let eventTypes = Object.keys(eventTypeCount).map(type => ({
      name: type,
      value: eventTypeCount[type]
    }));

    if (eventTypes.length === 0) {
      eventTypes = [
        { name: "Wedding", value: 5 },
        { name: "Corporate", value: 3 },
        { name: "Birthday", value: 2 }
      ];
    }

    // Rating distribution
    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };

    // Recent activities
    const recentActivity = [
      ...events.slice(-3).map(e => ({ type: "event", name: e.name || "Event", action: "added", date: new Date() })),
      ...messages.slice(-3).map(m => ({ type: "message", name: m.name || "User", action: "sent", date: new Date() })),
      ...reviews.slice(-2).map(r => ({ type: "review", name: r.clientName || "Client", action: "submitted", date: new Date() }))
    ].sort((a, b) => b.date - a.date).slice(0, 5);

    setAnalytics({
      events,
      vendors,
      messages,
      reviews,
      monthlyData,
      eventTypes,
      ratingDistribution,
      recentActivity
    });
    setLoading(false);
  };

  const totalEvents = analytics.events.length;
  const totalVendors = analytics.vendors.length;
  const totalMessages = analytics.messages.length;
  const totalReviews = analytics.reviews.length;
  const averageRating = analytics.reviews.length > 0
    ? (analytics.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / analytics.reviews.length).toFixed(1)
    : 0;

  const COLORS = ["#ec4899", "#f472b6", "#fbcfe8", "#be185d", "#9d174d"];

  const ratingData = [
    { rating: "5 Stars", count: analytics.ratingDistribution?.[5] || 0 },
    { rating: "4 Stars", count: analytics.ratingDistribution?.[4] || 0 },
    { rating: "3 Stars", count: analytics.ratingDistribution?.[3] || 0 },
    { rating: "2 Stars", count: analytics.ratingDistribution?.[2] || 0 },
    { rating: "1 Star", count: analytics.ratingDistribution?.[1] || 0 }
  ];

  const statCards = [
    { title: "Total Events", value: totalEvents, icon: FaCalendarAlt, trend: "+12%", positive: true },
    { title: "Total Vendors", value: totalVendors, icon: FaUsers, trend: "+8%", positive: true },
    { title: "Total Messages", value: totalMessages, icon: FaEnvelope, trend: "+23%", positive: true },
    { title: "Total Reviews", value: totalReviews, icon: FaStar, trend: "+15%", positive: true },
    { title: "Avg Rating", value: averageRating, icon: FaStar, trend: "+0.3", positive: true }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/10 rounded-xl">
                  <FaChartLine className="text-pink-500 text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    Comprehensive insights and performance metrics
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {["week", "month", "year"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeRange === range
                        ? "bg-pink-500 text-white"
                        : "bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </button>
                ))}
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 transition-all flex items-center gap-2">
                  <FaDownload size={12} /> Export
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {statCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-pink-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <card.icon className="text-pink-500 text-lg" />
                  </div>
                  <span className={`text-xs font-medium flex items-center gap-1 ${card.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {card.positive ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                    {card.trend}
                  </span>
                </div>
                <p className="text-3xl font-bold text-white">{card.value}</p>
                <p className="text-gray-400 text-sm mt-1">{card.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Trends */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 rounded-xl p-5 border border-gray-800"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaChartLine className="text-pink-500" />
                Monthly Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="events" stroke="#ec4899" strokeWidth={2} />
                  <Line type="monotone" dataKey="messages" stroke="#f472b6" strokeWidth={2} />
                  <Line type="monotone" dataKey="reviews" stroke="#fbcfe8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Event Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900 rounded-xl p-5 border border-gray-800"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaChartPie className="text-pink-500" />
                Event Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.eventTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {analytics.eventTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Revenue and Ratings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900 rounded-xl p-5 border border-gray-800"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaDollarSign className="text-pink-500" />
                Revenue Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                    formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#ec4899" fill="#ec4899" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Rating Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 rounded-xl p-5 border border-gray-800"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FaChartBar className="text-pink-500" />
                Rating Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="rating" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  />
                  <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-800">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <FaEye className="text-pink-500" />
                Recent Activity
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-5 text-gray-400 text-sm font-medium">Type</th>
                    <th className="text-left py-3 px-5 text-gray-400 text-sm font-medium">Name</th>
                    <th className="text-left py-3 px-5 text-gray-400 text-sm font-medium">Action</th>
                    <th className="text-left py-3 px-5 text-gray-400 text-sm font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recentActivity.map((activity, i) => (
                    <tr key={i} className="border-t border-gray-800 hover:bg-gray-800/30 transition-all">
                      <td className="py-3 px-5">
                        <span className={`px-2 py-1 rounded-lg text-xs ${
                          activity.type === "event" ? "bg-pink-500/10 text-pink-400" :
                          activity.type === "message" ? "bg-blue-500/10 text-blue-400" :
                          "bg-green-500/10 text-green-400"
                        }`}>
                          {activity.type}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-white">{activity.name}</td>
                      <td className="py-3 px-5 text-gray-400">{activity.action}</td>
                      <td className="py-3 px-5 text-gray-500 text-sm">
                        {activity.date.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {analytics.recentActivity.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500">
                        No recent activity
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
              <p className="text-2xl font-bold text-white">{totalEvents}</p>
              <p className="text-gray-400 text-xs">Total Events</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
              <p className="text-2xl font-bold text-white">{totalVendors}</p>
              <p className="text-gray-400 text-xs">Active Vendors</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
              <p className="text-2xl font-bold text-white">{totalMessages}</p>
              <p className="text-gray-400 text-xs">Total Messages</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
              <p className="text-2xl font-bold text-white">{averageRating}</p>
              <p className="text-gray-400 text-xs">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;