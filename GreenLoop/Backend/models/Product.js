const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
  size: {
    type: String,
    required: [true, "Please provide set size"],
  },
  lengths: {
    type: Number,
    required: [true, "Please provide set length"],
  },
  _id: false,
});
// Define a Product schema
const productSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    article: {
      type: String,
    },
    itemSet: {
      type: [setSchema],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Product must have at least one set.",
      },
    },
    description: String,
    category: String,
    colors: {
      type: Map,
      of: [String],
      required: true,
    }, // An array of available colors
    //   size: [String], // An array of available sizes
    price: {
      type: Number,
      required: true,
    },
    // discount: Number,
    // stock_quantity: {
    //   type: Number,
    //   default: 0,
    // },
    images: [String],
    material: String,
    gender: String,
    inStock: {
      type: Boolean,
      default: true,
    },
    // style: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create the Product model

module.exports = mongoose.model("Product", productSchema);
