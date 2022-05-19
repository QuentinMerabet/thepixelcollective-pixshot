const express = require("express");
const app = express();
const port = 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post("/", function (req, res) {
  const { name, description } = req.body;
  console.log(`-> Name ${name}, desc ${description}`);
  res.send(`Name ${name}, desc ${description}`);
});
app.listen(port, () =>
  console.log(`Pixshot server listening on port ${port}!`)
);
