//lib/api.js
//express routing config
const auth = require("./auth.js");

module.exports = function(app, db){
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*, *, *, Accept");
        next();
    });
    app.get("/", (req, res, next) => {
        var str = '<body style="background: blanchedalmond; color: sandybrown; margin: 0 auto; width: 50%;"><h2>Where is the control panel???</h2></body>'
        res.send(str);
    });

    app.get("/cp", (req, res) => {
        c = auth.check(req.query.user, req.query.pass)
        if(c){
            res.send("true")
        } else if(!c){
            res.send("false")
        } else {
            res.send("error")
        }
        return true
    });

    app.get("/db", (req, res) => {
        res.send(db.parse(req.query.body));
        return true;
    });
}

/* Example endpoint body object
{
    username:"admin",
    password:"login",
    command: "push"
    path:"/hello/path[]",
    data:["array"],
    override: false
}


*/
