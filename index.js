const express = require("express");
const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

const app = express();
const port = 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const sizeMultiplier = 1;

app.get("/boards/:boardCount/:pixelCount", (req, res) => {
  filePath = "boards/" + req.params.boardCount + "/";
  fileName = req.params.pixelCount + ".png";
  var options = {
    root: path.join(__dirname, filePath),
  };
  res.sendFile(fileName, options);
});

app.post("/", function (req, res) {
  const { boardCount, boardSize, pixelCount, pixels } = req.body;
  // Generating PNG File
  const canvas = createCanvas(
    boardSize * sizeMultiplier,
    boardSize * sizeMultiplier
  );
  const context = canvas.getContext("2d");

  // Drawing pixel by pixel
  for (i = 0; i < pixels.length; i++) {
    context.fillStyle = pixels[i].color;
    context.fillRect(
      pixels[i].x * sizeMultiplier,
      pixels[i].y * sizeMultiplier,
      1 * sizeMultiplier,
      1 * sizeMultiplier
    );
  }

  const buffer = canvas.toBuffer("image/png");
  // File infos
  filePath = "boards/" + boardCount + "/";
  fileName = pixelCount + ".png";
  var options = {
    root: path.join(__dirname, filePath),
  };

  //Writing the file in a directory matching the current boardcount
  fs.mkdir(filePath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    } else {
      fs.writeFileSync(filePath + fileName, buffer);
      // Return the image
      console.log("Saved in ->");
      console.log(filePath + fileName);
      console.log(path.join(__dirname, filePath));
      res.sendFile(fileName, options);
    }
  });
});

app.listen(port, () =>
  console.log(`Pixshot server listening on port ${port}!`)
);
