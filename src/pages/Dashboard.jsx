import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./Dashboard.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const { user } = useAuth();
  const [logoutError, setLogoutError] = useState("");

  const farmerName =
    user?.user_metadata?.full_name?.trim() || "Farmer";

  const firstName = farmerName.split(" ")[0];

  async function handleLogout() {
    setLogoutError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setLogoutError("Unable to log out. Please try again.");
    }
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      {/* Main dashboard */}
      <main className="dashboard-main">
        <div className="dashboard-main__content">
          <header className="dashboard-heading">
            <div>
              <p className="dashboard-heading__eyebrow">
                YOUR FARM OVERVIEW
              </p>
              <h1>
                {getGreeting()}, {firstName}
              </h1>
              <p>Here's what's happening with your flock.</p>
            </div>
          </header>

          {/* Main action cards */}
          <section className="dashboard-hero-grid">
            <article className="dashboard-check-card">
              <span className="dashboard-card-label">
                POULTRY HEALTH
              </span>

              <h2>Check Flock Symptoms</h2>

              <p>
                Step-by-step clinical triage tailored for Plateau
                conditions. Check changes in droppings, breathing,
                or water intake before issues spread.
              </p>

              <Link to="/SelectRole" className="dashboard-pill-button">
                Start Symptom Check <span>→</span>
              </Link>

              <span className="dashboard-card-footnote">
                Average time: 2 mins
              </span>
            </article>

            <article
              className="dashboard-vet-card"
              id="veterinary-directory"
            >
              <span className="dashboard-card-label">
                VETERINARY SUPPORT
              </span>

              <h2>Find a Nearby Vet</h2>

              <p>
                Explore veterinary support for your poultry farm
                and find out when providers become available in
                your area.
              </p>

              <p className="dashboard-vet-status">
                <span className="dashboard-status-dot" />
                Provider directory in development
              </p>

              <span className="dashboard-text-link">
                Veterinary directory <span>→</span>
              </span>
            </article>
          </section>

          {/* Flock overview */}
          <section className="dashboard-section">
            <div className="dashboard-section__heading">
              <h2>Flock Overview</h2>
              <Link to="/farmer/records">
                Detailed Pen Logs <span>↗</span>
              </Link>
            </div>

            <div className="dashboard-overview-grid">
              <article className="dashboard-overview-card">
                <span className="dashboard-overview-card__label">
                  TOTAL STOCK
                </span>
                <strong className="dashboard-placeholder-value">—</strong>
                <p>Record your flock size to get started.</p>
              </article>

              <article className="dashboard-overview-card">
                <span className="dashboard-overview-card__label">
                  HEALTH VITALITY
                </span>
                <strong className="dashboard-overview-card__status">
                  Not assessed
                </strong>
                <p>Your flock health updates will appear here.</p>
              </article>

              <article className="dashboard-overview-card">
                <span className="dashboard-overview-card__label">
                  PREVENTIVE CARE
                </span>
                <strong className="dashboard-overview-card__status">
                  No schedule yet
                </strong>
                <p>Your vaccination reminders will appear here.</p>
              </article>
            </div>
          </section>

          {/* Farm activity */}
          <section className="dashboard-activity-grid">
            <div className="dashboard-farm-visual">
              <div className="dashboard-farm-visual__content">
                <span>YOUR FARM</span>
                <h2>Your flock's story starts here.</h2>
                <p>
                  Farm photos and updates will appear here as
                  you build your farm records.
                </p>
              </div>
            </div>

            <div className="dashboard-logs" id="quick-log">
              <div className="dashboard-section__heading">
                <h2>Recent Farm Logs</h2>
                <Link to="/farmer/records">
                  View all <span>↗</span>
                </Link>
              </div>

              <div className="dashboard-empty-state">
                <span className="dashboard-empty-state__icon">＋</span>
                <h3>No farm logs yet</h3>
                <p>
                  Your farm activities will appear here when
                  you start recording them.
                </p>
              </div>

              <div className="dashboard-quick-log">
                <p>
                  Need to record daily mortalities, egg yields,
                  or flock weights?
                </p>
                <Link to="/farmer/records">
                  Quick Log <span>→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Dashboard;
