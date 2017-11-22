/**
 * Copyrigth (C) 2017 Javad Shafique
 */
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
        for (let i = 0; i < arguments.length; i++) {
            const element = arguments[i];
            out.push(...element);
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
    var lexed = this.lexer(obj, true, true);
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
    var lexed = this.lexer(obj, true, true);
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
/*
* example query
*
* {hello: "hello"}
*
* @argument obj is an json object
* @argument query an query object see example
*/

//loops over object to return collection
Query.prototype.find = function(obj, query){
  //set vars result, key and res
  var results = []; //out
  var key; //current key
  //response from this.find_one
  var res = results.push(this.find_one(obj, query));
  do {
    //do this
    //set key
    key = Object.keys(res)[0];
    //delete ket from object
    delete obj[key];
    //check if response if object
    if(typeof res === "object"){
      //if it is push to out
      results.push(res);
    }
    //get new response
    res = this.find_one(obj, query);
  //as long as response is not undefined
  } while (res !== undefined);
  results.shift() //remove extra
  return results;
}

Query.prototype.find_one = function(obj, query){
  //set out
  var json = {};
  //use lowdash _.findKey to find key
  var key = _.findKey(obj, query);
  //if no data it found return undefined
  if(key == undefined){
    return undefined;
  } else {
    //else return json with key and value
    json[key] = obj[key];
    return json;
  }
}

/* Tests
var q = new Query();
obj = {data:"hello", object:{inner:true}, obj:{inner:true}}

console.log(q.find_one(obj, {inner:true}));
console.log(q.find(obj, {inner:true}));
*/

module.exports = Query;
