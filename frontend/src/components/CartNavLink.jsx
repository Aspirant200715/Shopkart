import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CartNavLink() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);     //derived state from the initial states

  return (
    <Link
      className="cart-nav-link"
      to="/cart"
      aria-label={`Cart, ${itemCount} items`}
    >
      <span className="cart-nav-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="img">
          <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
          <circle cx="10" cy="20" r="1.2" />
          <circle cx="18" cy="20" r="1.2" />
        </svg>
      </span>
      <span>Cart</span>
      <span className="cart-count">{itemCount}</span>
    </Link>
  );
}

export default CartNavLink;
