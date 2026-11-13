import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import "./QuickFarmLog.css";

function QuickFarmLog() {
  const { user } = useAuth();

  const farmerName =
    user?.user_metadata?.full_name?.trim() || "Farmer";

  const farmName =
    user?.user_metadata?.farm_name?.trim() || "Farm details not added";

  const lga = user?.user_metadata?.lga?.trim() || "";

  return (
    <div className="farm-log-layout">
      <Sidebar />

      <main className="farm-log-main">
        <header className="farm-log-header">
          <Link to="/farmer/dashboard" className="farm-log-back">
            ← Back to Farmer Dashboard
          </Link>

          <div className="farm-log-profile">
            <span>{farmerName}</span>
            <span>
              {farmName}
              {lga ? `, ${lga}` : ""}
            </span>
          </div>

          <div className="farm-log-heading">
            <p className="farm-log-eyebrow">FARM RECORDS</p>
            <h1>Quick Farm Log</h1>
            <p>
              Record routine flock observations, mortalities, feed
              and housing conditions.
            </p>
          </div>
        </header>

        <section className="farm-log-section">
          <div className="farm-log-section__heading">
            <span className="farm-log-step">01</span>
            <div>
              <h2>Select Target Flock & Housing</h2>
              <p>
                Choose a flock to associate with this observation.
              </p>
            </div>
          </div>

          <div className="farm-log-empty">
            <p>No flock records available yet.</p>
            <span>
              Flock selection will be available when your farm's
              flock details have been added.
            </span>
          </div>
        </section>

        <div className="farm-log-actions">
          <Link to="/farmer/dashboard" className="farm-log-cancel">
            Cancel
          </Link>

          <Link to="/farmer/records" className="farm-log-records-link">
            View Detailed Pen Health Logs →
          </Link>
        </div>
      </main>
    </div>
  );
}

export default QuickFarmLog;