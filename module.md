# Module pattern

Module pattern is commonly used. We use it to encapsulate and build modular codebase.
Each modules may have dependencies and modules that depend on it.


Simple module boilerplate (ES5)

```js
module.exports = function(){

    // this function is private 
    // it's added to return object
    function privateMethod(){

        return "Return from privateMethod()";
    }


    // this function is public as 
    // it's added to return object
    function publicMethod(){

        // call private method(
        var retString = privateMethod();

        retString += "\n" + "Return from someMethod()";

        return retString;
    }
 
    // public properties and methods
    return {
        publicMethod: publicMethod
        //...
    }
}
```

Module using ES6

```js
class MyModule{

    constructor(){
        //...
    }

    someMethod(){
        return "Return from someMethod() - ES6";
    }
}

//module.exports = MyModule; // nodejs
//export default MyModule    // ES6
```