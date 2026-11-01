import { Link } from "react-router-dom";
import "./SelectRole.css";
import logo from "../assets/logo.png";

function SelectRole() {
  return (
    <div className="select-role-page">
      <header className="select-role-header">
        <a href="/" className="select-role-brand">
          <img src={logo} alt="Kaza Care logo" />
          <span>Kaza Care</span>
        </a>
      </header>

      <main className="select-role-main">
        <div className="select-role-overlay"></div>

        <section className="select-role-content">
          <div className="role-card">

            <Link
              to="/farmer/signup"
              className="role-button role-button--farmer"
            >
              Continue as Farmer <span>→</span>
            </Link>

            <a href="/farmer/login" className="role-login-link">
              Already have a farmer account? Log in
            </a>
          </div>

          <div className="role-card">

            <a href="/vet/signup" className="role-button role-button--vet">
              Continue as Veterinarian <span>→</span>
            </a>

            <a href="/vet/login" className="role-login-link">
              Already verified? Access Vet Portal
            </a>
          </div>
        </section>
      </main>

      <footer className="select-role-footer">
        <p>© 2026 Kaza Care. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default SelectRole;
