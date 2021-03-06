//Parsing method
//will convert and execute the commands
//needs database to work with
function parse(querystring, run = true){
    //Inject function
    function extract(str, path){ //path for all db.* functions
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
        var args = ['/' + path];
        //Split
        var tmp = str.split("(");
        //check where ( and ) is
        var s1 = getlp(str, "("),
        s2 = getlp(str, ")");
        if(s2 - s1 !== 0){
            args.push(...tmp[1].split(")")[0].split(","));
        }
        //return array:
        return [tmp[0], args];
    }
    //spliting query string to array
    var array =  querystring.split(".");
    if(array[0] === "db"){
        //Query is correct
        //Set a path
        var last = array.length - 1
        var path = [];
        for (var i = 1 ; i < last; i++) {
            path.push(array[i]);
        }
        var list = extract(array[last], path.join("/"));
        return list;
    } else {
        //Query is wrong
        return true; //is query wrong true = Error
    } 
}
//parse('db.a.push({yo:"ho"})');

/*
//Examples:
var ex1 = 'db.array[].push("Hello")' // push to array 

var ex2 = 'db.line.push("You can add single line strings here", false)' //add false so you dont override the data

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
    parse: parse
};