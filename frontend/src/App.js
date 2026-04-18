// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:5000";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);

// const fetchProducts = async () => {
//   const res = await axios.get(`${API}/products`);
//   const data = res.data;
//   const parsed = Array.isArray(data) ? data : data.products || [];
//   const sorted = parsed.sort((a, b) => a.id - b.id); // ✅ id order fix
//   setProducts(sorted);
// };

//   const fetchCart = async () => {
//     const res = await axios.get(`${API}/cart`);
//     setCart(res.data.items || []);
//   };

//   useEffect(() => {
//      console.log("useEffect ran"); 
//     fetchProducts();
//     fetchCart();
//   }, []);

//   const addToCart = async (productId) => {
//     try {
//       await axios.post(`${API}/cart`, {
//         product_id: productId,
//         quantity: 1,
//       });
//       await fetchProducts();
//       await fetchCart();
//     } catch (err) {
//       alert(err.response?.data?.error || "Error adding to cart");
//     }
//   };

//   const updateQty = async (id, qty) => {
//     if (qty <= 0) return removeItem(id);
//     try {
//       await axios.put(`${API}/cart/${id}`, { quantity: qty });
//       await fetchCart();
//       await fetchProducts();
//     } catch (err) {
//       alert(err.response?.data?.error || "Error updating quantity");
//     }
//   };

//   const removeItem = async (id) => {
//     try {
//       await axios.delete(`${API}/cart/${id}`);
//       await fetchCart();
//       await fetchProducts();
//     } catch (err) {
//       alert(err.response?.data?.error || "Error removing item");
//     }
//   };

//   const total = cart.reduce(
//     (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
//     0
//   );

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>🛒 Shopping Cart</h1>
//       <div style={{ display: "flex", gap: "40px" }}>

//         {/* Products */}
//         <div style={{ flex: 1 }}>
//           <h2>Products</h2>
//           {products.map((p) => (
//             <div
//               key={p.id}
//               style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
//             >
//               <h3>{p.name}</h3>
//               <p>Price: ₹{parseFloat(p.price).toFixed(2)}</p>
//               <p>Stock: {p.stock}</p>
//               <button
//                 onClick={() => addToCart(p.id)}
//                 disabled={p.stock === 0}
//                 style={{
//                   opacity: p.stock === 0 ? 0.5 : 1,
//                   cursor: p.stock === 0 ? "not-allowed" : "pointer"
//                 }}
//               >
//                 {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Cart */}
//         <div style={{ flex: 1 }}>
//           <h2>Cart</h2>
//           {cart.length === 0 && <p>Cart is empty</p>}
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               style={{ borderBottom: "1px solid black", marginBottom: "10px", paddingBottom: "10px" }}
//             >
//               <h3>{item.name}</h3>
//               <p>
//                 ₹{parseFloat(item.price).toFixed(2)} × {item.quantity} ={" "}
//                 <strong>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</strong>
//               </p>
//               <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
//               &nbsp;
//               <button onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
//               &nbsp;
//               <button onClick={() => removeItem(item.id)} style={{ color: "red" }}>Remove</button>
//             </div>
//           ))}
//           {cart.length > 0 && (
//             <h2>Total: ₹{total.toFixed(2)}</h2>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default App;




import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    const data = res.data;
    const parsed = Array.isArray(data) ? data : data.products || [];
    const sorted = parsed.sort((a, b) => a.id - b.id);
    setProducts(sorted);
  };

  const fetchCart = async () => {
    const res = await axios.get(`${API}/cart`);
    setCart(res.data.items || []);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(`${API}/cart`, {
        product_id: productId,
        quantity: 1,
      });
      await fetchProducts();
      await fetchCart();
    } catch (err) {
      alert(err.response?.data?.error || "Error adding to cart");
    }
  };

  const updateQty = async (id, qty) => {
    if (qty <= 0) return removeItem(id);
    try {
      await axios.put(`${API}/cart/${id}`, { quantity: qty });
      await fetchCart();
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || "Error updating quantity");
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`${API}/cart/${id}`);
      await fetchCart();
      await fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || "Error removing item");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
    0
  );

return (
  <div>
    {/* Navbar */}
    <nav className="navbar">
      <span className="logo">🛒 ShopCart</span>
      <span className="cart-badge">
        {cart.length > 0 ? `${cart.length} item${cart.length > 1 ? "s" : ""} in cart` : "Cart is empty"}
      </span>
    </nav>

    {/* Hero */}
    <div className="hero">
      <h2>🛒 ShopCart</h2>
      <p>Fresh deals, fast checkout — everything you need in one place.</p>
    </div>

    <div className="container">

      {/* Products */}
      <div className="section-title">Products</div>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-icon">
              {p.name === "Phone" ? "📱" : p.name === "Laptop" ? "💻" : "🎧"}
            </div>
            <div className="product-name">{p.name}</div>
            <div className="product-price">₹{parseFloat(p.price).toLocaleString("en-IN")}</div>
            <span className={`product-stock ${p.stock === 0 ? "out-stock" : p.stock <= 2 ? "low-stock" : "in-stock"}`}>
              {p.stock === 0 ? "Out of Stock" : p.stock <= 2 ? `⚠ Only ${p.stock} left` : `✓ ${p.stock} in stock`}
            </span>
            <br />
            <button
              className="btn-add"
              onClick={() => addToCart(p.id)}
              disabled={p.stock === 0}
            >
              {p.stock === 0 ? "Out of Stock" : "+ Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div className="section-title">My Cart</div>

      {cart.length === 0 ? (
        <div className="cart-table">
          <p className="cart-empty">🛒 Your cart is empty — add some products!</p>
        </div>
      ) : (
        <>
          <div className="cart-table">
            <div className="cart-header">
              <span>Product</span>
              <span style={{ textAlign: "center" }}>Price</span>
              <span style={{ textAlign: "center" }}>Qty</span>
              <span style={{ textAlign: "center" }}>Subtotal</span>
              <span style={{ textAlign: "center" }}>Remove</span>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="cart-row">
                <div className="item-name">{item.name}</div>
                <div className="item-val">₹{parseFloat(item.price).toLocaleString("en-IN")}</div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                  <span className="qty-num">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-val" style={{ fontWeight: 700, color: "#1a1a2e" }}>
                  ₹{(parseFloat(item.price) * item.quantity).toLocaleString("en-IN")}
                </div>
                <button className="btn-del" onClick={() => removeItem(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div>
              <div className="summary-label">Total Amount</div>
              <div className="summary-total">₹{total.toLocaleString("en-IN")}</div>
            </div>
            <button className="btn-checkout">Proceed to Checkout →</button>
          </div>
        </>
      )}

    </div>
  </div>
);
}

export default App;