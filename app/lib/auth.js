//lib/auth.js
const crypto = require("crypto-js");

//Simple encryption/decryption functions

function encrypt(string, key){
    return crypto.AES.encrypt(string, key).toString(); //Return encrypted string;
}

function decrypt(encryptedstr, key){
    return crypto.AES.decrypt(encryptedstr, key).toString(crypto.enc.Utf8);
}

module.exports = {
    encrypt:encrypt,
    decrypt: decrypt
}