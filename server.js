//require express, handlebars, mongoose
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");

//scraping tools
const cheerio = require("cheerio");
const axios = require("axios");

//db name: scrape
//collection name: articles

//requires the models folder for mongoose
// var db = require("./models");

//set port to 8080
var PORT = 8080;

//initiliaze express
var app = express();

//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//makes the public folder static
app.use(express.static("public"));

//use mongoose to connect to mongo db
mongoose.connect("mongodb://localhost/scrape", { useNewUrlParser: true });

//Routes

app.get("/scrape", function(req, res){
  axios.get("http://www.kotaku.com").then(function(response){
    var $ = cheerio.load(response.data);
    $("h1").each(function(i, element){
      var result = {};

    result.title = $(this)
      .children("a")
      .text();
    result.link = $(this)
      .children("a")
      .attr("href");

      console.log(result);


    });
    res.send("Scrape Complete");
  });
});

//Starts the server
app.listen(PORT, function() {
    console.log("App running on port http://localhost:" + PORT);
  });