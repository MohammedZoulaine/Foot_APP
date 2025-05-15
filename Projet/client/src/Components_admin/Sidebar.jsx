import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaFutbol,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles_admin/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate("/auth");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h4 className="logo">AdminPanel</h4>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-link nav-link-disabled">
          <FaTachometerAlt className="me-2" /> Dashboard
        </div>

        <NavLink to="/admin/users" className="nav-link">
          <FaUsers className="me-2" /> Utilisateurs
        </NavLink>
        <NavLink to="/admin/reservations" className="nav-link">
          <FaCalendarAlt className="me-2" /> Réservations
        </NavLink>
        <NavLink to="/admin/terrains" className="nav-link">
          <FaFutbol className="me-2" /> Terrains
        </NavLink>
        <NavLink to="/admin/equipes" className="nav-link">
          <FaUsers className="me-2" /> Équipes
        </NavLink>
        <NavLink to="/admin/settings" className="nav-link">
          <FaCogs className="me-2" /> Paramètres
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Déconnexion
        </button>
      </div>
    </div>
  );
}
