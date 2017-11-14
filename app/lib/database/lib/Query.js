/**
 * Copyrigth (C) 2017 Javad Shafique
*/
var Eval = require("./eval.js");
var DataError = require("./Errors").DataError
var _ = require("../../low");
var parser = new Parser({operators:{'in':true}});

function Query(){
  return this;
}



Query.prototype.findKey = function(obj, value, last = false){
  if(last){
    return _.findLastKey(obj, function(o){
      return o === value;
    });
  } else {
    return _.findKey(obj, function(o){
      return o === value;
    });
  }
}




/**
 * 
 * @param {*} collection is an collection of objects 
 * @param {*} query is a query like this {key:"pants", operator:" <=", "to":"value to match"}
 * @param {*} last 
 */


Query.prototype.find = function(collection, query, last = false){
  if(last){
    return _.findLast(collection, function(o){
      
    });
  } else {
    return _.find(collection, function(o){
      return o[query.key] 
      });
  }
}



/**
 * Object Filter Prototype
 * filters json by keywords
 * see example
 */
Object.prototype.filter =  function(val) {
    obj = this;
    var result = Object.keys(obj).reduce(function(r, e) {
      if (e.toLowerCase().indexOf(val) != -1) {
        r[e] = obj[e];
      } else {
        Object.keys(obj[e]).forEach(function(k) {
          if (k.toLowerCase().indexOf(val) != -1) {
            var object = {}
            object[k] = obj[e][k];
            r[e] = object;
          }
        })
      }
      return r;
    }, {})
    return result;
}


 module.exports = Query;