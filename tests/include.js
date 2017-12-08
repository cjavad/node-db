Array.prototype.inArray = function(string) {
    return this.indexOf(string) > -1;   
}

array = [];

for (let i = 0; i < 1000; i++) {
    array.push(i);
}

console.time("includes");
for (let i = 0; i < array.length; i++) {
    if(!array.includes(array[i])){
        console.log(i);
    };
}
console.timeEnd("includes");


console.time("indexof");
for (let i = 0; i < array.length; i++) {
    if(!array.inArray(array[i])){
        console.log(i);
    }
}
console.timeEnd("indexof");