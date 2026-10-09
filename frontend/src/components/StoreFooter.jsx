import { Link } from "react-router-dom";

function StoreFooter({ compact = false }) {
  return (
    <footer className={`store-footer${compact ? " store-footer-compact" : ""}`}>
      {!compact && (
        <div>
          <Link to="/" className="brand brand-dark">
            <span className="brand-mark">S</span>
            Shopsy
          </Link>
          <p>Thoughtful products, clear policies, and a shopping experience built around trust.</p>
        </div>
      )}
      <nav aria-label="Company information">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/shipping-returns">Shipping & returns</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <small>© {new Date().getFullYear()} Shopsy. All rights reserved.</small>
    </footer>
  );
}

export default StoreFooter;
