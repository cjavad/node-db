//Fake database
fbase = {
    push: function(arg1, arg2, arg3){console.log("YO"); return false;},
    delete: function(arg1, arg2, arg3){console.log("Dont do this to me"); return false;},
    getData: function(arg1, arg2, arg3){console.log("Sorry i didn't get that"); return false;}
}


//Parsing method
//will convert and execute the commands
//needs database to work with
function parse(querystring, run = true, db = fbase /*Only needed if run = true*/){
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
        var last = array.length - 1, //Set a bunch of vars
        path = [];
        for (var i = 1 ; i < last; i++) {
            path.push(array[i]);
        }
        var into = "/" + path.join("/")
        var command = inject("db." + array[last], into);
        if(run){
            try {
                return eval(command);
            } catch (error) {
                return Error;
            }
        } else {
            return command;
        }
    } else {
        //Query is wrong
        return true; //is query wrong true = Error
    } 
}

/*
//Examples:
var ex1 = 'db.array[].push("Hello")' // push to array 

var ex2 = 'db.line.push("You can add single line strings here", false)' //add false so you dont overide the data

var ex3 = 'db.book.push({price: 14,99})' //Add a price

var ex4 = 'db.book.price.push(12,99)' //Update price 

//deletes entire database
console.log(parse('db.delete()'));

parse(ex1);
parse(ex2);
console.log(parse('db.getData()'));
parse(ex3); //adding price
console.log(parse('db.getData()'));
parse(ex4); //updating price
console.log(parse('db.getData()'));
*/

module.exports = {
    parse: parse,
    fakedb:fbase
};