# Publisher-Subscriber

Publisher-subscriber is a design pattern where one object called **Publisher** categorize message and send them to other objects called **Subscribers** without any knowledge about them. Similar **Subscribers** subscribe to category they are interest in.

One of the well known implementation is a EventEmitter.

This is simplified version of EventEmitter implementation.

```js
/** 
 *Class SimpleEventEmitter is a simply implementation of publisher-subscribe pattern.   
 */
class SimpleEventEmitter{

    constructor(){
        // object which contains properties of corresponding events
        // and each property has a array of subscribed listeners
        this.listeners = {};
    }

    /**
     * Function addListeners() is used to add listener for certain event
     * 
     * @param {string} eventName 
     * @param {Function} listener 
     */
    addListener(eventName, listener){

        // check if event listeners array exists
        if(!this.listeners[eventName]){
            this.listeners[eventName] = [];
        }

        // check is listener already exist
        var idx = this.listeners[eventName].indexOf(listener);

        if(idx > -1){
            return;
        }

        // push listener to array
        this.listeners[eventName].push(listener);
    }

    /**
     * Remove listener added with addListener() function 
     * 
     * @param {string} eventName 
     * @param {Function} listener 
     */
    removeListener(eventName, listener){

        if(!this.listeners[eventName]) {
            return;
        }
            
        var idx = this.listeners[eventName].indexOf(listener);

        if(idx == -1){
            return;
        }

        this.listeners[eventName].splice(idx, 1);

        if(this.listeners[eventName].length==0){
            delete this.listeners[eventName];
        }
    }

    /**
     * Broadcast args to all subscribers for eventName event.
     * 
     * @param {*} eventName 
     * @param {*} args 
     */
    emit(eventName, ...args){
        const listenersArr = this.listeners[eventName] ;

        if(!listenersArr) {
            return;
        }

        listenersArr.forEach(listener => {
            listener(...args);
        });
    }
}

// USAGE

const Events = {
    EVENT_ONE : "EVENT_ONE",
    EVENT_TWO : "EVENT_TWO",
    EVENT_THREE : "EVENT_THREE",
}

let eventEmitter = new SimpleEventEmitter();

// client one
let listener1 = (...args)=>{
    console.log("I am MARK and got EVENT_ONE with event data: " + JSON.stringify(args));
}
eventEmitter.addListener(Events.EVENT_ONE, listener1);

// client two
let listener2 = (...args)=>{
    console.log("I am EMILY and got EVENT_ONE with event data: " + JSON.stringify(args));
}
eventEmitter.addListener(Events.EVENT_ONE, listener2);

// client three
let listener3 = (...args)=>{
    console.log("I am BOB and got EVENT_TWO with event data: " + JSON.stringify(args));
}
eventEmitter.addListener(Events.EVENT_TWO, listener3);

// emit
eventEmitter.emit(Events.EVENT_ONE,  {info: "This is EVENT_ONE"});       // THIS WILL RECEIVE client1 and client2
eventEmitter.emit(Events.EVENT_TWO,  {info: "This is EVENT_TWO"});       // THIS WILL RECEIVE client3
eventEmitter.emit(Events.EVENT_THREE,  {info: "This is EVENT_THREE"});   // THERE IS NO SUBSCRIBER FOR THIS EVENT

// unsubscribe
eventEmitter.removeListener(Events.EVENT_ONE, listener2);

//emit after unsubscribe client2
eventEmitter.emit(Events.EVENT_ONE,  {info: "AGAIN - This is EVENT_ONE - AGAIN"}); 
```