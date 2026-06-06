import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { FaGlobe } from "react-icons/fa";

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
  FaHeart
} from "react-icons/fa";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Events", path: "/admin/events", icon: <FaCalendarAlt /> },
    { name: "Vendors", path: "/admin/vendors", icon: <FaUsers /> },
    { name: "Messages", path: "/admin/messages", icon: <FaEnvelope /> },
    { name: "Reviews", path: "/admin/reviews", icon: <FaStar /> },
    { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
    { name: "Analytics", path: "/admin/analytics", icon: <FaChartBar /> },

    // ⭐ CONTENT MANAGEMENT
    { name: "Add Gallery", path: "/admin/add-gallery", icon: <FaImage /> },
    { name: "Add Happy Clients", path: "/admin/add-happy-clients", icon: <FaHeart /> },
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
        <h2>Admin Panel</h2>
        <p>Management System</p>
      </div>

      {/* MENU */}
      <div className="sidebar-menu">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar-footer">

        <button
          className="website-btn"
          onClick={() => navigate("/")}
        >
          <FaGlobe />
          <span>View Website</span>
        </button>

      </div>

      {/* LOGOUT */}
      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}

export default AdminSidebar;