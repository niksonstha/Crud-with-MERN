const express = require("express");
const cors = require("cors");
require("./database/config");
const User = require("./database/User");
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

app.listen(5000);
