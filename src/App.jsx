import { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [returnTo, setReturnTo] = useState('products');
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const openCart = () => {
    setReturnTo(page === 'cart' ? returnTo : page);
    setPage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      {page === 'home' ? (
        <main className="landing-page">
          <div className="landing-overlay" />
          <header className="landing-header">
            <a className="brand brand-light" href="#home" onClick={() => setPage('home')}>
              <span className="brand-icon">✿</span> Paradise Nursery
            </a>
            <button className="text-link" onClick={() => setPage('products')}>Explore plants ↗</button>
          </header>
          <section className="hero-content" id="home">
            <p className="eyebrow eyebrow-light">GROW SOMETHING GOOD</p>
            <h1>Bring nature<br /><em>home.</em></h1>
            <p className="hero-copy">
              Thoughtfully chosen houseplants to make your space feel fresher,
              softer, and more alive.
            </p>
            <button className="primary-button" onClick={() => setPage('products')}>
              Get Started <span aria-hidden="true">→</span>
            </button>
            <div className="hero-note"><span>✦</span> Good plants. Good energy. Everyday.</div>
          </section>
          <div className="hero-bottom"><span>PLANTS FOR EVERY SPACE</span><span>01 / 03</span></div>
        </main>
      ) : (
        <>
          <header className="site-header">
            <button className="brand" onClick={() => setPage('home')}>
              <span className="brand-icon">✿</span> Paradise Nursery
            </button>
            <nav className="site-nav" aria-label="Main navigation">
              <button className={page === 'products' ? 'nav-active' : ''} onClick={() => setPage('products')}>Shop plants</button>
              <button onClick={() => setPage('home')}>Home</button>
              <button onClick={openCart} className="cart-nav">
                <span aria-hidden="true">🛒</span> Cart <span className="cart-count">{cartCount}</span>
              </button>
            </nav>
          </header>
          {page === 'products' && <ProductList onOpenCart={openCart} />}
          {page === 'cart' && <CartItem onContinueShopping={() => setPage(returnTo === 'home' ? 'products' : returnTo)} />}
          <AboutUs />
          <footer className="site-footer">
            <span>✿ Paradise Nursery</span>
            <span>Grow at your own pace.</span>
            <span>© {new Date().getFullYear()} Paradise Nursery</span>
          </footer>
        </>
      )}
    </div>
  );
}