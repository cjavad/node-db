//lib/auth.js
const crypto = require("crypto-js");

//Simple HASH functions

//hardcodes password
pass = "passwords"

function ithash(string){
    return crypto.SHA256(string).toString()
}

function check(string, hash){
    return ithash(string) === hash;
}

function get(){
    return ithash(pass)
}


console.log(get())

module.exports = {
    hash:ithash,
    check:check,
    get:get
}