//lib/auth.js hashing using builtin crypto libary
const crypto = require("crypto");

//Simple HASH functions
function ithash(string){
    return crypto.createHash("sha256").update(string).digest("hex")
}

//global passwords password
let user;
let pass;

function config(username, password){
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


module.exports = {
    config:config,
    check:check
}
