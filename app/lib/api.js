//lib/api.js
//express routing config
const auth = require("./auth.js");

//placeholders for snippets
var placeholder = require("express");
var app = placeholder();


module.exports = function(app, query){
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*, *, *, Accept");
        next();
    });
    app.get("/", (req, res, next) => {
        var str = '<body style="background: blanchedalmond; color: sandybrown; margin: 0 auto; width: 50%;"><h2>Where is the control panel???</h2></body>'
        res.send(str);
    });
}