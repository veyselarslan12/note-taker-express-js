const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const PORT = process.env.port || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.json());

// HTML routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// API routes
app.get("/api/notes", (req, res) => {
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Generate a unique ID for the note
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
