/**
 * Copyrigth (C) 2017 Javad Shafique
*/
var Eval = require("./eval.js");
var DataError = require("./Errors").DataError
var _ = require("lodash");


const VALID_OPERATORS = ["===", "==", "!=", "!==", "in", "!", ">", "<", ">=", "<="];

var example_query = {operator:"===", key:"key", value:"tocomparewith"}

class Query {
  static find(obj, query){
    var l = [];
    var i;
    _.forIn(o, function(value, key) {
      if(typeof value === "object"){
        
        _.forIn(value, function(v, k){
          console.log(v, k);
        });
      } else {
        l.push([key, value]);
      }
    });
  }

  static zip(){
    out = [];
    for (let i = 0; i < arguments.length; i++) {
      const element = arguments[i];
        out.push(...element);
    }
    return out;
  }
}

o = {
  this:"is",
  an:"object",
  with:{
    more:"objects",
    because:true
  }
}




module.exports = Query;
