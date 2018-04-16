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