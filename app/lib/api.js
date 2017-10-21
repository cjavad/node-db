//lib/api.js
//express routing config
const auth = require("./auth.js");

//placeholders for snippets
var placeholder = require("express");
var app = placeholder();


module.exports = function(/*app here*/ query){
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*, *, *, Accept");
        next();
    });
    app.get("/", (req, res, next){
        
    }
}