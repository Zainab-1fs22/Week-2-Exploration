const express = require("express");
//middleware for req - take inputs - access with 'use'
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const MongoClient = require("mongodb").MongoClient;
const connectionString =
  "mongodb+srv://Zainab:ZainabQuotesTest@cluster0.dc4ccbk.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("quotes-general");
    const quotesCollection = db.collection("quotes");

    app.set("view engine", "ejs");

    //place body-parser b4 crud handlers
    //urlencoded - tells body-parser to extract data from <form> & add to body in req obj - retrieval wid 'req.body'
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static("public"));

    app.listen(port, function () {
      console.log(`Server is listening on port http://localhost:${port}/`);
    });

    app.get("/", (req, res) => {
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          //contains(finds) all the quotes from db
          console.log(results);

          //put quotes into index.ejs - pass quotes to render
          //res.render(view,local)
          res.render("index.ejs", { quotes: results });
        })
        .catch((error) => console.error(error));
      // res.sendFile(__dirname + "/index.html");
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
          console.log(req.body);
        })
        .catch((error) => console.error(error));
    });

    app.put("/quotes", (req, res) => {
      //findOneAndUpdate - query, update op - $set,$inc & $push,options-additional conditions
      quotesCollection
        .findOneAndUpdate(
          { name: "Zainab" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            //incase of unavailability of zainab quote...adds the belle quote
            upsert: true,
          }
        )
        //we can use js yo update DOM. For now, we need to refresh for changes update
        .then((result) => {
          res.json("Success");
        })
        .catch((error) => console.log(error));
    });

    app.delete("/quotes", (req, res) => {
      //deleteOne - query, options
      quotesCollection
        .deleteOne(
          { name: req.body.name } //no hardcoding "Belle" - done in fetch
        )
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }
          res.json(`Deleted Belle's quote`);
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));
