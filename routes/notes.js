const express = require("express");
const router = express.Router();
const fs = require("fs");


router.get("/", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });
  });
  
  router.post("/", (req, res) => {
    console.log(req.body);
    const newNote = {
      title: req.body.title,
      text: req.body.text,
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(notes, null, 4),
          (err, data) => {
            if (err) {
              throw err;
            }
            res.json({ data: req.body, message: "success!" });
          }
        );
      }
    });
  });
  
module.exports = router;