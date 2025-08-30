const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DB_PATH = path.join(__dirname, "../db.json");
const SECRET = "MY_SECRET_KEY"; 

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}
function writeDB(obj) {
  fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2));
}

// Signup
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: "Missing fields" });

  const db = readDB();
  const exists = db.users.find((u) => u.email === email);
  if (exists)
    return res.status(409).json({ success: false, message: "User already exists" });

  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = {
    id: db.users.length + 1,
    name,
    email,
    passwordHash,
  };
  db.users.push(newUser);
  writeDB(db);

  res.json({ success: true, message: "User registered" });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Missing fields" });

  const db = readDB();
  const user = db.users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  const valid = bcrypt.compareSync(password, user.passwordHash);
  if (!valid) return res.status(401).json({ success: false, message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
  res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
