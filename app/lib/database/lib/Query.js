/**
 * Copyrigth (C) 2017 Javad Shafique
*/
var DataError = require("./Errors").DataError


function Query(data, query){
    try {
        return data.filter(query)
    } catch(err) {
        throw err;
        //throw new DataError("Path '" + path + "' does not exist", 5, err);
    }
}

/**
 * Object Filter Protype
 * filters json by keywords
 * see example
 */
Object.prototype.filter =  function(val) {
    obj = this; //set obj to this
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


/**
 * Example Query
 *db.push("/data", {"big":{"num":"1"}, {"hello":"2"}})
 *db.find("/data", "hello")
 *=> {"hello":"2"}
 */

 module.exports = Query;