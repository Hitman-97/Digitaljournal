const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware for JSON parsing
app.use(bodyParser.json());

let entries = [];

app.post('/mood', (req, res) => {
  const { mood, note } = req.body;
  const timestamp = new Date().toLocaleString();
  const newEntry = { mood, note, timestamp };
  entries.push(newEntry);
  res.status(201).json(newEntry);
});

app.get('/mood', (req, res) => {
  res.status(200).json(entries);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
