  
  const { createOrder, getOrders } = require("../controller/order.controller");
const { auth } = require("../middlewares/Auth");
  
  const router = require("express").Router();
  
  router.post("/create", auth, createOrder);
  router.get("/get", auth, getOrders);
  
  module.exports = router;
  