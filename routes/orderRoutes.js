const express = require("express");

const { check } = require("express-validator");

const orderControllers = require("../controllers/orderController");
const router = express.Router();

router.get("/all", orderControllers.getAllOrders);
router.get("/:userId", orderControllers.getOrderByUserId);
router.post(
  "/create",
  [
    check("productIds").notEmpty(),
    check("userId").notEmpty(),
    check("orderPlacedAt").notEmpty(),
  ],
  orderControllers.createOrder
);

module.exports = router;
