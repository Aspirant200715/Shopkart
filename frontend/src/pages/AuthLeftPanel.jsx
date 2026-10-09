import { Link } from "react-router-dom";
import styles from "./AuthLeftPanel.module.css";
import heroImg from "../assets/auth-hero.svg";

const shoppingBagImage = "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=85";

function AuthLeftPanel({ variant = "login" }) {
  return (
    <div className={styles.leftPanel}>
      {/* Hero background image */}
      <img src={heroImg} alt="" className={styles.heroImage} aria-hidden="true" />

      <div className={styles.logoWrapper} style={{ position: "relative", zIndex: 1 }}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>S</span>
          Shopsy
        </Link>
      </div>

      <div className={styles.content} style={{ position: "relative", zIndex: 1 }}>
        <span className={styles.kicker}>{variant === "signup" ? "A better way to shop" : "Welcome to Shopsy"}</span>
        <h1 className={styles.heading}>{variant === "signup" ? "Find things that feel like you." : "Everything you love, in one place."}</h1>
        <p className={styles.subtext}>
          Shop thoughtfully selected products for your home, lifestyle, and everyday needs.
        </p>
        <div className={styles.showcase}>
          <div className={styles.showcaseCopy}>
            <span className={styles.showcaseLabel}>Designed for daily living</span>
            <strong>Small details. Better days.</strong>
          </div>
          <img
            src={shoppingBagImage}
            alt="Teal shopping bag"
            className={styles.showcaseImage}
            onError={(event) => {
              event.currentTarget.src = heroImg;
            }}
          />
        </div>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureTag}>Featured</div>
            <div className={styles.featureTitle}>Aura Chair</div>
            <div className={styles.featureDesc}>Comfort for every room</div>
          </div>
          <div className={`${styles.featureCard} ${styles.featureCardAlt}`}>
            <div className={styles.featureTag}>New arrivals</div>
            <div className={styles.featureTitle}>Daily essentials</div>
            <div className={styles.featureDesc}>Made for your routine</div>
          </div>
        </div>
        <div className={styles.adminTeaser}>
          <div>
            <span className={styles.adminTeaserLabel}>Admin Studio</span>
            <strong>Catalog, orders &amp; revenue in one view.</strong>
          </div>
          <div className={styles.adminTeaserTiles} aria-hidden="true">
            <span>24<strong>Items</strong></span>
            <span>128<strong>Orders</strong></span>
            <span>₹4.8L<strong>Sales</strong></span>
          </div>
        </div>
      </div>

      <div className={styles.footer} style={{ position: "relative", zIndex: 1 }}>
        <span>✓ Free shipping</span><span>✓ Curated collections</span><span>✓ Easy checkout</span>
      </div>

      {/* Decorative elements */}
      <div className={styles.decorativeLetter}>S</div>
      <div className={styles.blurredCircle}></div>
    </div>
  );
}

export default AuthLeftPanel;
