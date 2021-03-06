# Chain of responsibility

Chain of responsibility is design pattern where object called Receiver (wiki: processing object) receive object called Request (wiki: command object), process Request if they interested in and pass Request to next Receiver.

We use Chain of responsibility in situation where we have two or more object and each object is responsible for certain task.

COR decouple sender and receiver and add flexibility that multiple objects can handle request.

Usage:
* Multiple object need to handle request. 
* When it's not clear who need to process request.
* When we need to dynamically create chain of receiver.

Benefits:
* Decouple sender and receiver
* Divide responsibility into smaller chunks that do one thing (single responsibility principe)

Potential issues
* Request may just pass without any execution.


```js
/**
 * Request
 */
class Ingredients {

    constructor(){
        this.flour = 0;
        this.eggs = 0;
        this.sugar = 0;
    }
}

/** 
 * Abstract (interface) for handlers 
 */
class AbstractAdd {

    execute(ingredients){
        throw "Override execute "
    }

    addNext(next){
        this.next = next;
        return this;
    }

    callNext(...args){
        if(!this.next){
            console.log("Cake is done!");
            return;
        }

        this.next.execute(...args)
    }
}

/** 
 * AddFlour handler implementation
 */
class AddFlour extends AbstractAdd {

    execute(ingredients){
        if(ingredients.flour > 0){
            console.log(`Add ${ingredients.flour }g flour to cake!`);
        }

        this.callNext(ingredients)
    }

}

/** 
 * AddEggs handler implementation
 */
class AddEggs extends AbstractAdd {

    execute(ingredients){
        if(ingredients.eggs > 0){
            console.log(`Add ${ingredients.eggs } eggs to cake!`);
        }

        this.callNext(ingredients)
    }

}

/** 
 * AddSugar handler implementation
 */
class AddSugar extends AbstractAdd {

    execute(ingredients){
        if(ingredients.sugar > 0){
            console.log(`Add ${ingredients.sugar }g sugar to cake!`);
        }

        this.callNext(ingredients)
    }

}

class CakeMaker{

    make(){
        // make request object
        var ingredients = new Ingredients();
        ingredients.eggs = 3;
        ingredients.flour = 1000;
        ingredients.sugar = 300;

        // instance handlers
        var addFlour = new AddFlour();
        var addEggs = new AddEggs();
        var addSugar = new AddSugar();

        // chain handlers
        addFlour.addNext(addEggs).addNext(addSugar);

        // addFlour is first element in the chain. execute it.
        addFlour.execute(ingredients);
    }
}


var cakeMaker = new CakeMaker();
cakeMaker.make();
```