import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { FaBell, FaEnvelope, FaTrash, FaEye } from "react-icons/fa";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    markAllRead();
  }, []);

  const markAllRead = async () => {
    try {
      await API.put("/notifications/mark-all-read");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await API.get("/notifications");
      setNotifications(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await API.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaBell className="text-pink-500 text-xl" />
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <span className="text-gray-500 text-sm">({notifications.length})</span>
        </div>

        {/* Notifications */}
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-gray-900 rounded-xl">
            <FaBell className="text-gray-600 text-4xl mx-auto mb-2" />
            <p className="text-gray-500">No notifications</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <FaEnvelope className="text-pink-500 text-sm" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{item.message}</p>
                    <div className="flex gap-3">
                      <Link to="/admin/messages" className="text-pink-400 text-sm hover:text-pink-300">
                        View Messages
                      </Link>
                      <button onClick={() => deleteNotification(item.id)} className="text-red-400 text-sm hover:text-red-300">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminNotifications;