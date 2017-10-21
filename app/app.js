//Node NoSql database by (c) Javad Shafique

//Require modules that are needed
const express = require("express");
const path = require("path");
const JsonDB = require("node-json-db");
const auth = require("./lib/auth.js");

//Express config
const app = express();
const port = process.env.PORT || 80;

//Database config
const db = new JsonDB("db", true /*To autosave*/, true /*Save in human reable form*/);


//Parsing method
function parse(querystring){
    //Inject function
    function inject(str, into){
        //Splice and inject prototype
        String.prototype.splice = function(idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };
        //Get precise location of char in string with support for using charAt again to verify
        function getlp(string, char, cat = true){
            //For loop to loop over strign
            for (var i = 0; i < string.length; i++) {
                //check if it mathed char
                if(string.charAt(i) === char){
                    //if it did check cat and return value
                    if(cat){
                        return i;
                    } else {
                        return i+1;
                    }
                }
            }
            //else return false
            return false;
        }
        //Use getlp
        var s1 = getlp(str, "(", false);
        var s2 = getlp(str, ")", false);
        //Check results and if there is other args
        if(s2 - s1 !== 1){
            //add comma and path
            into = '"' + into + '", ';
        } else if(s2 - s1 === 1) {
            //Dont add comma only path
            into = '"' + into + '"';
        }
        //return results from splice
        return str.splice(s1, 0, into);
    }
    //spliting query string to array
    var array =  querystring.split(".");
    if(array[0] === "db"){
        //Query is correct
        var last = array.length - 1;
        var path = [];
        for (var i = 1 ; i < last; i++) {
            path.push(array[i]);
        }
        var into = "/" + path.join("/")
        var command = inject("db." + array[last], into);
        return eval(command);
    } else {
        //Query is wrong
        return true; //is query wrong true = Error
    } 
}
/*
str = 'db.hello.print("a")'
var arr = parse(str);

console.log(arr);
*/
print(parse('db.posts.delete()'))