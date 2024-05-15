const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readNotes, writeNotes } = require('../../utils/file-system')


// HTML routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// API routes
router.get("/api/notes", (req, res) => {
  res.sendFile(dbPath);
});

router.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };

    const notes = readNotes();
    notes.push(newNote);
    writeNotes(notes);

    res.json(newNote);
  } else {
    res
      .status(400)
      .json({ error: "Please provide title and text for the note" });
  }
});

router.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  let notes = readNotes();
  const newNotes = notes.filter((note) => note.id !== noteId);

  if (notes.length === newNotes.length) {
    res.status(404).json({ error: "Note not found!" });
  } else {
    writeNotes(newNotes);
    res.json({ success: true });
  }
});
