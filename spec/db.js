const query = require("./query.js");

function pquery(q){
    const out = query.parse(q);
    
    var args = out[1];
    //Split for array testing
    var d = args[1].split("[").join().split("]").join().split(",");
 
    eval("args[0] = " + args[0])
 
    if(args.length === 3){
        db[out[0]](args[0], args[1], args[2])
    } else if(args.length === 2){
        db[out[0]](args[0], args[1])
    } else if(args.length === 1){
        db[out[0]](args[0])
    } else {
        return false
    }

    //if success return true
    return true
}
