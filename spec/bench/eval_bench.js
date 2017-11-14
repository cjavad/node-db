var Eval = require("./eval.js");


var times = 100;
var command = "100 * 10 + 15 == 1015; console.log(' '); console.log('SAFE IS FASYSES')";

console.time("safe-eval");

for (let i = 0; i < times; i++) {
    Eval(command);
}
console.timeEnd("safe-eval");

console.time("eval");
for (let i = 0; i < times; i++) {
    eval(command);
}
console.timeEnd("eval");
