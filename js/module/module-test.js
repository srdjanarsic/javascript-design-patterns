var MyModule = require("./module");
var MyModuleES6 = require("./module-es6");
var { add } = require("./module-functions");

var m1 = new MyModule();
console.log(m1.publicMethod())

var m2 = new MyModuleES6();
console.log(m2.someMethod())

console.log(add(2,3));


