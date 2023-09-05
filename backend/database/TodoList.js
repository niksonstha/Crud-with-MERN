const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userID: String,
  todo: String,
});

module.exports = mongoose.model("todos", todoSchema);
