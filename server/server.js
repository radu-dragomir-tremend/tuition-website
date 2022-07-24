const PORT = 3010;

const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const connectionString = process.env.connectionString
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db("test");

    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      db.collection("testCollection")
        .find()
        .toArray()
        .then((results) => res.send(results));
    });

    app.post("/", (req, res) => {
      const collection = db.collection("testCollection");

      collection.insertOne(req.body).then((result) => {
        res.send(result);
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch(console.error);
