import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo.png";
import "./ChatSidebar.css";

function ChatSidebar({ onNewChat, searchQuery, onSearchChange }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const farmerName =
    user?.user_metadata?.full_name?.trim() || "Farmer";

  const firstName = farmerName.split(" ")[0];

  const initials = farmerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  async function handleLogout() {
    setLogoutError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setLogoutError("Unable to log out. Please try again.");
      console.error("Logout failed:", error.message);
      return;
    }

    navigate("/farmer/login", { replace: true });
  }

  function handleNewChat() {
    onNewChat?.();
    if (showSearch) {
      setShowSearch(false);
    }
  }

  return (
    <aside className="chat-sidebar">
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
  );
}

export default ChatSidebar;