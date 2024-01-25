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


## Video at 57:54