const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  productIds: [
    {
      type: String,
    },
  ],
  userId: { type: String, required: true },
  orderPlacedAt: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
