import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

const categories = ["Home", "Women", "Men", "Beauty", "Tech", "Decor"];

const collections = [
  { name: "Modern Living", tone: "warm", tag: "New season" },
  { name: "Everyday Luxury", tone: "soft", tag: "Top rated" },
  { name: "Creative Desk", tone: "cool", tag: "Fresh drop" },
];

const products = [
  {
    name: "Aura Chair",
    category: "Furniture",
    price: "$289",
    accent: "sunset",
  },
  {
    name: "Luma Lamp",
    category: "Lighting",
    price: "$129",
    accent: "lavender",
  },
  { name: "Nova Bottle", category: "Lifestyle", price: "$48", accent: "lemon" },
  { name: "Terra Hamper", category: "Home", price: "$94", accent: "mint" },
];

const benefits = [
  { value: "24h", label: "fast dispatch" },
  { value: "12k+", label: "happy clients" },
  { value: "4.9", label: "average rating" },
];

const reviews = [
  {
    text: "Clean design, premium feel, and everything feels styled for real living.",
    author: "Mila S.",
  },
  {
    text: "Shopsy feels like a boutique store made for beautiful everyday routines.",
    author: "Rohan K.",
  },
  {
    text: "The product curation is thoughtful and the whole experience feels elevated.",
    author: "Aisha T.",
  },
];

function HomePage() {
  const { customer } = useAuth();

  return (
    <div className="home-shell">
      <header className="topbar">
        <Link to="/" className="brand brand-dark">
          <span className="brand-mark">S</span>
          Shopsy
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/logout">Logout</Link>
        </nav>

        <div className="nav-actions">
          <button type="button" className="ghost-btn small-btn">
            Search
          </button>
          <Link to="/login" className="primary-btn small-btn">
            Login
          </Link>
        </div>
      </header>

      <main className="landing-page">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="pill pill-soft">Fresh essentials</span>
            <h1>Thoughtful pieces for better living.</h1>
            <p>
              Discover elevated home, lifestyle, and wardrobe essentials
              designed to make your everyday feel lighter, smarter, and
              beautifully lived in.
            </p>

            <div className="account-summary">
              <strong>{customer?.fullname}</strong>
              <span>{customer?.email}</span>
            </div>

            <div className="cta-row">
              <Link to="/signup" className="primary-btn">
                Shop now
              </Link>
              <Link to="/login" className="ghost-btn">
                View account
              </Link>
            </div>

            <div className="feature-strip">
              {benefits.map((item) => (
                <div key={item.label} className="feature-item">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual-wrap">
            <div className="hero-product-card big-card">
              <span className="mini-label">Best seller</span>
              <h3>Aura Chair</h3>
              <strong>$289</strong>
              <small>Live beautifully</small>
            </div>

            <div className="floating-pill floating-pill-top">
              <span>4.9/5</span>
              <small>Top rated</small>
            </div>

            <div className="hero-product-card small-card">
              <span className="mini-label">Trending</span>
              <h3>Desk set</h3>
              <strong>$149</strong>
            </div>
          </div>
        </section>

        <section className="category-row">
          {categories.map((category) => (
            <button key={category} type="button" className="category-pill">
              {category}
            </button>
          ))}
        </section>

        <section className="collection-grid">
          {collections.map((item) => (
            <article key={item.name} className={`collection-card ${item.tone}`}>
              <span>{item.tag}</span>
              <h3>{item.name}</h3>
              <Link to="/signup">Shop now</Link>
            </article>
          ))}
        </section>

        <section className="product-showcase">
          <div className="section-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Popular picks</p>
              <h2>Curated for real life</h2>
            </div>
            <Link to="/signup" className="mini-link">
              View all
            </Link>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article key={product.name} className="product-card">
                <div className={`product-visual ${product.accent}`}>
                  <span>New</span>
                </div>
                <div className="product-info">
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <strong>{product.price}</strong>
                    <button type="button">Add</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="promo-band">
          <div className="promo-copy">
            <p className="eyebrow eyebrow-dark">Why Shopsy</p>
            <h2>Beautiful essentials with everyday ease.</h2>
            <p>
              Every product is thoughtfully selected to bring warmth, clarity,
              and effortless quality into your daily routine.
            </p>
          </div>

          <div className="promo-metrics">
            <div>
              <strong>15%</strong>
              <span>member savings</span>
            </div>
            <div>
              <strong>20k+</strong>
              <span>items delivered</span>
            </div>
          </div>
        </section>

        <section className="reviews-wrap">
          <div className="section-heading compact-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Loved by shoppers</p>
              <h2>What people are saying</h2>
            </div>
          </div>

          <div className="review-grid">
            {reviews.map((review) => (
              <article key={review.author} className="review-card">
                <div className="stars">★★★★★</div>
                <p>“{review.text}”</p>
                <strong>{review.author}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="newsletter-card">
          <div>
            <p className="eyebrow eyebrow-dark">Stay in the loop</p>
            <h2>Get fresh drops, early access, and exclusive offers.</h2>
          </div>

          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit" className="primary-btn">
              Join now
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
