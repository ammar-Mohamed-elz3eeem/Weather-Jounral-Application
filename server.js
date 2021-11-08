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
const bootstrap = path.resolve(__dirname, "node_modules/bootstrap/dist");
const jquery = path.resolve(__dirname, "node_modules/jquery/dist");

/**
 * the Middlewares in the Weather application
 */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(pathFile));
app.use(express.static(bootstrap));
app.use(express.static(jquery));

/**
 * Setting the Project Data Variable
 */
const projectData = {};

/**
 *  Post and Get Routes
 */

app.post("/addRecord", (req, res) => {
  Object.assign(projectData, req.body);
  console.log(projectData);
  res.send(projectData);
  //   return projectData;
});

app.get("/all", (req, res) => {
  res.send(projectData);
});

/**
 * Listen for The server
 */
app.listen(8080, () => {
  console.log("Server is Running Now :)");
});
