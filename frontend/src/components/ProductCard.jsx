import { useState } from "react";
import { Link } from "react-router-dom";
import { addToWishlist } from "../services/productApi";
import formatPrice from "../utils/formatPrice";

function ProductCard({ product, onRemove, removing = false }) {
  const isOutOfStock = product.stock === 0;
  const isWishlistCard = typeof onRemove === "function";
  const [saving, setSaving] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [imageFailed, setImageFailed] = useState(!product.image);

  const handleWishlist = async () => {
    if (saving || added) return;

    setSaving(true);
    setError("");

    try {
      await addToWishlist(product._id);
      setAdded(true);
    } catch (requestError) {
      setError(
        requestError.response?.status === 409
          ? "Already in your wishlist."
          : requestError.response?.data?.message ||
              "Unable to save product. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="catalog-card">
      <div className="catalog-image-wrap">
        {imageFailed ? (
          <div className="catalog-image-placeholder" aria-label={product.name}>
            <span>{product.name.slice(0, 1).toUpperCase()}</span>
            <small>Shopsy selection</small>
          </div>
        ) : (
          <img
            className="catalog-image"
            src={product.image}
            alt={product.name}
            onError={() => setImageFailed(true)}
          />
        )}
        <span className={`stock-chip ${isOutOfStock ? "stock-chip-out" : ""}`}>
          {isOutOfStock ? "Sold out" : "In stock"}
        </span>
      </div>
      <div className="catalog-info">
        <p className="catalog-category">{product.category}</p>
        <h2>{product.name}</h2>
        <p className="catalog-description">{product.description}</p>
        <div className="catalog-meta">
          <strong>{formatPrice(product.price)}</strong>
          <span>
            {isOutOfStock ? "Unavailable" : `${product.stock} units left`}
          </span>
        </div>
        <Link
          className="primary-btn small-btn catalog-link"
          to={`/products/${product._id}`}
        >
          View details <span className="arrow-icon arrow-right" aria-hidden="true" />
        </Link>
        {isWishlistCard ? (
          <button
            className="wishlist-action"
            disabled={removing}
            onClick={() => onRemove(product._id)}
            type="button"
          >
            {removing ? "Removing..." : "Remove from Wishlist"}
          </button>
        ) : (
          <button
            className="wishlist-action"
            disabled={saving || added}
            onClick={handleWishlist}
            type="button"
          >
            {saving
              ? "Saving..."
              : added
                ? "Added to Wishlist"
                : "Add to Wishlist"}
          </button>
        )}
        {error && <p className="wishlist-error">{error}</p>}
      </div>
    </article>
  );
}

export default ProductCard;
