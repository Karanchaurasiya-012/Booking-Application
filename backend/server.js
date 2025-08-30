const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, "db.json");
const SECRET = "MY_SECRET_KEY";

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}
function writeDB(obj) {
  fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2));
}

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ success: false, message: "No token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// GET slots
app.get("/api/slots", (req, res) => {
  const db = readDB();
  res.json({ slots: db.slots });
});

// POST book slot (protected)
app.post("/api/book", authMiddleware, (req, res) => {
  const { slotId } = req.body;
  if (!slotId) return res.status(400).json({ success: false, message: "slotId required" });

  const db = readDB();
  const slot = db.slots.find((s) => s.id === slotId);
  if (!slot) return res.status(404).json({ success: false, message: "Slot not found" });
  if (!slot.available) return res.status(409).json({ success: false, message: "Slot already booked" });

  slot.available = false;
  slot.booking = { userId: req.user.id, bookedAt: new Date().toISOString() };

  writeDB(db);
  res.json({ success: true, message: "Slot booked", slot });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
