//Twitter Clone (CRUD Practice)
const express = require("express");
const app = express();
const path = require("path"); //Get Path
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");//Get random Id

app.use(methodOverride("_method"));
//Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));//Set Path for public folder
app.set("views", path.join(__dirname, "views")); //Set path
app.set("view engine", "ejs");//Find ejs 

//Placeholder for database

let tweets = [
    {
        id: uuid(),
        username: "Mr_Kat",
        tweet: "I love my cats!"
    },
    {
        id: uuid(),
        username: "Karl",
        tweet: "I am still learning programming"
    },
    {
        id: uuid(),
        username: "Princess",
        tweet: "I want to hike Mt.Tarak"
    },
    {
        id: uuid(),
        username: "Shiro",
        tweet: "Meow Meow Meow!"
    },
]

//Home Route
app.get("/", (req, res) => {
    res.render("home");
});

//Index Route for tweets
app.get("/tweets", (req, res) => {
    res.render("tweets", { tweets });
});

//New Route for tweets
app.get("/tweets/new", (req, res) => {
    res.render("new");
});

//Create Post Route for new tweet
app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    tweets.push({ username, tweet, id: uuid() });
    res.redirect("/tweets");
});

//Show Route for specific tweet
app.get("/tweets/:id", (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render("show", { tweet });
});

//Edit Route for specific tweet
app.get("/tweets/:id/edit", (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render("edit", { tweet });
});

//update Route for edited tweet
app.patch("/tweets/:id", (req, res) => {
    const { id } = req.params;
    const newTweet = req.body.tweet;
    const foundTweet = tweets.find(t => t.id === id);
    foundTweet.tweet = newTweet;
    res.redirect("/tweets");
});

//Delete route for specific tweet
app.delete("/tweets/:id", (req, res) => {
    const { id } = req.params;
    tweets = tweets.filter((t => t.id !== id));
    res.redirect("/tweets");
});

const PORT = process.env.PORT || 3000;
//Listen to port
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});