import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AdminSidebar.css";
import API from "../../services/api";

import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaEnvelope,
  FaStar,
  FaBell,
  FaChartBar,
  FaSignOutAlt,
  FaImage,
  FaHeart,
  FaGlobe
} from "react-icons/fa";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchCount = async () => {
    try {
      const response = await API.get("/notifications/count");
      setNotificationCount(response.data || 0);
    } catch (error) {
      console.error("Notification Count Error:", error);
    }
  };

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Events", path: "/admin/events", icon: <FaCalendarAlt /> },
    { name: "Vendors", path: "/admin/vendors", icon: <FaUsers /> },
    { name: "Messages", path: "/admin/messages", icon: <FaEnvelope /> },
    { name: "Manage Reviews", path: "/admin/reviews", icon: <FaStar /> },
    { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
    { name: "Analytics", path: "/admin/analytics", icon: <FaChartBar /> },
    { name: "Add Gallery", path: "/admin/add-gallery", icon: <FaImage /> },
    { name: "Add Happy Clients", path: "/admin/add-happy-clients", icon: <FaHeart /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    navigate("/admin-login");
  };

  return (
    <div className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <h2>Elite<span>Events</span></h2>
        <p>Admin Panel</p>
      </div>

      {/* MENU */}
      <div className="sidebar-menu">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
              {item.name === "Notifications" && notificationCount > 0 && (
                <span className="badge">{notificationCount}</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* VIEW WEBSITE */}
      <div className="logout-section">
        <button className="website-btn" onClick={() => navigate("/")}>
          <FaGlobe />
          <span>View Website</span>
        </button>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;