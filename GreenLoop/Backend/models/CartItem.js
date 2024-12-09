const mongoose = require("mongoose");

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    // comments: [{ body: String, date: Date }],
    itemSet: [
      {
        _id: false,
        size: {
          type: String,
          required: [
            true,
            "Please provide proper set details before adding to cart",
          ],
        },
        lengths: {
          type: Number,
          required: [
            false,
            "Please provide proper set details before adding to cart",
          ],
        },
      },
    ],
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
