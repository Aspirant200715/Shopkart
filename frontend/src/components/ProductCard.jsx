import { useState } from "react";
import { Link } from "react-router-dom";
import { addToWishlist } from "../services/productApi";
import formatPrice from "../utils/formatPrice";

function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0;
  const [saving, setSaving] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

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
        <img
          className="catalog-image"
          src={product.image}
          alt=""
          onError={(event) => event.currentTarget.remove()}
        />
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
          View details <span aria-hidden="true">-&gt;</span>
        </Link>
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
        {error && <p className="wishlist-error">{error}</p>}
      </div>
    </article>
  );
}

export default ProductCard;
