//lib/auth.js
const crypto = require("crypto-js");

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
    return crypto.SHA256(string).toString()
}

function check(username, string){
    if(ithash(string) === get() && username === user);
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