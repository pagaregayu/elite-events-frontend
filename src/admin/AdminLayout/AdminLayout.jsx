import { Outlet } from "react-router-dom";
import "../AdminLayout/AdminLayout.css";

import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar always visible */}
      <AdminSidebar />

      {/* Page content changes here */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;