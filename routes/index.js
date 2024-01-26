var express = require("express");
var router = express.Router();

// import users.js as userModel
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res) {
  req.session.anyname = "heloo";
  res.render("index");
});

// CRUD - Create

router.get("/create", async function (req, res) {
  const createduser = await userModel.create({
    username: "ansh07",
    age: 20,
    name: "Ansh Singh Sonkhia",
  });
  //res.send("Successfullllly Created");
  //console.log(createduser);
  res.send(createduser);
  // This "userModel.create" is asynchronoud JS, So, will go into the side stack & will be implemented after the completion of main stack Synchronous code. That's why we use "await" before it.
  // nhi toh user ko pehle hi message chala jayega
});

// CRUD - Read

router.get("/allusers", async function(req,res){
  // let allusers = await userModel.find();
  let allusers = await userModel.findOne({username: "harshita"});
  res.send(allusers);
});

// CRUD - Delete

router.get("/delete", async function(req,res){
  let deleteduser = await userModel.findOneAndDelete({
    username: "harsh"
  });
  res.send(deleteduser);
});

module.exports = router;
