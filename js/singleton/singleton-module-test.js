let config1 = require('./singleton-module');
let config2 = require('./singleton-module');

// are instances the same
console.log(config1===config2);