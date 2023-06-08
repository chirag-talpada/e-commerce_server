const {
  addProductToCart,
  getCartProducts,
  updateQuantity,
  deleteProduct,
} = require("../controller/cart.controller");

const { auth } = require("../middlewares/Auth");

const router = require("express").Router();

router.post("/add", auth, addProductToCart);
router.get("/get", auth, getCartProducts);
router.put("/update", auth, updateQuantity);
router.delete("/delete/:id", auth, deleteProduct);

module.exports = router;
