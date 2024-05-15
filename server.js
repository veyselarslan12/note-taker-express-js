const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const dbPath = path.join(__dirname, "db", "db.json")
// console.log(dbPath)
const PORT = process.env.port || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.json());

const readNotes = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

const writeNotes = (notes) => {
  fs.writeFileSync(dbPath, JSON.stringify(notes));
};

// HTML routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// API routes
app.get("/api/notes", (req, res) => {
  res.sendFile(dbPath)
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      id: uuidv4(),
      title,
      text
    }

    const notes = readNotes();
    notes.push(newNote);
    writeNotes(notes);

    res.json(newNote);
  } else {
    res.status(400).json({error: "Please provide title and text for the note"})
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  let notes = readNotes();
  const newNotes = notes.filter(note => note.id !== noteId);

  if (notes.length === newNotes.length) {
    res.status(404).json({error: "Note not found!"})
  } else {
    writeNotes(newNotes);
    res.json({success: true})
  }
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
