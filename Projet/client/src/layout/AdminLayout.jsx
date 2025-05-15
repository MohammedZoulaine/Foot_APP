import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components_admin/Sidebar";
import { Topbar } from "../Components_admin/Topbar";
import "../styles_admin/admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout d-flex">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content flex-grow-1">
        <Topbar />
        <div className="admin-content p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
