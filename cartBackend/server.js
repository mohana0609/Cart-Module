
const express = require("express");
const cors = require("cors");
const app = express();
app.get("/", (req, res) => {
  res.send("Cart API is running 🚀");
});
app.use(cors());
app.use(express.json());

// ✅ ONE route mount, at root "/"
app.use("/", require("./routes/cartRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));