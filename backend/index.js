const express = require("express");
const cors = require("cors");
require("./database/config");
const User = require("./database/User");
const Product = require("./database/Product");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/registerUser", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      res.send(user);
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "no user found" });
  }
});

app.post("/insert-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  result = result.toObject();

  res.send(result);
});

app.get("/productList/:id", async (req, res) => {
  let result = await Product.find({ userID: req.params.id });

  if (result.length < 0) {
    res.send("no products");
  } else {
    res.send(result);
  }
});

app.delete("/delete-product/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });

  res.send(result);
});

app.listen(5000);
