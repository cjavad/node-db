/**
 * Copyrigth (C) 2017 Javad Shafique
*/
var Eval = require("./eval.js");
var DataError = require("./Errors").DataError
var _ = require("../../low");


const VALID_OPERATORS = ["===", "==", "!=", "!==", "in", "!", ">", "<", ">=", "<="];

var example_query = {operator:"===", key:"key", value:"tocomparewith"}

class Query {

}

function validate_query(query){
  if(VALID_OPERATORS.indexOf(query.operator) > -1){
    return query;
  } else {
    return false;
  }
}

Query.prototype.findKey = function(obj, query, last = false){
  query = validate_query(query);
  if(!query){return false;}
  if(last){
    return _.findLastKey(obj, function(o){
      string = ["o", query.operator, query.value].join(" ");
      return Eval(string); 
    });
  } else {
    return _.findKey(obj, function(o){
      string = ["o", query.operator, query.value].join(" ");
      return Eval(string); 
    });
  }
}




Query.prototype.find = function(collection, query, last = false){
  query = validate_query(query);
  if(!query){return false;}

  if(last){
    return _.findLast(collection, function(o){
      string = ' '.join("o." + query[0], query[1], query[2]);
      return Eval(string); 
    });
  } else {
    return _.find(collection, function(o){
      string = ' '.join("o." + query[0], query[1], query[2]);
      return Eval(string); 
    });
  }
}


Query.prototype.zip = function(){
  out = [];
  for (let i = 0; i < arguments.length; i++) {
    const element = arguments[i];
      out.push(...element);
  }
  return out;
}

 module.exports = Query;