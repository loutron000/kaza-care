import { supabase } from "../lib/supabase";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./FarmerAuth.css";

const plateauLGAs = [
  "Barkin Ladi",
  "Bassa",
  "Bokkos",
  "Jos East",
  "Jos North",
  "Jos South",
  "Kanam",
  "Kanke",
  "Langtang North",
  "Langtang South",
  "Mangu",
  "Mikang",
  "Pankshin",
  "Qua'an Pan",
  "Riyom",
  "Shendam",
  "Wase",
];

function FarmerAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === "/farmer/signup";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    farmName: "",
    lga: "",
    password: "",
    confirmPassword: "",
    rememberDevice: false,
    agreeToTerms: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Validate signup passwords before contacting Supabase.
    if (isSignup && formData.password !== formData.confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email.trim(),
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName.trim(),
              farm_name: formData.farmName.trim() || null,
              lga: formData.lga,
            },
            emailRedirectTo: `${window.location.origin}/farmer/login`,
          },
        });

        if (error) throw error;

        if (data.user && !data.session) {
          setMessage(
            "Account created! Please check your email and click the confirmation link before logging in.",
          );
        } else {
          setMessage(
            "Account created successfully. You can now continue to login.",
          );
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email.trim(),
          password: formData.password,
        });

        if (error) throw error;

        navigate("/farmer/dashboard", { replace: true });
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="farmer-auth-page">
      <Link to="/SelectRole" className="auth-back-link">
        <span aria-hidden="true">←</span> Back to Kaza Care
      </Link>

      <main className={`auth-main ${isSignup ? "auth-main--signup" : ""}`}>
        <div className="auth-heading">
          <img src={logo} alt="Kaza Care" />
          <h1>{isSignup ? "Create your farmer account" : "Welcome Back"}</h1>
        </div>
        <section className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup ? (
              <>
                <div className="form-field">
                  <label htmlFor="fullName">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="e.g. Sadisu Musa"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="farmName">
                    Farm Name <span className="optional">Optional</span>
                  </label>
                  <input
                    id="farmName"
                    name="farmName"
                    type="text"
                    placeholder="e.g. Sunseed Farmstead"
                    value={formData.farmName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="lga">
                    Local Government Area <span className="required">*</span>
                  </label>
                  <select
                    id="lga"
                    name="lga"
                    value={formData.lga}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your Plateau State LGA</option>
                    {plateauLGAs.map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            )}

            <div className="form-field">
              <div className="field-heading">
                <label htmlFor="password">
                  Password <span className="required">*</span>
                </label>

                {!isSignup && (
                  <button
                    type="button"
                    className="text-action"
                    onClick={() =>
                      setMessage("Password recovery will be available soon.")
                    }
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <div className="password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {isSignup && (
              <div className="form-field">
                <label htmlFor="confirmPassword">
                  Confirm Password <span className="required">*</span>
                </label>

                <div className="password-wrapper">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}

            {!isSignup ? (
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="rememberDevice"
                  checked={formData.rememberDevice}
                  onChange={handleChange}
                />
                <span>Remember this device</span>
              </label>
            ) : (
              <label className="checkbox-row consent-row">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <span>
                  I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>. I understand that
                  AI guidance supports triage and does not replace certified
                  veterinary diagnosis.
                </span>
              </label>
            )}

            {message && (
              <p className="auth-message" role="status">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isSignup
                  ? "Creating account..."
                  : "Logging in..."
                : isSignup
                  ? "Create Account →"
                  : "Log In →"}
            </button>
          </form>

          <p className="auth-switch">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <Link to="/farmer/login">Log in here</Link>
              </>
            ) : (
              <>
                New to Kaza Care?{" "}
                <Link to="/farmer/signup">Create a free farmer account</Link>
              </>
            )}
          </p>
        </section>
      </main>

      <footer className="auth-footer">
        © 2026 Kaza Care. All rights reserved.
      </footer>
    </div>
  );
}

export default FarmerAuth;
