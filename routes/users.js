var express = require('express');
var router = express.Router();

// require mongoose
const mongoose = require("mongoose");

// Set Connection between mongoose & mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/practicekaro"); // Use the name of your DB at end of the url. Whatever you wish to use as a name.

// This url is your device's localhost. MongoDB (by default) runs on port 27017
// Mongoose is connecting to the mongoDB running on the server at the LocalHost.

// Creating Schemas

const userschema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
})

// Creating Models

mongoose.model("userData", userschema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Export Model
module.exports = mongoose.model("user", userschema);


module.exports = router;