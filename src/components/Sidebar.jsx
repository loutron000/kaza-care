import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo.png";
import "./Sidebar.css";

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const farmerName =
    user?.user_metadata?.full_name?.trim() || "Farmer";

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    navigate("/farmer/login", { replace: true });
  }

  return (
    <aside className="dashboard-sidebar">
      <Link to="/" className="dashboard-brand">
        <img src={logo} alt="Kaza Care logo" />
        <span>Kaza Care</span>
      </Link>

      <div className="dashboard-user">
        <div className="dashboard-user__avatar">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </div>

        <div className="dashboard-user__details">
          <strong>{farmerName}</strong>
          <span>Farmer</span>
        </div>
      </div>

      <nav className="dashboard-nav" aria-label="Main navigation">
        <NavLink
          to="/farmer/dashboard"
          className={({ isActive }) =>
            `dashboard-nav__link ${isActive ? "active" : ""}`
          }
        >
          <span className="dashboard-nav__icon">⌂</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/farmer/assessment"
          className={({ isActive }) =>
            `dashboard-nav__link ${isActive ? "active" : ""}`
          }
        >
          <span className="dashboard-nav__icon">♡</span>
          Symptom Checker
        </NavLink>

        <NavLink
          to="/map"
          className={({ isActive }) =>
            `dashboard-nav__link ${isActive ? "active" : ""}`
          }
        >
          <span className="dashboard-nav__icon">⌖</span>
          Find a Vet
        </NavLink>

        <NavLink
          to="/farmer/records"
          className={({ isActive }) =>
            `dashboard-nav__link ${isActive ? "active" : ""}`
          }
        >
          <span className="dashboard-nav__icon">＋</span>
          Records
        </NavLink>
      </nav>

      <div className="dashboard-sidebar__bottom">
        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <span aria-hidden="true">↪</span>
          Log Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
