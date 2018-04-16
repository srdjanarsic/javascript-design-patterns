/**
 * Singleton implementation example ES6
 */

class Config {

    constructor(){
        this._type = "fullHD";
        this._aspectRatio = "16:9";
    }

    // properties
    get type() {
        return this._type;
    }

    // methods
    getAspectRatio(){
        return this._aspectRatio;
    }
}

class SharedConfig{

    // prevent instantiation
    constructor(){
        throw("SharedConfig is a Singleton. Use SharedConfig.getInstance()")
    }

    // this function is exposed as static
    // it always return the same instance
    static getInstance(){
        if(!SharedConfig._instance){
            SharedConfig._instance = new Config();
        }

        return SharedConfig._instance;
    }
}

//export default SharedConfig;
//module.export = SharedConfig;

// singleton usage
var config1 = SharedConfig.getInstance();
var config2 = SharedConfig.getInstance();

console.log(config1.type);              // output: FullHD
console.log(config2.getAspectRatio());  // output: "16:9"
console.log(config1.type);              // output: FullHD
console.log(config2.getAspectRatio());  // output: "16:9"

// are instances the same object ( YES THEY ARE!!! )
console.log(config1===config2);

// this will throw error
// var thisWillFail = new SharedConfig(); 