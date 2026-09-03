import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post("/customers/register", formData);
      navigate("/login");
    } catch (error) {
      window.alert(error.response?.data?.message || "Unable to create account");
    }
  };

  return (
    <div className="auth-page">
      <header className="mini-topbar">
        <Link to="/" className="brand brand-dark">
          <span className="brand-mark">S</span>
          <span className="brand-word">Shopsy</span>
        </Link>
        <nav className="mini-nav">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </header>

      <div className="auth-hero">
        <div className="auth-copy auth-copy-centered">
          <span className="pill">Your new favorite store</span>
          <h1>Join the Shopsy community.</h1>
          <p>
            Build a home and routine that feels elevated, practical, and
            genuinely yours.
          </p>

          <div className="auth-visual">
            <div className="auth-showcase-card primary-card">
              <span>Member perks</span>
              <strong>15% off</strong>
              <small>First order</small>
            </div>

            <div className="auth-showcase-card secondary-card">
              <span>New arrival</span>
              <strong>Soft home edit</strong>
              <small>Curated for you</small>
            </div>
          </div>

          <ul className="feature-list">
            <li>Member-only pricing</li>
            <li>Fresh lifestyle collections</li>
            <li>Seamless shopping experience</li>
          </ul>
        </div>
      </div>

      <div className="auth-card-wrap">
        <div className="auth-card">
          <div className="auth-header">
            <p className="eyebrow">Create account</p>
            <h2>Sign up for Shopsy</h2>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="input-group">
              <span>Full name</span>
              <input
                type="text"
                name="fullname"
                placeholder="Aarav Sharma"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </label>

            <label className="input-group">
              <span>Phone number</span>
              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label className="input-group">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="input-group">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" className="primary-btn wide-btn">
              Create account
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button type="button" className="ghost-btn wide-btn social-btn">
            Sign up with Google
          </button>

          <p className="auth-footer">
            Already a member?{" "}
            <Link to="/login" className="mini-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
