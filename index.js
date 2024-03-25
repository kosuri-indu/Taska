const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const boxes = require("./routes/boxes.js");
const initDB = require("./init/init.js"); 
require('dotenv').config();
const dbURL = process.env.ATLASDB_URL;

main()
    .then(async () => {
        console.log("MongoDB is connected");
        await initDB(); 
    })
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(dbURL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//Root Route
app.get("/", (req,res) => {
    res.render("home.ejs");
}); 

app.use("/boxes", boxes);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});