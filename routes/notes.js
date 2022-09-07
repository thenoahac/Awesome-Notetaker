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
  // creating body for note
  let userNote = {
    title: req.body.title,
    text: req.body.text,
  };
  // pushing created note to be written in the db.json file
  db.push(userNote);
  fs.writeFileSync('db/db.json', JSON.stringify(db));
  res.json(db);

});


// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete.
app.delete('/api/notes/:id', (req, res) => {
  // reading notes form db.json
  let db = JSON.parse(fs.readFileSync('db/db.json'))
  // removing note with id
  let deleteNotes = db.filter(item => item.id !== req.params.id);
  // Rewriting note to db.json
  fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
  res.json(deleteNotes);
  
})
};

  
module.exports = router;