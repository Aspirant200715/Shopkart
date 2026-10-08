import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import useAuth from "../context/useAuth";

function LoginPage() {
  const navigate = useNavigate();
  const { setCustomer } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/customers/login", formData);
      setCustomer(response.data.customer);
      navigate("/");
    } catch (error) {
      window.alert(error.response?.data?.message || "Unable to log in");
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
        <div className="auth-watermark" aria-hidden="true">S</div>
        <div className="auth-orbit orbit-one" aria-hidden="true" />
        <div className="auth-orbit orbit-two" aria-hidden="true" />
        <div className="auth-sun auth-sun-one" aria-hidden="true" />
        <div className="auth-sun auth-sun-two" aria-hidden="true" />
        <div className="auth-copy auth-copy-centered">
          <div className="auth-kicker">
            <span className="auth-kicker-line" />
            <span>Welcome to Shopsy</span>
          </div>
          <h1>
            Everything you
            <br />
            love, in one place.
          </h1>
          <p>
            Shop thoughtfully selected products for your home, lifestyle, and
            everyday needs.
          </p>

          <div className="auth-visual">
            <div className="auth-showcase-card primary-card">
              <span>Featured collection</span>
              <strong>Aura Chair</strong>
              <small>Comfort for every room</small>
            </div>

            <div className="auth-showcase-card secondary-card">
              <span>New arrivals</span>
              <strong>Daily essentials</strong>
              <small>Made for your routine</small>
            </div>
            <div className="auth-note">Free shipping on selected orders</div>
          </div>

          <ul className="feature-list">
            <li>Handpicked seasonal drops</li>
            <li>Fast, easy browsing</li>
            <li>Trusted premium quality</li>
          </ul>
        </div>
      </div>

      <div className="auth-card-wrap">
        <div className="auth-side-label">MEMBERS AREA <span>—</span> 2026</div>
        <div className="auth-card">
          <div className="auth-header">
            <p className="eyebrow">Welcome back</p>
            <h2>Welcome back.</h2>
            <p className="auth-subtitle">
              Sign in to pick up where you left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <div className="form-row">
              <label className="remember-box">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/signup" className="mini-link">
                Need help?
              </Link>
            </div>

            <button type="submit" className="primary-btn wide-btn">
              Login
            </button>
          </form>

          <p className="auth-footer">
            New here?{" "}
            <Link to="/signup" className="mini-link">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
