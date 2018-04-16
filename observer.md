# Observer

Observer pattern is a design pattern which consist of two object. One called **Subject** and another called **Observer**.  
Subject maintain a list of Observers. When Subject changes its state it notify observers thought defined interface.

**Subject** holds a list of observers. Simplest interface implementation has interface `attach()`, `detach()` and `notify()`.

**Observer** has defined interface for notification. The simple implementation uses `update()` method. Observer holds reference to Subject and use its methods (attach, detach and other methods to inform Subject about change).

Known implementation is MVC. View notify Model.

```js
/**
 * Subject implementation
 */
class SimpleSubject{

    constructor(){
        this.observers = [];
    }

    attach(observer){
        if(this.observers.indexOf(observer)==-1){
            this.observers.push(observer);
        }
    }
    detach(observer){
        var idx = this.observers.indexOf(observer);
        if(idx > -1){
            this.observers.splice(idx, 1);
        }
    }
    notify(observer, data){
        var idx = this.observers.indexOf(observer);
        if(idx > -1){
            observer.notify(data);
        }
    }
    notifyAll(data){
        this.observers.forEach(observer=>{
            observer.notify(data);
        })
    }
}

/**
 * Observer implementation
 */
class SimpleObserver{

    constructor(name){
        this.name = name;
    }

    notify(data){
        console.log("My name is " + this.name + ". I am notified with data: " + data + "");
    }
}


// USAGE

let subject = new SimpleSubject();

let observer1 = new SimpleObserver("Bob");
let observer2 = new SimpleObserver("Mark");
let observer3 = new SimpleObserver("John");

// subscribe
subject.attach(observer1);
subject.attach(observer2);
subject.attach(observer3);

// notify all
subject.notifyAll("Hello all!"); 

// notify one
subject.notify(observer2, "This is a message only for Mark"); 

// unsubscribe
subject.detach(observer2);

// this is not broadcaster to Mark, he is unsubscribed
subject.notifyAll("This is a message for all"); 
```
