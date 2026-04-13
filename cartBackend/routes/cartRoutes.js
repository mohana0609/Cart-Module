const express = require("express"); 
const router = express.Router(); 
const controller = require("../controller/cartController"); 
router.get("/products", controller.getProducts); 
router.get("/cart", controller.getCart); 
router.post("/cart", controller.addToCart); 
router.put("/cart/:id", controller.updateCart); 
router.delete("/cart/:id", controller.deleteItem); 
module.exports = router; 
