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
var db = require("./models");

//set port to 8080
var PORT = 8080;

//initiliaze express
var app = express();

//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//makes the public folder static
app.use(express.static("public"));

//use mongoose to connect to mongo db
mongoose.connect("mongodb://localhost/scrape", { useNewUrlParser: true });

//Routes

//Get route to scrape kotaku
app.get("/scrape", function(req, res){
  //axios get request to pull body and store in response obj
  axios.get("http://www.kotaku.com").then(function(response){
    //store response object in $ selector
    // console.log(response) 
    var $ = cheerio.load(response.data);
    //grab every h1 from the body
    $("article").each(function(i, element){
      var result = {};

    result.title = $(this).children("header")
    .children("h1").children("a").text();

    result.url = $(this).children("header")
    .children("h1").children("a").attr("href");

    result.summary = $(this).children("div")
    .children("div").children("p").text();
    

      console.log(result);

      db.article.update(result).then(function(dbArticle){
      console.log(dbArticle);
      }).catch(function(err){
      // console.log(err);
      });
    });
    res.send("Scrape Complete");
  });
});

app.get("/", function(req,res){
  res.render('index');
})

//route to get articles
app.get("/getArticles", function(req, res){
  db.article.find({}).then(function(articleDisp){
    var data = {articles: []};
    for(i=0; i<articleDisp.length; i++){
      var currentArticle = articleDisp[i];
      data.articles.push(currentArticle)
    }
    
    console.log(articleDisp);
    res.render('index', data);
    
    // res.json(articleDisp);
  })
});


//Starts the server
app.listen(PORT, function() {
    console.log("App running on port http://localhost:" + PORT + "/");
    console.log("App running on port http://localhost:" + PORT + "/scrape");
    console.log("App running on port http://localhost:" + PORT + "/getArticles");
  });