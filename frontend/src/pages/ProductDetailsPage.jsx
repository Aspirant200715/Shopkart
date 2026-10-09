import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../services/productApi";
import formatPrice from "../utils/formatPrice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import CartNavLink from "../components/CartNavLink";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [cartError, setCartError] = useState("");
  const [adding, setAdding] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    fetchProduct(id, controller.signal)
      .then((loadedProduct) => {
        setProduct(loadedProduct);
        setError("");
      })
      .catch((requestError) => {
        if (
          requestError.name !== "CanceledError" &&
          requestError.code !== "ERR_CANCELED"
        ) {
          setError(
            requestError.response?.data?.message ||
              "Something went wrong while loading this product.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  return (
    <div className="home-shell catalog-shell">
      <header className="topbar">
        <Link to="/" className="brand brand-dark">
          <span className="brand-mark">S</span>Shopsy
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link className="active-nav" to="/products">
            Products
          </Link>
          <Link to="/wishlist">Wishlist</Link>
          <CartNavLink />
          <Link to="/orders">Orders</Link>
          <Link to="/logout">Logout</Link>
        </nav>
        <Link to="/products" className="ghost-btn small-btn">
          Back to shop
        </Link>
      </header>

      <main className="details-page">
        {loading && (
          <div className="state-panel">
            <span className="loader-dot" />
            Loading product...
          </div>
        )}
        {!loading && error && (
          <div className="state-panel state-error">
            <strong>We could not find that product.</strong>
            <span>{error}</span>
            <Link className="primary-btn small-btn" to="/products">
              Browse products
            </Link>
          </div>
        )}
        {!loading && !error && product && (
          <article className="details-layout">
            <div className="details-image-panel">
              <div className="details-image-fallback">{product.name}</div>
              <img
                src={product.image}
                alt=""
                onError={(event) => event.currentTarget.remove()}
              />
            </div>
            <div className="details-copy">
              <p className="eyebrow">{product.category}</p>
              <h1>{product.name}</h1>
              <p className="details-description">{product.description}</p>
              <div className="details-price">{formatPrice(product.price)}</div>
              <div className="details-stock">
                <span
                  className={
                    product.stock > 0
                      ? "stock-mark"
                      : "stock-mark stock-mark-out"
                  }
                >
                  {product.stock > 0 ? "Available now" : "Currently sold out"}
                </span>
                <span>
                  {product.stock > 0
                    ? `${product.stock} units ready to ship`
                    : "Check back soon for a restock"}
                </span>
              </div>
              <button
                className="primary-btn details-cart"
                disabled={product.stock === 0 || adding}
                onClick={async () => {
                  setAdding(true);
                  setCartError("");
                  try {
                    await dispatch(addToCart(product._id)).unwrap();
                    setAdded(true);
                  } catch (requestError) {
                    setCartError(
                      typeof requestError === "string"
                        ? requestError
                        : requestError?.response?.data?.message ||
                            requestError?.message ||
                            "Unable to add product to cart.",
                    );
                  } finally {
                    setAdding(false);
                  }
                }}
                type="button"
              >
                {adding
                  ? "Adding..."
                  : added
                    ? "Added to your cart"
                    : "Add to cart"}
              </button>
              {added && (
                <div className="added-cart-actions">
                  <p className="added-note">Added to your cart.</p>
                  <Link className="view-cart-link" to="/cart">
                    View cart{" "}
                    <span
                      className="arrow-icon arrow-right"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              )}
              {cartError && <p className="state-error">{cartError}</p>}
              <Link className="details-back" to="/products">
                <svg
                  className="back-arrow"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M16 10H4M9 5l-5 5 5 5" />
                </svg>
                Continue browsing
              </Link>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}

export default ProductDetailsPage;
