/**
 * Exported object are singleton 
 */

class SharedConfig {

    someMethodOnSingleton(){
        return "ABC";
    }

}

module.exports = new SharedConfig();
