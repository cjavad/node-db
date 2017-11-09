//lib/api.js
//express routing config
const auth = require("./auth.js");
const db = require("./db").db




module.exports = function(app, userpass){
    auth.config(userpass.username, userpass.password);
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

        if(!("key" in body || "path" in body || "command" in body)){
            return false;
        } else if(!body.command in ["getData", "push", "delete"]){
            return false;
        }
        if(!auth.check(body.username, body.password)){
            res.send("Wrong password/username");
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
    username:"admin",
    password:"login",
    command: "push"
    path:"/hello/path[]",
    data:["array"],
    overide: false
}


*/