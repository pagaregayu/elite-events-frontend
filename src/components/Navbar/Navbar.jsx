import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const isAdmin =
  localStorage.getItem("adminToken") === "true";

  return (
    <nav className="navbar navbar-expand-lg elite-navbar fixed-top">
      <div className="container">

        <Link className="navbar-brand logo" to="/">
          Elite Events
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          ☰
        </button>

        <div className="collapse navbar-collapse" id="menu">

          {/* LEFT MENU */}
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/vendors">Vendors</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/gallery">Gallery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/happy-clients">
                Happy Clients
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

          </ul>

          {/* RIGHT SIDE AUTH AREA */}
          <div className="nav-icons">

            {/* ADMIN LOGIN (ONLY IF NOT LOGGED IN) */}
            {!role && (
              <Link className="nav-link" to="/admin-login">
                Admin Login
              </Link>
            )}

                {
      isAdmin && (
        <li className="nav-item">
          <Link
            className="admin-dashboard-btn"
            to="/admin"
          >
            Admin Dashboard
          </Link>
        </li>
      )
    }

            {/* LOGOUT (ONLY IF ADMIN LOGGED IN) */}
            {role === "admin" && (
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            )}

            {/* OPTIONAL ICONS */}
            <FaBell />
            <FaUserCircle />

            <span className="badge-count">
              {notifications.length}
            </span>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;