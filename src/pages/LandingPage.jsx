import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/logo.png";
import heroImage from "../assets/hero-image.png";
import HowItWorks from "../components/HowItWorks";
import GroundTruth from "../components/GroundTruth";
import VeterinaryGrid from "../components/VeterinaryGrid";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import SelectRole from "../pages/SelectRole";

function Navbar() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Kaza Care home">
        <img src={logo} alt="" />
        <span>Kaza Care</span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link className="nav-link active" to="/">
          Home
        </Link>

        <Link className="nav-link" to="/SelectRole">
          Symptom Checker
        </Link>

        <Link className="nav-link" to="/SelectRole">
          Find a Vet
        </Link>
      </nav>

      <Link className="button button-primary nav-cta" to="/SelectRole">
        Get Started Free <span aria-hidden="true">→</span>
      </Link>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Plateau Poultry Health Network</p>

        <h1>Better care for every bird.</h1>

        <p className="hero-description">
          Understand flock symptoms, get practical triage guidance, and connect
          with veterinary professionals near your farm in Plateau State.
        </p>

        <Link className="button button-primary" to="/SelectRole">
          Get Started Free <span aria-hidden="true">→</span>
        </Link>

        <p className="hero-note">
          Practical poultry health support for smallholders.
        </p>
      </div>

      <div className="hero-visual">
        <img src={heroImage} alt="Poultry on a smallholder farm" />
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <GroundTruth />
        <VeterinaryGrid />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}

export default LandingPage;
