const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// 🧠 Users array (temporary database)
let users = [];

// ✅ GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// ✅ CREATE user
app.post("/create", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // duplicate email check
  const exists = users.some(u => u.email === email);
  if (exists) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);
  res.status(201).json({ msg: "User created", users });
});

// ✅ DELETE user
app.delete("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ msg: "User deleted", users });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
