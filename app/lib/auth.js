//lib/auth.js
const crypto = require("crypto");

//Simple HASH functions

//hardcodes password
let user;
let pass;

function config(username, password){
    user = username;
    pass = password;
    return true;
}

function ithash(string){
    return crypto.createHash("sha256").update(string).digest("hex")
}

function check(username, password){
    console.log(username, user);
    console.log(password, pass)
    if(password === pass && username === user){
        return true;
    } else {
        return false;
    }
}

function get(){
    return ithash(pass)
}


module.exports = {
    config:config,
    hash:ithash,
    check:check,
    get:get
}