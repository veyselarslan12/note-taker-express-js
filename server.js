const express = require("express");
const routes = require('./routes/index')

const PORT = process.env.port || 3001;
const app = express();


app.use(express.static("public"));
app.use(express.json());
app.use( routes )

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
