import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("adminToken");

  return isLoggedIn ? children : <Navigate to="/admin-login" replace />;
}

export default AdminRoute;