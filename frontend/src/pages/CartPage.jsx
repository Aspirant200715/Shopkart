import { useState } from "react";
import { Link } from "react-router-dom";
import formatPrice from "../utils/formatPrice";
import CartNavLink from "../components/CartNavLink";
import { useDispatch, useSelector} from "react-redux";
import {
  updateQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const {cartItems,loading,error} = useSelector((state)=>state.cart)
  const [draftQuantities, setDraftQuantities] = useState({});
  const [quantityErrors, setQuantityErrors] = useState({});
  const [removeErrors, setRemoveErrors] = useState({});

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  const saveQuantity = async (product, value) => {
    const quantity = Number(value);
    const productId = product._id;

    if (!Number.isInteger(quantity) || quantity < 1) {
      setQuantityErrors((current) => ({
        ...current,
        [productId]: "Enter a quantity of at least 1.",
      }));
      return;
    }

    setQuantityErrors((current) => ({ ...current, [productId]: "" }));

    try {
      await dispatch(updateQuantity({productId, quantity})).unwrap();
      setDraftQuantities((current) => ({ ...current, [productId]: quantity }));
    } catch (requestError) {
      setDraftQuantities((current) => ({
        ...current,
        [productId]:
          cartItems.find((item) => item.product?._id === productId)?.quantity ||
          1,
      }));
      setQuantityErrors((current) => ({
        ...current,
        [productId]:
          requestError.response?.data?.message ||
          `Only ${product.stock} units are currently in stock.`,
      }));
    }
  };

  const handleRemove = async (productId) => {
    setRemoveErrors((current) => ({ ...current, [productId]: "" }));

    try {
      await dispatch(removeFromCart(productId)).unwrap();
    } catch (requestError) {
      setRemoveErrors((current) => ({
        ...current,
        [productId]:
          requestError.response?.data?.message ||
          "Unable to remove this item. Please try again.",
      }));
    }
  };

  return (
    <div className="home-shell catalog-shell">
      <header className="topbar">
        <Link to="/" className="brand brand-dark">
          <span className="brand-mark">S</span>Shopsy
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <CartNavLink />
          <Link to="/logout">Logout</Link>
        </nav>
      </header>

      <main className="cart-page">
        <section className="catalog-heading">
          <div>
            <p className="eyebrow">Your selection</p>
            <h1>Your cart.</h1>
            <p>Review your pieces before you make them yours.</p>
          </div>
          <Link to="/products" className="ghost-btn small-btn">
            Continue shopping
          </Link>
        </section>

        {loading && (
          <div className="state-panel">
            <span className="loader-dot" />
            Loading your cart...
          </div>
        )}
        {!loading && error && (
          <div className="state-panel state-error">
            <strong>Could not load your cart.</strong>
            <span>{error}</span>
          </div>
        )}
        {!loading && !error && cartItems.length === 0 && (
          <div className="state-panel">
            <strong>Your cart is empty.</strong>
            <span>Find something beautiful to bring home.</span>
            <Link to="/products" className="primary-btn small-btn">
              Browse products
            </Link>
          </div>
        )}
        {!loading && !error && cartItems.length > 0 && (
          <div className="cart-layout">
            <section className="cart-list">
              {cartItems.map((item) => {
                const product = item.product;
                return (
                  <article className="cart-item" key={product._id}>
                    <div className="cart-item-image">
                      <img
                        src={product.image}
                        alt=""
                        onError={(event) => event.currentTarget.remove()}
                      />
                    </div>
                    <div className="cart-item-copy">
                      <p className="catalog-category">{product.category}</p>
                      <h2>{product.name}</h2>
                      <strong>{formatPrice(product.price)}</strong>
                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <span className="quantity-label">Quantity</span>
                          <div className="quantity-stepper">
                            <button
                              type="button"
                              aria-label={`Decrease ${product.name} quantity`}
                              disabled={
                                product.stock < 1 ||
                                (draftQuantities[product._id] ??
                                  item.quantity) <= 1
                              }
                              onClick={() =>
                                saveQuantity(
                                  product,
                                  (draftQuantities[product._id] ??
                                    item.quantity) - 1,
                                )
                              }
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={
                                draftQuantities[product._id] ?? item.quantity
                              }
                              disabled={product.stock < 1}
                              aria-label={`${product.name} quantity`}
                              onChange={(event) =>
                                setDraftQuantities((current) => ({
                                  ...current,
                                  [product._id]: event.target.value,
                                }))
                              }
                              onBlur={(event) =>
                                saveQuantity(product, event.target.value)
                              }
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.currentTarget.blur();
                                }
                              }}
                            />
                            <button
                              type="button"
                              aria-label={`Increase ${product.name} quantity`}
                              disabled={product.stock < 1}
                              onClick={() =>
                                saveQuantity(
                                  product,
                                  Number(
                                    draftQuantities[product._id] ??
                                      item.quantity,
                                  ) + 1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <span className="stock-hint">
                            {product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of stock"}
                          </span>
                          {product.stock < 1 && (
                            <span className="quantity-error" role="status">
                              This item is currently out of stock. You can
                              remove it without affecting the rest of your
                              cart.
                            </span>
                          )}
                          {quantityErrors[product._id] && (
                            <span className="quantity-error" role="alert">
                              {quantityErrors[product._id]}
                            </span>
                          )}
                        </div>
                        <button
                          className="cart-remove"
                          type="button"
                          onClick={() => handleRemove(product._id)}
                        >
                          Remove
                        </button>
                        {removeErrors[product._id] && (
                          <span className="quantity-error" role="alert">
                            {removeErrors[product._id]}
                          </span>
                        )}
                      </div>
                    </div>
                    <strong className="cart-item-total">
                      {formatPrice(product.price * item.quantity)}
                    </strong>
                  </article>
                );
              })}
            </section>
            <aside className="cart-summary">
              <p className="eyebrow">Order summary</p>
              <div>
                <span>Items</span>
                <strong>{cartItems.length}</strong>
              </div>
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="primary-btn wide-btn" type="button">
                Checkout
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;
