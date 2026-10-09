import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../axiosCalls/axios";
import AuthLeftPanel from "./AuthLeftPanel";
import StoreFooter from "../components/StoreFooter";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "", phone: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.fullname.trim().length < 2) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 7) {
      toast.error("Password must be at least 7 characters.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone.trim())) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      await axiosInstance.post("/customers/register", formData);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      const message = error.response
        ? error.response.data?.message || "The account details could not be accepted."
        : "The server is unavailable. Please try again in a moment.";
      toast.error(message);
    }
  };

  return (
    <div className="auth-page auth-page-modern">
      <AuthLeftPanel variant="signup" />
      <main className="auth-form-side">
        <nav className="auth-simple-nav">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link className="is-active" to="/signup">Signup</Link>
        </nav>
        <section className="auth-form-card signup-card">
          <p className="eyebrow">Create your account</p>
          <h1>Make it yours.</h1>
          <p className="auth-form-intro">Join Shopsy for thoughtful finds and a smoother way to shop.</p>
          <form onSubmit={handleSubmit} className="auth-form-modern">
            <label className="auth-input"><span>Full name</span><input type="text" name="fullname" placeholder="Aarav Sharma" value={formData.fullname} onChange={handleChange} required /></label>
            <label className="auth-input"><span>Phone number</span><input type="tel" name="phone" placeholder="9876543210" value={formData.phone} onChange={handleChange} required /></label>
            <label className="auth-input"><span>Email address</span><input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required /></label>
            <label className="auth-input"><span>Password</span><input type="password" name="password" placeholder="At least 7 characters" value={formData.password} onChange={handleChange} required /></label>
            <button type="submit" className="primary-btn wide-btn">Create account</button>
          </form>
          <p className="auth-switch">Already a member? <Link to="/login">Log in</Link></p>
        </section>
      </main>
      <StoreFooter compact />
    </div>
  );
}

export default SignupPage;
