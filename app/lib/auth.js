//lib/auth.js hashing using builtin crypto libary
const crypto = require("crypto");


//INMEM database
LOGGED_IN = [];


//Simple HASH functions
function ithash(string){
    return crypto.createHash("sha256").update(string).digest("hex");
}


//global passwords password
let user;
let pass;

//configs
function init(username, password){
    user = username;
    pass = ithash(password);
    return true;
}


function check(username, password){
  if(ithash(password) === pass && username === user){
    return true;
  } else {
    return false;
  }
}

/*
Log in
*/
function login(username, password) {
    if (check(username, password)) {
        var key = getkey();
        /* Add to session */
        LOGGED_IN.push(key);
        return key;
    } else {
        return false;
    }
}

function isLoggedIn(hash) {
    return LOGGED_IN.indexOf(hash) > -1 ? true:false;
}

function logout(key) {
    var index = LOGGED_IN.indexOf(key);
    LOGGED_IN.splice(index, 1);
}

function getkey(username, password) {
    var chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzcvbnm1234567890", out = "";
    for (var i = 0; i < chars.length/2; i++) { out += chars.charAt(~~(Math.random() * (chars.length - 0 + 1)) + 0) }
    return ithash(out);
}


module.exports = {
    init: init,
    check: check,
    login: login,
    logout:logout,
    isLoggedIn: isLoggedIn
};
