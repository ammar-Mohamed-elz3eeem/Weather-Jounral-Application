/**
 * require main packages
 */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

/**
 * Initialize the express app
 */
const app = express();

/**
 * Get the folder of the public files
 */
const pathFile = path.resolve(__dirname, "website");
app.use(express.static(pathFile));
app.get("/", (req, res) => {
  res.send("404! Error");
});
app.listen(5000, () => {
  console.log("Server is Running Now :)");
});
