const Order = require("../schemas/order");

const { validationResult } = require("express-validator");

const createOrder = async (req, res, next) => {
  const newOrder = new Order({
    productIds: req.body.productIds,
    userId: req.body.userId,
    orderPlacedAt: req.body.orderPlacedAt,
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid inputs, please check post data" });
  }

  const result = await newOrder.save();
  res.json(result);
};

const getAllOrders = async (req, res, next) => {
  const orders = await Order.find().exec();
  res.json(orders);
};

const getOrderByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    return res
      .status(422)
      .json({ message: "userId is missing, please check query params" });
  }
  const orders = await Order.find({ userId: userId });
  res.json(orders);
};

exports.getAllOrders = getAllOrders;
exports.getOrderByUserId = getOrderByUserId;
exports.createOrder = createOrder;
