const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, 'db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDB(obj) {
  fs.writeFileSync(DB_PATH, JSON.stringify(obj, null, 2));
}

app.get('/api/slots', (req, res) => {
  const db = readDB();
  const onlyAvailable = req.query.onlyAvailable === 'true';
  let slots = db.slots || [];
  if (onlyAvailable) slots = slots.filter(s => s.available);
  res.json({ slots });
});

app.post('/api/book', (req, res) => {
  const { slotId, name, phone } = req.body;
  if (!slotId || !name) return res.status(400).json({ success: false, message: 'slotId and name required' });

  const db = readDB();
  const slot = db.slots.find(s => s.id === slotId);
  if (!slot) return res.status(404).json({ success: false, message: 'Slot not found' });
  if (!slot.available) return res.status(409).json({ success: false, message: 'Slot already booked' });

  slot.available = false;
  slot.booking = { name, phone, bookedAt: new Date().toISOString() };

  writeDB(db);
  res.json({ success: true, message: 'Slot booked', slot });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
