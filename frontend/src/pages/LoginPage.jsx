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
        <div className="auth-copy auth-copy-centered">
          <span className="pill">Curated for bright living</span>
          <h1>Shop better, live lighter.</h1>
          <p>
            Discover design-led essentials for your home, wardrobe, and everyday
            flow.
          </p>

          <div className="auth-visual">
            <div className="auth-showcase-card primary-card">
              <span>Best seller</span>
              <strong>Aura Chair</strong>
              <small>$289</small>
            </div>

            <div className="auth-showcase-card secondary-card">
              <span>Fresh drop</span>
              <strong>Soft textures</strong>
              <small>New season</small>
            </div>
          </div>

          <ul className="feature-list">
            <li>Handpicked seasonal drops</li>
            <li>Fast, easy browsing</li>
            <li>Trusted premium quality</li>
          </ul>
        </div>
      </div>

      <div className="auth-card-wrap">
        <div className="auth-card">
          <div className="auth-header">
            <p className="eyebrow">Welcome back</p>
            <h2>Login to Shopsy</h2>
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

          <div className="divider">
            <span>or</span>
          </div>

          <button type="button" className="ghost-btn wide-btn social-btn">
            Continue with Google
          </button>

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
