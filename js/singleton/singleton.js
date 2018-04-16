/**
 * Singleton implementation example
 */
var SharedConfig = (function(){

    // this holds our instance (one instance)
    var instance;

    // this is singleton object initialization function
    // we call this only once
    function init(){
        // private properties
        var type = "FullHD";
        var aspectRatio = "16/9";

        // private methods
        function getAspectRatio(){
            return aspectRatio;
        }

        // public properties and methods
        return {
            type:type,
            getAspectRatio:getAspectRatio
        }
    }
   
    // this function is exposed as public
    // it always return the same instance
    function getInstance(){
       if(!instance){
           instance = new init(); 
       } 
        return instance;
    }

    // public interface
    return {
       getInstance:getInstance
    }

})();

// singleton usage
var config1 = SharedConfig.getInstance();
var config2 = SharedConfig.getInstance();

console.log(config1.type);              // output: FullHD
console.log(config2.getAspectRatio());  // output: "16:9"
console.log(config1.type);              // output: FullHD
console.log(config2.getAspectRatio());  // output: "16:9"

// are instances the same object ( YES THEY ARE!!! )
console.log(config1===config2);
