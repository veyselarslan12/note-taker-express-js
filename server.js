const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const db = path.join(__dirname, "db", "db.json")
// console.log(db)
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
  res.sendFile(db)
});

app.post("/api/notes", (req, res) => {


});





app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
