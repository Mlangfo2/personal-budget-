
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

db = "mongodb://localhost:27017/pb";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Success! Connection is made! "))
  .catch((err) => console("OH NO! Mongo connection error!", err));

const Budget = require("./models/budget.model.js");

app.get("/budgets", (req, res) => {
  Budget.find(function (err, budgets) {
    if (err) {
    } else {
      res.json(budgets);
    }
  });
});

app.post("/budgets/add", (req, res, err) => {
  let budget = new Budget(req.body);
  console.log(budget);
  Budget.insertMany(budget)
    .then((budget) => {
      res.status(200).json({ budget });
    })
    .catch((connectionError) => {
      res.status(400).json({ message: { msgBody: "Your budget requires: title (String), budget (String), and color (Number no longer than 6 char long)", msgError: true } });
    });
});

app.delete("/budgets/delete/:id", (req, res) => {
  Budget.findByIdAndRemove(req.params.id, function (err, budget) {
    if (err) {
      return res.status(500).send({ budget });
    }
    return res.status(200).send({ budget });
  });
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});