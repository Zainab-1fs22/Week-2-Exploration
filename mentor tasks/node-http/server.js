const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // initialize express server
const port = "4000";

app.use(bodyParser.json()); //initialize plugin

// // GET - http request from rest server
// const sayHi = (req, res) => {
//   res.send("Hi!!!");
// };
// app.get("/", sayHi);

// GET - http request from rest server
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST - http request into our rest server
app.post("/add", (req, res) => {
  const { a, b } = req.body;
  res.send({
    result: parseInt(a) + parseInt(b), //return json den convert to int
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
