import './LandingPage.css'
import logo from '../assets/logo.png'
import heroImage from '../assets/hero-image.png'
import HowItWorks from '../components/HowItWorks'
import GroundTruth from '../components/GroundTruth'
import VeterinaryGrid from '../components/VeterinaryGrid'
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import SelectRole from "/SelectRole";

function Navbar() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Kaza Care home">
        <img src={logo} alt="" />
        <span>Kaza Care</span>
      </a>

      <nav className="main-nav" aria-label="Main navigation">
        <a className="nav-link active" href="#home">
          Home
        </a>
        <a className="nav-link" href="SelectRole">
          Symptom Checker
        </a>
        <a className="nav-link" href="/SelectRole">
          Find a Vet
        </a>
      </nav>

      <a className="button button-primary nav-cta" href="/SelectRole ">
        Get Started Free <span aria-hidden="true">→</span>
      </a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">
          Plateau Poultry Health Network
        </p>

        <h1>Better care for every bird.</h1>

        <p className="hero-description">
          Understand flock symptoms, get practical triage
          guidance, and connect with veterinary professionals
          near your farm in Plateau State.
        </p>

        <a className="button button-primary" href="/SelectRole">
          Get Started Free <span aria-hidden="true">→</span>
        </a>

        <p className="hero-note">
          Practical poultry health support for smallholders.
        </p>
      </div>

      <div className="hero-visual">
        <img
          src={heroImage}
          alt="Poultry on a smallholder farm"
        />
      </div>
    </section>
  )
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
  )
}

export default LandingPage