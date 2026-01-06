const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let count = 0; // 🔑 counter stored here

// increment
app.get("/count", (req, res) => {
  count++;
  res.json({ count });
});

// decrement
app.get("/discount", (req, res) => {
  count--;
  res.json({ count });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
