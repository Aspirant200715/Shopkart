import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";
import formatPrice from "../utils/formatPrice";
import { fetchWishlist, removeFromWishlist } from "../services/productApi";

function WishlistPage() {
  const { customer } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchWishlist(controller.signal)
      .then((data) => setWishlist(data.wishlist || []))
      .catch((requestError) => {
        if (
          requestError.name !== "CanceledError" &&
          requestError.code !== "ERR_CANCELED"
        ) {
          setError(
            requestError.response?.data?.message || "Unable to load wishlist.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [retryKey]);

  const handleRemove = async (productId) => {
    setRemovingId(productId);
    setError("");

    try {
      await removeFromWishlist(productId);
      setWishlist((currentWishlist) =>
        currentWishlist.filter((product) => product._id !== productId),
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to remove product. Please try again.",
      );
    } finally {
      setRemovingId("");
    }
  };

  return (
    <div className="home-shell catalog-shell">
      <header className="topbar">
        <Link to="/" className="brand brand-dark">
          <span className="brand-mark">S</span>
          Shopsy
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link className="active-nav" to="/wishlist">
            Wishlist
          </Link>
          <Link to="/logout">Logout</Link>
        </nav>
        <div className="nav-actions">
          <span className="user-greeting">
            Hi, {customer?.fullname?.split(" ")[0]}
          </span>
        </div>
      </header>

      <main className="wishlist-page">
        <section className="wishlist-heading">
          <div>
            <p className="eyebrow">Saved for later</p>
            <h1>My Wishlist</h1>
            <p>Keep the pieces you love close, then come back when ready.</p>
          </div>
          <div className="wishlist-count">
            {loading ? "..." : `${wishlist.length} products saved`}
          </div>
        </section>

        {loading && (
          <div className="state-panel">
            <span className="loader-dot" />
            Loading your wishlist...
          </div>
        )}

        {!loading && error && (
          <div className="state-panel state-error">
            <strong>Something went wrong.</strong>
            <span>{error}</span>
            <button
              className="primary-btn small-btn"
              onClick={() => {
                setLoading(true);
                setError("");
                setRetryKey((current) => current + 1);
              }}
              type="button"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && wishlist.length === 0 && (
          <div className="state-panel">
            <strong>Your wishlist is empty</strong>
            <span>Save products you love and find them here later.</span>
            <Link className="primary-btn small-btn" to="/products">
              Browse products
            </Link>
          </div>
        )}

        {!loading && !error && wishlist.length > 0 && (
          <section className="wishlist-grid">
            {wishlist.map((product) => {
              const isOutOfStock = product.stock === 0;
              const isRemoving = removingId === product._id;

              return (
                <article className="wishlist-card" key={product._id}>
                  <div className="wishlist-image-wrap">
                    <img
                      className="wishlist-image"
                      src={product.image}
                      alt={product.name}
                      onError={(event) => event.currentTarget.remove()}
                    />
                  </div>
                  <div className="wishlist-info">
                    <p className="catalog-category">{product.category}</p>
                    <h2>{product.name}</h2>
                    <p className="wishlist-price">
                      {formatPrice(product.price)}
                    </p>
                    <p className="wishlist-stock">
                      {isOutOfStock
                        ? "Currently sold out"
                        : `${product.stock} units left`}
                    </p>
                    <div className="wishlist-actions">
                      <Link
                        className="primary-btn small-btn"
                        to={`/products/${product._id}`}
                      >
                        View details
                      </Link>
                      <button
                        className="ghost-btn small-btn"
                        disabled={isRemoving}
                        onClick={() => handleRemove(product._id)}
                        type="button"
                      >
                        {isRemoving ? "Removing..." : "Remove from Wishlist"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}

export default WishlistPage;
