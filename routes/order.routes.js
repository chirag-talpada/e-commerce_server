const {
  createOrder,
  getOrders,
  getOrderItems,
  updateStatus,
} = require("../controller/order.controller");
const { auth } = require("../middlewares/Auth");

const router = require("express").Router();

router.post("/create", auth, createOrder);
router.get("/get", auth, getOrders);
router.get("/items/:id", auth, getOrderItems);
router.put("/update", updateStatus);

module.exports = router;
