const express = require("express");
const cors = require("cors");
require("./database/config");
const User = require("./database/User");
const Todo = require("./database/TodoList");
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

app.post("/insert-todoItems", async (req, res) => {
  let todo = new Todo(req.body);
  let result = await todo.save();
  result = result.toObject();

  res.send(result);
});

app.get("/todolist/:id", async (req, res) => {
  let todos = await Todo.find({ userID: req.params.id });

  if (todos.length < 0) {
    res.send("no products");
  } else {
    res.send(todos);
  }
});

app.listen(5000);
