import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import EquipesPage from "./pages/EquipesPage";
import TerrainsPage from "./pages/TerrainsPage";
import Profile from "./pages/profile";
import RequireAuth from "./components/RequireAuth";

import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages_admin/Dashboard";
import Users from "./pages_admin/Users";
import Reservations from "./pages_admin/Reservations";
import Terrains from "./pages_admin/Terrains";
import Equipes from "./pages_admin/Equipes";
import Settings from "./pages_admin/Settings";
import RequireAdmin from "./components/RequireAdmin";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/equipes" element={<EquipesPage />} />
          <Route path="/terrains" element={<TerrainsPage />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="terrains" element={<Terrains />} />
            <Route path="equipes" element={<Equipes />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
