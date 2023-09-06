const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  category: String,
  userID: String,
});

module.exports = mongoose.model("products", productSchema);
