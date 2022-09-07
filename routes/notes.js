const express = require("express");
const router = express.Router();
const fs = require("fs");

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../db/db.json'));
});

app.post('/api/notes', (req, res) => {
  let db = fs.readFileSync('db/db.json');
  db = JSON.parse(db);
  res.json(db);
  let userNote = {
    title: req.body.title,
    text: req.body.text,
  };
  db.push(userNote);
  fs.writeFileSync('db/db.json', JSON.stringify(db));
  res.json(db);
});

app.delete('/api/notes/:id', (req, res) => {
  let db = JSON.parse(fs.readFileSync('db/db.json'))
  let deleteNotes = db.filter(item => item.id !== req.params.id);
  fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
  res.json(deleteNotes);
});

  
module.exports = router;