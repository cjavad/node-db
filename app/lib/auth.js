//lib/auth.js
const crypto = require("crypto-js");

//Simple encryption/decryption functions

function hash(string){
    return crypto.SHA256(string).toString()
}

function check(string, hash){
    return string === hash;
}



module.exports = {
    hash:hash
}