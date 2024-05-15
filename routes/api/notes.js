const router = require("express").Router();
const path = require('path')
const { v4: uuidv4 } = require("uuid");
const { readNotes, writeNotes } = require('../../utils/file-system')
const dbPath = path.join(__dirname, "..", "..", "db", "db.json")



// API routes
router.get("/notes", (req, res) => {
  res.sendFile(dbPath);
});

router.post("/notes", (req, res) => {
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

router.delete("/notes/:id", (req, res) => {
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

module.exports = router