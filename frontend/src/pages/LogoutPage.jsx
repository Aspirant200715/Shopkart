import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import useAuth from "../context/useAuth";
import { useEffect, useState } from "react";

function LogoutPage() {
  const navigate = useNavigate();
  const { setCustomer } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setCustomer(null);

    axiosInstance
      .post("/customers/logout")
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              "Unable to close your session. Please try again.",
          );
        }
      })
      .finally(() => {
        active = false;
      });

    return () => {
      active = false;
    };
  }, [setCustomer]);

  return (
    <div className="logout-wrapper">
      <div className="logout-card">
        <div className="logout-icon">✓</div>
        <p className="eyebrow">Session closed</p>
        <h2>You have been logged out</h2>
        <p className="logout-copy">
          {error ||
            "Thank you for shopping with Shopsy. Your next visit is just a click away."}
        </p>
        <div className="cta-row center-row">
          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate("/login")}
          >
            Login again
          </button>
          <button
            type="button"
            className="ghost-btn"
            onClick={() => navigate("/login")}
          >
            Back home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
