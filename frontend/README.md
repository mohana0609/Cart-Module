
##  Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Database:** PostgreSQL

---

##  Setup Instructions

### 1. Clone the repository

### 2. Backend Setup

Create a PostgreSQL database named `cartdb` and run:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price NUMERIC,
  stock INTEGER
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER
);

INSERT INTO products (name, price, stock) VALUES
  ('Phone', 10000, 10),
  ('Laptop', 50000, 5),
  ('Headphones', 2000, 8);
```

Update `db.js` with your PostgreSQL password.

Start backend:

### 3. Frontend Setup

---

## 📡 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Get all products |
| GET | /cart | Get cart with total price |
| POST | /cart | Add item to cart |
| PUT | /cart/:id | Update item quantity |
| DELETE | /cart/:id | Remove item from cart |

### POST /cart — Request Body
```json
{
  "product_id": 1,
  "quantity": 1
}
```

### PUT /cart/:id — Request Body
```json
{
  "quantity": 3
}
```

---

## 🧠 Approach & Key Decisions

### 1. Database Design
Two tables — `products` (inventory) and `cart` (user selections).
Stock is updated in real-time when items are added, updated, or removed.

### 2. Cart Logic
- If product already exists in cart → quantity is increased
- Stock is reduced when added to cart
- Stock is restored when item is removed or quantity is decreased

### 3. Pricing Logic
Total price is calculated dynamically using:


### 4. Inventory Validation
- Cannot add more than available stock
- Cannot set quantity to zero or negative
- Out of stock products show disabled button

### 5. Edge Cases Handled
- Invalid product ID → 404 error
- Zero/negative quantity → validation error
- Duplicate items → quantity increased, not duplicated
- Empty cart → friendly message shown

---

## ✨ Self-Researched Improvement — Optimistic UI

**What it is:**
Optimistic UI updates the screen immediately when user clicks "Add to Cart",
before the server confirms the action.

**Why I chose it:**
It makes the app feel fast and responsive — no waiting for API response.
If the server fails, it rolls back to the previous state.

**How it works:**
```javascript
// 1. Update UI immediately
setProducts(products.map(p =>
  p.id === id ? { ...p, stock: p.stock - 1 } : p
));

// 2. Then call API
try {
  await axios.post('/cart', { product_id: id, quantity: 1 });
} catch (err) {
  // 3. Rollback if failed
  fetchProducts();
  alert(err.response?.data?.error);
}
```

---

## 📚 Learnings

1. **Stock sync** — Stock must be restored when cart item is removed or updated,
   not just when added. This required careful backend logic.

2. **React re-render** — `setProducts([...parsed])` with spread operator
   forces React to detect changes and re-render the UI.

3. **Route mounting** — Express route prefix must match frontend API base URL exactly.
   Mismatch causes 404 errors.

4. **PostgreSQL numeric type** — Price comes as string from pg library,
   so `parseFloat()` is needed before calculations.

5. **StrictMode** — React StrictMode runs useEffect twice in development,
   causing double API calls. Removed for clean behavior.

---

##  Project Structure


cart-project/
├── cartBackend/
│   ├── controller/
│   │   └── cartController.js
│   ├── routes/
│   │   └── cartRoutes.js
│   ├── utils/
│   │   └── validation.js
│   ├── db.js
│   └── server.js
├── cartFrontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── README.md