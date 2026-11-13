import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo.png";
import "./ChatSidebar.css";

function ChatSidebar({ onNewChat, searchQuery, onSearchChange }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const farmerName = user?.user_metadata?.full_name?.trim() || "Farmer";

  const initials = farmerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

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
    setLogoutError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setLogoutError("Unable to log out. Please try again.");
      console.error("Logout failed:", error.message);
      return;
    }

    closeMenu();
    navigate("/farmer/login", { replace: true });
  }

  function handleNewChat() {
    onNewChat?.();
    setShowSearch(false);
    onSearchChange?.("");
    closeMenu();
  }

  return (
    <>
      <div className="chat-sidebar-mobile-bar">
        <div className="chat-sidebar__brand">
          <img src={logo} alt="Kaza Care logo" />
          <span>Kaza Care</span>
        </div>

        <button
          type="button"
          className="chat-sidebar-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="chat-sidebar"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {createPortal(
        <>
          <button
            type="button"
            className={`chat-sidebar-backdrop ${menuOpen ? "is-visible" : ""}`}
            aria-label="Close menu"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          />

          <aside
            id="chat-sidebar"
            className={`chat-sidebar ${menuOpen ? "is-open" : ""}`}
          >
            <div className="chat-sidebar__top">
              <div className="chat-sidebar__brand">
                <img src={logo} alt="Kaza Care logo" />
                <span>Kaza Care</span>
              </div>

              <div className="chat-sidebar__profile">
                <div className="chat-sidebar__avatar" aria-hidden="true">
                  {initials}
                </div>

                <div className="chat-sidebar__user-details">
                  <strong>{farmerName}</strong>
                  <span>Farmer</span>
                </div>
              </div>

              <button
                type="button"
                className="chat-sidebar__new-chat"
                onClick={handleNewChat}
              >
                <span aria-hidden="true">＋</span>
                New Chat
              </button>

              <div className="chat-sidebar__section">
                <button
                  type="button"
                  className="chat-sidebar__search-toggle"
                  aria-expanded={showSearch}
                  onClick={() => setShowSearch((current) => !current)}
                >
                  <span aria-hidden="true">⌕</span>
                  Search
                </button>

                {showSearch && (
                  <input
                    type="search"
                    className="chat-sidebar__search-input"
                    placeholder="Search this conversation..."
                    aria-label="Search this conversation"
                    value={searchQuery || ""}
                    onChange={(event) =>
                      onSearchChange?.(event.target.value)
                    }
                  />
                )}
              </div>

              <div className="chat-sidebar__recents">
                <p className="chat-sidebar__section-title">RECENTS</p>
                <p className="chat-sidebar__empty">
                  Your recent conversations will appear here.
                </p>
              </div>
            </div>

            <div className="chat-sidebar__bottom">
              {logoutError && (
                <p className="chat-sidebar__error" role="alert">
                  {logoutError}
                </p>
              )}

              <button
                type="button"
                className="chat-sidebar__logout"
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

export default ChatSidebar;