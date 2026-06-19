import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Menu.css";
import boba1 from "../assets/boba1.png";
import boba2 from "../assets/boba2.png";
import boba3 from "../assets/boba3.png";
import Matcha from "../assets/matcha_latte.png";
import Strawberry from "../assets/Strawberry_Milk_Tea.png";
import Icecoffee from "../assets/icecoffee.png";
const products = [
  {
    id: 1,
    name: "Sunrise Popping",
    price: "M69.99",
    category: "Signature",
    description: "Bold black tea meets creamy milk with chewy tapioca pearls and golden caramel drizzle.",
    image: boba1,
    popularity: 98,
    isNew: false,
    isPopular: true,
    size: "Regular",
    calories: 380,
  },
  {
    id: 2,
    name: "Blueberry Float",
    price: "M79.99",
    category: "Fruity",
    description: "Dreamy taro base swirled with coconut cream and popping blueberry boba.",
    image: boba2,
    popularity: 95,
    isNew: true,
    isPopular: true,
    size: "Regular",
    calories: 350,
  },
  {
    id: 3,
    name: "Cloudy Chai",
    price: "M89.99",
    category: "Spiced",
    description: "Warming spiced chai with velvety milk and soft brown sugar pearls.",
    image: boba3,
    popularity: 92,
    isNew: false,
    isPopular: true,
    size: "Regular",
    calories: 420,
  },
  {
    id: 4,
    name: "Matcha Dream",
    price: "M27.00",
    category: "Premium",
    description: "Ceremonial grade matcha with oat milk and honey pearls.",
    image: Matcha,
    popularity: 88,
    isNew: true,
    isPopular: false,
    size: "Regular",
    calories: 340,
  },
  {
    id: 5,
    name: "Strawberry Kiss",
    price: "M22.00",
    category: "Fruity",
    description: "Fresh strawberry puree with lychee popping boba and coconut jelly.",
    image: Strawberry,
    popularity: 91,
    isNew: false,
    isPopular: true,
    size: "Regular",
    calories: 310,
  },
  {
    id: 6,
    name: "Oreo Brulee",
    price: "M22.00",
    category: "Dessert",
    description: "Crushed oreo cookies with caramelized brulee cream and tapioca.",
    image: Icecoffee,
    popularity: 96,
    isNew: false,
    isPopular: true,
    size: "Large",
    calories: 520,
  },
];

const categories = ["All", "Signature", "Fruity", "Spiced", "Premium", "Dessert", "Classic"];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const filteredProducts = products
    .filter(product => selectedCategory === "All" || product.category === selectedCategory)
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "popularity") return b.popularity - a.popularity;
      if (sortBy === "price-low") return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      if (sortBy === "price-high") return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    setAddedToCart({ ...addedToCart, [product.id]: true });
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const removeFromCart = (productId) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.slice(1)), 0).toFixed(2);
  };

  return (
    <div className="menu-page">
      <Navbar />

      {/* Hero Section */}
      <div className="menu-hero">
        <div className="menu-hero-content">
          <h1 className="menu-hero-title">Our Menu</h1>
          <p className="menu-hero-subtitle">Crafted with love, served with joy</p>
          <div className="menu-hero-stats">
            <div className="stat">
              <span className="stat-number">{products.length}</span>
              <span className="stat-label">Drinks</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Natural</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Fresh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="menu-filters">
        <div className="filters-container">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="categories-scroll">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popularity">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>

          <button className="cart-icon-btn" onClick={() => setShowCart(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className={`product-card ${addedToCart[product.id] ? "added" : ""}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {product.isNew && <span className="product-badge new">NEW</span>}
            {product.isPopular && !product.isNew && <span className="product-badge popular">POPULAR</span>}

            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-overlay">
                <button className="quick-view-btn">Quick View</button>
              </div>
            </div>

            <div className="product-info">
              <div className="product-header">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">{product.price}</span>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <span className="product-category">{product.category}</span>
                <span className="product-calories">{product.calories} cal</span>
                <span className="product-size">{product.size}</span>
              </div>
              <button
                className={`add-to-cart-btn ${addedToCart[product.id] ? "added" : ""}`}
                onClick={() => addToCart(product)}
              >
                {addedToCart[product.id] ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Added!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Order</h2>
              <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.price}</p>
                    </div>
                    <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>${getCartTotal()}</span>
                </div>
                <button className="checkout-btn">Checkout →</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}