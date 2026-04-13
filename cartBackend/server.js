//  const express = require("express");
// const cors = require("cors");

// const app = express();
// const routes = require("./routes/cartRoutes");

// app.use(cors());
// app.use(express.json());

// app.use("/", routes);

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

// app.get("/products", async (req, res) => {
//   const result = await db.query("SELECT * FROM products");
//   res.json(result.rows);
// });


// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const cartRoutes = require("./routes/cartRoutes");

// app.use("/cart", cartRoutes);
// app.use("/api", require("./routes/cartRoutes"));
// app.get("/", (req, res) => {
//   res.send("API Running...");
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });




const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ✅ ONE route mount, at root "/"
app.use("/", require("./routes/cartRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));