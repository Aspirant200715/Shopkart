import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../axiosCalls/axios";
import useAuth from "../context/useAuth";
import AuthLeftPanel from "./AuthLeftPanel";
import StoreFooter from "../components/StoreFooter";

function LoginPage() {
  const navigate = useNavigate();
  const { setCustomer } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/customers/login", formData);
      setCustomer(response.data.customer);
      toast.success("Logged in successfully!");
      navigate(response.data.customer.role === "admin" ? "/admin" : "/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to log in");
    }
  };

  return (
    <div className="auth-page auth-page-modern">
      <AuthLeftPanel />
      <main className="auth-form-side">
        <nav className="auth-simple-nav">
          <Link to="/">Home</Link>
          <Link className="is-active" to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
        <section className="auth-form-card">
          <p className="eyebrow">Welcome back</p>
          <h1>Welcome back.</h1>
          <p className="auth-form-intro">Sign in to pick up where you left off.</p>
          <form onSubmit={handleSubmit} className="auth-form-modern">
            <label className="auth-input">
              <span>Email address</span>
              <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
            </label>
            <label className="auth-input">
              <span>Password</span>
              <input type="password" name="password" placeholder="Your password" value={formData.password} onChange={handleChange} required />
            </label>
            <div className="auth-form-row">
              <label><input type="checkbox" /> Remember me</label>
              <Link to="/signup">Need help?</Link>
            </div>
            <button type="submit" className="primary-btn wide-btn">Login</button>
          </form>
          <p className="auth-switch">New here? <Link to="/signup">Create an account</Link></p>
        </section>
      </main>
      <StoreFooter compact />
    </div>
  );
}

export default LoginPage;
