//lib/api.js
//express routing config
const auth = require("./auth.js");
const db = require("./db").db




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

    app.get("/endpoint", (req, res) => {
        var False = false //support for python
        var body = JSON.parse(req.query.body);
        var hash = auth.get();

        if(!("key" in body || "path" in body || "command" in body)){
            return false;
        } else if(!body.command in ["getData", "push", "delete"]){
            return false;
        }
        if(!body.hash === hash){
            res.send("Wrong Key");
            return false;
    
        } else if(body.command === ("getData" || "delete")){
            var sendt = db[body.command](body.path)
            res.send(sendt);
        } else if(("data" in body || "overide" in body) && body.command === "push"){
            var sendt = db[body.command](body.path, body.data, body.overide);
            res.send(sendt)
        } else {
            res.sendStatus(403);
            return false;
        }
        
        
    });
}

/* Example endpoint body object
{
    key:3049a1f8327e0215ea924b9e4e04cd4b0ff1800c74a536d9b81d3d8ced9994d3,
    command: "push"
    path:"/hello/path[]",
    data:["array"],
    overide: false
}


*/