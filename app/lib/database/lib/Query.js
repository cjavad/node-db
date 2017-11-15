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
  var l = [];
  Object.entries(obj).forEach(
    ([key, value]) => {
      if(typeof value == "object"){
        if(spread && array){
          l.push(...lexer(value, array, spread));
        } else {
          l.push(lexer(value, array, false));
        }
      } else {
        if(array){
          l.push([key, value])
        } else {
          l.push(JSON.parse('{"' + key + '":"' + value +'"}'));
        }
      }
    }
  );
  return l;
}

module.exports = Query;
