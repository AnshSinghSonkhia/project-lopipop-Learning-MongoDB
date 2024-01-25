# Let's Learn `MongoDB`

- MongoDB is a DataBase.
- There are 2 types of DataBase:
    1. Relational DB
        - MySQL
        - SQL
    2. Non-Relational DB
        - MongoDB

## Diagram


| Code Side  | MongoDB Side |
| :--------: | :-------:    |
| DB Setup   | DB Formation |
| Model      | Collection   |
| Schema     | Documents    |

# Concept of MongoDB

- The `Storage` will have `Containers` of data of different apps.
- Every app will have it's own `Container` to store its data.
- Every `Container` is the DataBase of that one `app` or `Project`.

## Example of the DataBase of Amazon.

- The DataBase of Amazon will consist for the following `containers` of data:
    - User DB
    - Products DB
    - Sales DB
    - Admins DB
    - & Many more.....
- One whole DataBase of Amazon is divided into different parts (i.e., variety of data) known as `Model` in coding & `Collection` in DataBase. 
- We write code for `Model`, which makes `Collection` in DataBase.
    - For Example:
        - `Product Model` will be coded, which will create `Product Collection` in the DataBase.
        - `User Model` will be coded, which will create `User Collection` in the DataBase.
        - `Sales Model` will be coded, which will create `Sales Collection` in the DataBase.

### Schemas in code will create Documents in DataBase.

- `Schemas` in code will create `Documents` in DataBase.

- The Data of all users is `Collection`.
- The Data of ONE user in any collection is `Document`.

# Setup Steps for MongoDB

1. Install `MongoDB`
    - Download from:
    ```
    https://www.mongodb.com/try/download/community
    ```
2. Install `MongooseJS`
    ```shell
    npm i mongoose
    ```
3. Require & Setup Connection

    - Write this code in `routes/users.js`
    ```js
    // require mongoose
    const mongoose = require("mongoose");

    // Set Connection between mongoose & mongoDB
    mongoose.connect("mongodb://127.0.0.1:27017/DBname");   // Use the name of your DB replacing "DBname". Whatever you wish to use as a name.

    // This url is your device's localhost. MongoDB (by default) runs on port 27017
    // Mongoose is connecting to the mongoDB running on the server at the LocalHost.
    ```
    - This creates database.

4. Make Schemas

    - Using `Schemas` you have tell, what will a `document` of the `collection` will look like.
    - Use the below code in `routes/users.js`
    ```js
    // Creating Schemas

    const userschema = mongoose.Schema({
        username: String,
        name: String,
        age: Number
    })

    // name-of-value: Type-of-value
    ```

    - This tells, how every document will look. (Units of data)

5. Create Model

    ```js
    // Creating Models

    mongoose.model("userData", userschema);    // "userData" is the name of collection created
    ```

    - It creates `collection` in DataBase.

6. Export the Model

    ```js
    // Export Model

    module.exports = mongoose.model("user", userschema);
    ```

> In the above example,
> `prcticekaro` is the database created.
> `userData` is a collection created inside the database.
> `userschema` defines the structure of data stored in every `document` of the collection.

# Mongoose.js

Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment.

# CRUD - Create Read Update Delete

## Create

> import `user.js` in `index.js` to bring all the information about database, collections, schema.
```js
// import users.js as userModel
const userModel = require("./users");
``` 

> Create documents in `index.js`
```js
router.get('/create', async function(req,res){
  await userModel.create({
    username: "ansh07",
    age: 20,
    name: "Ansh Singh Sonkhia"
  });
  res.send("Successfullllly Created")
  // This "userModel.create" is asynchronoud JS, So, will go into the side stack & will be implemented after the completion of main stack Synchronous code. That's why we use "await" before it.
  // nhi toh user ko pehle hi message chala jayega
});
```

- After Creation of this user, mongoDB will return the created user, which we can save.
```js
router.get('/create', async function(req,res){
  const createduser = await userModel.create({
    username: "ansh07",
    age: 20,
    name: "Ansh Singh Sonkhia"
  });
  res.send("Successfullllly Created")
  res.send(createduser);
});
```

## Read

```js
router.get("/allusers", async function(req,res){
  let allusers = await userModel.find();
  res.send(allusers);
});
```

- `.find` is used to find
- `.findOne` is used to find one user

```js
router.get("/allusers", async function(req,res){
  let allusers = await userModel.findOne({username: "harshita"});
  res.send(allusers);
});
```

# Update


# Delete

```js
router.get("/delete", async function(req,res){
  let deleteduser = await userModel.findOneAndDelete({
    username: "harsh"
  });
  res.send(deleteduser);
});
```

## Client-Server Diagram


|  Client  |   Server   |
| :--------: | :-------:  |
| Cookie   | Session |

- When you have to save data on `server` - use `session`.
- When you have to save data on `Client's frontend'` - use `Cookie`.

----
- Data saved in the server is more secured than the data saved in the client's cookie.

# Sessions

- To use `sessions` - install this package:
```shell
npm i express-session
```

- Write this code in `app.js`
```js
var session = require('express-session');

app.use(session({
  resave: false,  // don't save again, if the value of session is NOT changed.
  saveUninitialized: false,   // Don't save any data, which is NOT named.
  secret: "kuchBhiRandomSecretCodeLikhDoo"    // A secret string, on the basis of which our data will be encrypt.
}));
```

- You can create session in the routes with any name of your choice, whenever someone visits that route.
```js
router.get("/", function (req, res) {
  req.session.anyname = "heloo";
  res.render("index");
});
```
### Example Use-Case
- So, if you want anyone to get banned, when he visits any route...
```js
router.get("/", function (req, res) {
  req.session.banned = true;
  res.render("index");
});
```

> You can use any name for session - `banned`, `ban`, `noban`, `lemon`, `bmw`, etc.... 


### If a session is created in any route, it can be checked in all other routes.

```js
router.get("/check-ban", function (req, res) {
  console.log(req.session);
  res.send("You have beeeeeeeeeeen Banned");

  if(req.session.banned === true){
    res.send("You have beeeeeeeeeeen Banned");
  }
  else{
    res.send("not banned");
  }
});
```

### If the server is restarted...
If the server is restarted or restarted by `nodemon`
Then, the session will be deleted.

### How to delete session?

```js
router.get("/remove-ban", function (req, res) {
  req.session.destroy(function(err){
    if (err) throw err;
    //console.log(err);
    res.send("Ban Removed Successfullyy")
  })
});
```

# Cookie

- install package `cookie-parser`

- use code:
```js
var cookieParser = require('cookie-parser');
app.use(cookieParser());
```

## How to use Cookie
> Cookie is set on the frontend. So, sent in `response`

```js
router.get("/", function (req, res) {
  res.cookie("age", 25);	// cookie("cookie-name", cookie-value)
  res.render("index");
});
```

## How to read Cookie?

- The cookie is set on the browser of client.
- And, we have to read it on server.
- So, we have to `request` it.

```js
router.get("/read", function (req, res) {
	console.log(req.cookies);
	console.log(req.cookies.age);	// to get direct data of cookie named "age"
	res.send("check");
});
```

## How to delete Cookie?

```js
router.get("/delete", function (req, res) {
	res.clearCookie("age");
	res.send("Cookie Cleared Successfullyy");
});
```

## EndGame-1 Completed 