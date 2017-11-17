/**
 * Copyrigth (C) 2017 Javad Shafique
 */
var Eval = require("./eval.js");
var DataError = require("./Errors").DataError
var _ = require("lodash");


const VALID_OPERATORS = ["/", "+", "-", "*", "**"];


class Query {
    constructor(){
        //WIP
    }
    //fun zipping method
    static zip(){
        var out = [];
        if(VALID_OPERATORS.indexOf(arguments[arguments.length - 1]) > -1){
            var l = arguments.length - 1;
            var op = arguments[arguments.length - 1]
            var state = true;
        } else {
            var l = arguments.length;
            var state = false;
        }
        for (let i = 0; i < l; i++) {
            const element = arguments[i];
            out.push(...element);
        }
        if(state){
            return out.join(op);
        }
        return out;
    }
}


Query.prototype.lexer = function(obj, array = false, spread = false){
    //create array
    var l = [];
    //loop over keys
    Object.entries(obj).forEach(
        ([key, value]) => {
            //if the key is an object
            if(typeof value == "object"){
                //iteerate over it
                if(spread && array){
                    l.push(...this.lexer(value, array, spread));
                } else {
                    //if it set not to spread keys
                    l.push(this.lexer(value, array, false));
                }
            //else if key if an key
            } else {
                //check if array is set to true
                if(array){
                    //if it is push as array
                    l.push([key, value])
                } else {
                    //else push as json
                    l.push(JSON.parse('{"' + key + '":"' + value +'"}'));
                }
            }
        }
    );
    //return array
    return l;
}

//search for key by value
Query.prototype.searchkeybyvalue = function(obj, value){
    //lex object into an array
    lexed = this.lexer(obj, true, true);
    //loop over arrays
    for(var i = 0; lexed.length; i++){
        o = lexed[i];
        //if undefined return undefined
        if(o === undefined){
            return undefined;
        }
        //else check if the values matches
        if(o[1] == value){
            return o[0];
        }
    }
    return undefined;
}
//reverse searchkeybyvalue functoin
//search for value by key
Query.prototype.searchvaluebykey = function(obj, key){
    //lex object into an array
    lexed = this.lexer(obj, true, true);
    //loop over arrays
    for(var i = 0; lexed.length; i++){
        o = lexed[i];
        //if undefined return undefined
        if(o === undefined){
            return undefined;
        }
        //check if the key matches
        if(o[0] == key){
            return o[1];
        }
    }
    return undefined;
}

var q = new Query();

obj = {data:"hello", object:{inner:true}}

console.log(q.searchkeybyvalue(obj, true));

console.log(q.searchvaluebykey(obj, "inner"));

module.exports = Query;
