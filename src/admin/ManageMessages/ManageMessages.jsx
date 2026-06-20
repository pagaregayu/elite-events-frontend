import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaTrash,
  FaEye,
  FaSearch,
  FaSpinner,
  FaReply,
  FaCheckCircle,
} from "react-icons/fa";

function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEvent, setFilterEvent] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await API.get("/messages");
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await API.delete(`/messages/${id}`);
      setDeleteConfirm(null);
      setShowDeleteSuccess(true);
      fetchMessages();
      setTimeout(() => setShowDeleteSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to delete message");
    }
  };

  // Get unique event types for filter
  const eventTypes = ["all", ...new Set(messages.map(msg => msg.eventType).filter(Boolean))];

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = filterEvent === "all" || msg.eventType === filterEvent;
    return matchesSearch && matchesEvent;
  });

  // Statistics
  const totalMessages = messages.length;
  const todayMessages = messages.filter(msg => {
    const today = new Date().toDateString();
    const msgDate = new Date(msg.createdAt || msg.date).toDateString();
    return msgDate === today;
  }).length;

  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Customer Messages
                </h1>
                <p className="text-gray-300 mt-2">
                  Manage and respond to customer inquiries
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchMessages}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-pink-500/50 transition-all"
              >
                Refresh
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Delete Success Notification */}
        <AnimatePresence>
          {showDeleteSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="mb-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-white text-xl" />
                <div>
                  <p className="text-white font-semibold">Message Deleted Successfully</p>
                  <p className="text-white/80 text-sm">The message has been removed from the system</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Messages</p>
                <p className="text-3xl font-bold text-white">{totalMessages}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <FaEnvelope className="text-white text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Today's Messages</p>
                <p className="text-3xl font-bold text-white">{todayMessages}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="text-white text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Unread Messages</p>
                <p className="text-3xl font-bold text-white">{messages.filter(m => !m.isRead).length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <FaEye className="text-white text-xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-8"
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500"
              />
            </div>
            <select
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500"
            >
              {eventTypes.map(type => (
                <option key={type} value={type} className="bg-gray-800">
                  {type === "all" ? "All Events" : type}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Messages Table */}
        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block"
            >
              <FaSpinner className="text-4xl text-pink-500" />
            </motion.div>
            <p className="text-gray-300 mt-4">Loading messages...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
          >
            <div className="inline-block bg-white/10 rounded-full p-4 mb-4">
              <FaEnvelope className="text-4xl text-gray-400" />
            </div>
            <p className="text-gray-300 text-lg">No messages found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter</p>
          </motion.div>
        ) : (
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Event</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Message</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredMessages.map((msg) => (
                      <motion.tr
                        key={msg.id}
                        variants={rowVariants}
                        exit="exit"
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                              <FaUser className="text-white text-sm" />
                            </div>
                            <span className="text-white font-medium">{msg.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`mailto:${msg.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                            {msg.email}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`tel:${msg.phone}`} className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1">
                            <FaPhone size={12} /> {msg.phone}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg text-pink-300 text-sm">
                            {msg.eventType || "Not specified"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-md">
                            <p className="text-gray-300 line-clamp-2">{msg.message}</p>
                            <button
                              onClick={() => {
                                setSelectedMessage(msg);
                                setShowModal(true);
                              }}
                              className="text-pink-400 text-sm hover:text-pink-300 mt-1 inline-flex items-center gap-1"
                            >
                              <FaEye size={12} /> Read full message
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => window.location.href = `mailto:${msg.email}`}
                              className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all flex items-center gap-1"
                              title="Reply"
                            >
                              <FaReply size={12} /> Reply
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setDeleteConfirm(msg.id)}
                              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all flex items-center gap-1"
                              title="Delete"
                            >
                              <FaTrash size={12} /> Delete
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Delete Message</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete this message? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => deleteMessage(deleteConfirm)}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Full Message Modal */}
        <AnimatePresence>
          {showModal && selectedMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-2xl w-full border border-white/20"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedMessage.name}</h3>
                    <div className="flex gap-4 mt-2 text-sm">
                      <a href={`mailto:${selectedMessage.email}`} className="text-blue-400 hover:text-blue-300">
                        {selectedMessage.email}
                      </a>
                      <a href={`tel:${selectedMessage.phone}`} className="text-green-400 hover:text-green-300">
                        {selectedMessage.phone}
                      </a>
                    </div>
                    <span className="inline-block mt-2 px-2 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg text-pink-300 text-sm">
                      Event: {selectedMessage.eventType || "Not specified"}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    "{selectedMessage.message}"
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = `mailto:${selectedMessage.email}`}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <FaReply /> Reply
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default ManageMessages;