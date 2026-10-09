import { Link, useLocation } from "react-router-dom";
import StoreFooter from "../components/StoreFooter";

const pages = {
  "/privacy": {
    eyebrow: "Your privacy matters",
    title: "Privacy policy.",
    intro: "This policy explains what Shopsy collects, why we use it, and the choices available to you.",
    sections: [
      ["Information we collect", "We collect account details such as your name, email address, phone number, shipping address, and order information when you use the store. Payment details are handled by our payment provider and are not stored by Shopsy."],
      ["How we use information", "We use information to create your account, process orders, provide support, prevent fraud, and improve the store. We do not sell personal information."],
      ["Cookies and sessions", "Shopsy uses essential cookies to keep you signed in and protect authenticated requests. You can clear cookies in your browser, but some account and checkout features may stop working."],
      ["Your choices", "You may request access to, correction of, or deletion of your account information by contacting us. We may retain information needed for tax, fraud-prevention, or legal obligations."],
    ],
  },
  "/terms": {
    eyebrow: "A clear agreement",
    title: "Terms of service.",
    intro: "By using Shopsy, you agree to use the store lawfully and to provide accurate information for your account and orders.",
    sections: [
      ["Accounts", "Keep your login details private and tell us if you notice unauthorized access. You are responsible for activity performed through your account."],
      ["Orders and payment", "Prices, availability, and delivery estimates may change. An order is confirmed only after payment is successfully verified. We may cancel an order when stock, pricing, or payment information cannot be validated."],
      ["Product information", "We work to keep product descriptions, images, and stock information accurate. Small variations may occur between displayed imagery and the delivered product."],
      ["Acceptable use", "Do not misuse the store, attempt unauthorized access, interfere with checkout, or submit fraudulent orders."],
    ],
  },
  "/shipping-returns": {
    eyebrow: "Delivery, made simple",
    title: "Shipping & returns.",
    intro: "Here is what to expect after your payment is confirmed.",
    sections: [
      ["Shipping", "Orders are prepared after successful payment verification. Delivery times depend on the destination and the shipping partner. We will use the shipping details submitted at checkout, so please review them carefully."],
      ["Order status", "You can follow progress from your Orders page. Statuses move from Placed to Confirmed, Shipped, and Delivered as fulfilment progresses."],
      ["Returns", "Contact us as soon as possible if an item arrives damaged, incorrect, or materially different from its listing. Include your order number and photos where relevant so we can review the request."],
      ["Refunds", "Approved refunds are sent through the original payment method. Processing time may depend on your bank or payment provider."],
    ],
  },
  "/contact": {
    eyebrow: "We are here to help",
    title: "Contact Shopsy.",
    intro: "Need help with an order, product, payment, or account? Send us the details and our support team will review it.",
    sections: [
      ["Customer support", "Email support@shopsy.example with your order number, the email on your account, and a short description of the issue. Never send your password or full payment credentials."],
      ["Order questions", "For the fastest response, include the order number shown on your Orders page. We aim to respond within two business days."],
      ["Business enquiries", "For partnerships and product enquiries, email hello@shopsy.example."],
    ],
  },
};

function InformationPage() {
  const { pathname } = useLocation();
  const page = pages[pathname] || pages["/privacy"];

  return (
    <div className="home-shell information-shell">
      <header className="topbar">
        <Link to="/" className="brand brand-dark"><span className="brand-mark">S</span>Shopsy</Link>
        <nav className="nav-links">
          <Link to="/">Storefront</Link>
          <Link to="/login">Sign in</Link>
        </nav>
      </header>
      <main className="information-page">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="information-intro">{page.intro}</p>
        <div className="information-grid">
          {page.sections.map(([heading, text]) => (
            <section className="information-card" key={heading}>
              <h2>{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
        <p className="information-note">Last updated: October 9, 2026. These pages are general store information and should be reviewed for your final business, legal, and regional requirements before launch.</p>
      </main>
      <StoreFooter />
    </div>
  );
}

export default InformationPage;
