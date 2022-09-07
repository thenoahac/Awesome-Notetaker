const express = require('express');
const path = require('path');
const api = require('./routes/notes.js')

const PORT = process.env.PORT || 3000;;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', api)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);