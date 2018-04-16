# Strategy

Strategy pattern define how the family of algorithms are grouped. 
They share common interface and can be interchangeable.
Algorithm extends interface and implement interface.

Client use interface for execute concrete strategy.

```js
/**
 * Define a interface for algorithm execution
 */
class AbstractCheckout{

    get(){
        throw "Override get() of AbstractCheckout inside " + Object.getPrototypeOf(this).constructor.name + " please!";
    }
}

/** 
 * Create concrete strategy RegularCheckout extending AbstractCheckout
 */
class RegularCheckout extends AbstractCheckout {

    get(price){
        return price;
    }   
}

/** 
 * Create concrete strategy HappyOurCheckout extending AbstractCheckout
 */
class HappyOurCheckout extends AbstractCheckout {
    
    get(price){
        return price / 2;
    }  
}

// USAGE

let checkout1 = new HappyOurCheckout();
let checkout2 = new RegularCheckout();
 
console.log(checkout1.get(100)); // half a price
console.log(checkout2.get(100)); // regular
```



