import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../styles_admin/admin.css";

export function Topbar() {
  return (
    <div className="topbar">
      <h5 className="topbar-title">Tableau de bord administrateur</h5>
      <div className="topbar-user">
        <FaUserCircle size={24} className="me-2" />
        Admin
      </div>
    </div>
  );
}