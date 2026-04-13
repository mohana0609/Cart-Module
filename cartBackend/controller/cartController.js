//  const pool  = require("../db");
//  const {validateQuantity} = require("../utils/validation");

// const product = await db.query(
//   "SELECT * FROM products WHERE id = $1",
//   [product_id]
// );

// if (product.rows[0].stock < quantity) {
//   return res.status(400).json({ error: "Not enough stock" });
// }

// await db.query(
//   "UPDATE products SET stock = stock - $1 WHERE id = $2",
//   [quantity, product_id]
// );

// exports.getCart = async (  req , res) =>{
//     try {
//         const result = await pool.query(
//             `SELECT c.id, p.name, p.price, c.quantity,
//       (p.price * c.quantity) AS total
//       FROM cart c
//       JOIN products p ON p.id = c.product_id `
//         );
//         const totalPrice = result.rows.reduce((sum, item ) =>
//         sum + item.total, 0);

//         res.json({items : result.rows , totalPrice});
//     }
//     catch(err){
//         res.status(500) .json({error:err.message});

//     }
// };

// const addToCart = async (req, res) => {
//   try {
//     const { product_id, quantity } = req.body;

//     const productResult = await db.query(
//       "SELECT * FROM products WHERE id = $1",
//       [product_id]
//     );

//     if (productResult.rows.length === 0) {
//       return res.status(400).json({ error: "Product not found" });
//     }

//     const product = productResult.rows[0];

//     if (product.stock < quantity) {
//       return res.status(400).json({ error: "Not enough stock" });
//     }

//     const cartItem = await db.query(
//       "SELECT * FROM cart WHERE product_id = $1",
//       [product_id]
//     );

//     if (cartItem.rows.length > 0) {
//       await db.query(
//         "UPDATE cart SET quantity = quantity + $1 WHERE product_id = $2",
//         [quantity, product_id]
//       );
//     } else {
//       await db.query(
//         "INSERT INTO cart (product_id, quantity) VALUES ($1, $2)",
//         [product_id, quantity]
//       );
//     }

//     await db.query(
//       "UPDATE products SET stock = stock - $1 WHERE id = $2",
//       [quantity, product_id]
//     );

//     res.json({ message: "Added to cart" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// exports.updateCart = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity } = req.body;

//     const error = validateQuantity(quantity);
//     if (error) return res.status(400).json({ error });

//     const item = await pool.query("SELECT * FROM cart WHERE id=$1", [id]);

//     if (item.rows.length === 0) {
//       return res.status(404).json({ error: "Cart item not found" });
//     }

//     const product = await pool.query(
//       "SELECT * FROM products WHERE id=$1",
//       [item.rows[0].product_id]
//     );

//     if (quantity > product.rows[0].stock) {
//       return res.status(400).json({ error: "Stock exceeded" });
//     }

//     await pool.query(
//       "UPDATE cart SET quantity=$1 WHERE id=$2",
//       [quantity, id]
//     );

//     res.json({ message: "Quantity updated" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await pool.query(
//       "DELETE FROM cart WHERE id=$1 RETURNING *",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Item not found" });
//     }

//     res.json({ message: "Item removed" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



















// const pool = require("../db");
// const { validateQuantity } = require("../utils/validation");

// // ✅ GET CART
// exports.getProducts = async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM products");
//     res.json({ products: result.rows });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getCart = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT c.id, p.name, p.price, c.quantity,
//       (p.price * c.quantity) AS total
//       FROM cart c
//       JOIN products p ON p.id = c.product_id
//     `);

//     const totalPrice = result.rows.reduce((sum, item) => sum + item.total, 0);

//     res.json({ items: result.rows, totalPrice });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ ADD TO CART
// exports.addToCart = async (req, res) => {
//   try {
//     const { product_id, quantity } = req.body;

//     const productResult = await pool.query(
//       "SELECT * FROM products WHERE id = $1",
//       [product_id],
//     );

//     if (productResult.rows.length === 0) {
//       return res.status(400).json({ error: "Product not found" });
//     }

//     const product = productResult.rows[0];

//     if (product.stock < quantity) {
//       return res.status(400).json({ error: "Not enough stock" });
//     }

//     const cartItem = await pool.query(
//       "SELECT * FROM cart WHERE product_id = $1",
//       [product_id],
//     );

//     if (cartItem.rows.length > 0) {
//       await pool.query(
//         "UPDATE cart SET quantity = quantity + $1 WHERE product_id = $2",
//         [quantity, product_id],
//       );
//     } else {
//       await pool.query(
//         "INSERT INTO cart (product_id, quantity) VALUES ($1, $2)",
//         [product_id, quantity],
//       );
//     }

//     // 🔥 reduce stock
//     await pool.query("UPDATE products SET stock = stock - $1 WHERE id = $2", [
//       quantity,
//       product_id,
//     ]);

//     res.json({ message: "Added to cart" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // ✅ UPDATE CART
// exports.updateCart = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity } = req.body;

//     const error = validateQuantity(quantity);
//     if (error) return res.status(400).json({ error });

//     const item = await pool.query("SELECT * FROM cart WHERE id=$1", [id]);

//     if (item.rows.length === 0) {
//       return res.status(404).json({ error: "Cart item not found" });
//     }

//     const product = await pool.query("SELECT * FROM products WHERE id=$1", [
//       item.rows[0].product_id,
//     ]);

//     if (quantity > product.rows[0].stock) {
//       return res.status(400).json({ error: "Stock exceeded" });
//     }

//     await pool.query("UPDATE cart SET quantity=$1 WHERE id=$2", [quantity, id]);

//     res.json({ message: "Quantity updated" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✅ DELETE ITEM
// exports.deleteItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await pool.query(
//       "DELETE FROM cart WHERE id=$1 RETURNING *",
//       [id],
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "Item not found" });
//     }

//     res.json({ message: "Item removed" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };




const pool = require("../db");
const { validateQuantity } = require("../utils/validation");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json({ products: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET CART
exports.getCart = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id, p.name, p.price, c.quantity,
      (p.price * c.quantity) AS total
      FROM cart c
      JOIN products p ON p.id = c.product_id
    `);
    const totalPrice = result.rows.reduce((sum, item) => sum + parseFloat(item.total), 0);
    res.json({ items: result.rows, totalPrice: totalPrice.toFixed(2) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ error: "product_id and quantity are required" });
    }

    const error = validateQuantity(quantity);
    if (error) return res.status(400).json({ error });

    const productResult = await pool.query("SELECT * FROM products WHERE id = $1", [product_id]);
    if (productResult.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productResult.rows[0];

    // Check if already in cart
    const cartItem = await pool.query("SELECT * FROM cart WHERE product_id = $1", [product_id]);
    const currentCartQty = cartItem.rows.length > 0 ? cartItem.rows[0].quantity : 0;

    // Validate against remaining stock (not total stock)
    if (quantity > product.stock) {
      return res.status(400).json({ error: `Only ${product.stock} items available in stock` });
    }

    if (cartItem.rows.length > 0) {
      await pool.query(
        "UPDATE cart SET quantity = quantity + $1 WHERE product_id = $2",
        [quantity, product_id]
      );
    } else {
      await pool.query(
        "INSERT INTO cart (product_id, quantity) VALUES ($1, $2)",
        [product_id, quantity]
      );
    }

    // Reduce available stock
    await pool.query("UPDATE products SET stock = stock - $1 WHERE id = $2", [quantity, product_id]);

    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE CART QUANTITY
exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const error = validateQuantity(quantity);
    if (error) return res.status(400).json({ error });

    const item = await pool.query("SELECT * FROM cart WHERE id = $1", [id]);
    if (item.rows.length === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    const cartEntry = item.rows[0];
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [cartEntry.product_id]);
    const currentCartQty = cartEntry.quantity;

    // Available = stock still in warehouse + what's currently "held" in cart
    const totalAvailable = product.rows[0].stock + currentCartQty;

    if (quantity > totalAvailable) {
      return res.status(400).json({ error: `Only ${totalAvailable} units available` });
    }

    // Restore old qty to stock, deduct new qty
    await pool.query(
      "UPDATE products SET stock = stock + $1 - $2 WHERE id = $3",
      [currentCartQty, quantity, cartEntry.product_id]
    );

    await pool.query("UPDATE cart SET quantity = $1 WHERE id = $2", [quantity, id]);

    res.json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REMOVE FROM CART
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await pool.query("SELECT * FROM cart WHERE id = $1", [id]);
    if (item.rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Restore stock before deleting
    await pool.query(
      "UPDATE products SET stock = stock + $1 WHERE id = $2",
      [item.rows[0].quantity, item.rows[0].product_id]
    );

    await pool.query("DELETE FROM cart WHERE id = $1", [id]);

    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};