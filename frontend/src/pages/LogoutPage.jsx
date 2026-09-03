import { Link } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import useAuth from "../context/useAuth";

function LogoutPage({ onLogout }) {
  const { setCustomer } = useAuth();

  const handleLogout = async () => {
    await axiosInstance.post("/customers/logout");
    setCustomer(null);
    onLogout?.();
  };

  return (
    <div className="logout-wrapper">
      <div className="logout-card">
        <div className="logout-icon">✓</div>
        <p className="eyebrow">Session closed</p>
        <h2>You have been logged out</h2>
        <p className="logout-copy">
          Thank you for shopping with Shopsy. Your next visit is just a click
          away.
        </p>
        <div className="cta-row center-row">
          <Link to="/login" className="primary-btn" onClick={handleLogout}>
            Login again
          </Link>
          <Link to="/" className="ghost-btn">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
