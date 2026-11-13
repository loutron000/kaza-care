import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo.png";
import "./Sidebar.css";

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const farmerName = user?.user_metadata?.full_name?.trim() || "Farmer";

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    function handleEscape(event) {
      if (event.key === "Escape") closeMenu();
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    closeMenu();
    navigate("/farmer/login", { replace: true });
  }

  return (
    <>
      <div className="dashboard-mobile-bar">
        <Link to="/" className="dashboard-brand" onClick={closeMenu}>
          <img src={logo} alt="Kaza Care logo" />
          <span>Kaza Care</span>
        </Link>

        <button
          type="button"
          className="dashboard-menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="dashboard-sidebar"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {createPortal(
        <>
          <button
            type="button"
            className={`dashboard-sidebar-backdrop ${menuOpen ? "is-visible" : ""}`}
            aria-label="Close navigation menu"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          />

          <aside
            id="dashboard-sidebar"
            className={`dashboard-sidebar ${menuOpen ? "is-open" : ""}`}
          >
            <Link to="/" className="dashboard-brand" onClick={closeMenu}>
              <img src={logo} alt="Kaza Care logo" />
              <span>Kaza Care</span>
            </Link>

            <div className="dashboard-user">
              <div className="dashboard-user__avatar" aria-hidden="true">
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
                onClick={closeMenu}
                className={({ isActive }) =>
                  `dashboard-nav__link ${isActive ? "active" : ""}`
                }
              >
                <span className="dashboard-nav__icon">⌂</span>
                Dashboard
              </NavLink>

              <NavLink
                to="/farmer/assessment"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `dashboard-nav__link ${isActive ? "active" : ""}`
                }
              >
                <span className="dashboard-nav__icon">♡</span>
                Symptom Checker
              </NavLink>

              <NavLink
                to="/map"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `dashboard-nav__link ${isActive ? "active" : ""}`
                }
              >
                <span className="dashboard-nav__icon">⌖</span>
                Find a Vet
              </NavLink>

              <NavLink
                to="/farmer/quick-log"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `dashboard-nav__link ${isActive ? "active" : ""}`
                }
              >
                <span className="dashboard-nav__icon">＋</span>
                Quick log
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
        </>,
        document.body
      )}
    </>
  );
}

export default Sidebar;