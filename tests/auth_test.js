const auth = require("../app/lib/auth");

auth.init("user", "pass");
var u1 = auth.login("user", "pass");
console.log(auth.isLoggedIn(u1));