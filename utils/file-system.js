const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "..", "db", "db.json")


const readNotes = () => {
  const data = readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

const writeNotes = (notes) => {
  writeFileSync(dbPath, JSON.stringify(notes));
};

module.exports = { readNotes, writeNotes }