# Mediator pattern

Mediator pattern defines a object called Mediator that encapsulate how set of objects called Colleagues communicates.
So, its fully decouple Colleagues from each other.

The basic example of Mediator is real world Auction process.

Mediator pattern help as to decouple hardly coupled objects. In a situation when we have a lot of classes that communicates with each other, we have a hardly coupled code. In this situation mediator provide a way to instrument communication between dependent objects, so object became independent form each other.


Dependencies inside mediator:  
* Colleagues store Mediator reference and use Mediator interface for notify mediator about change.
* Mediator interface usually provide one method. Concrete Mediator can extend this interface. Concrete Mediator is coupled with components so it know each component its interface.

Benefit of using mediator pattern
* Decoupling components form each other
* Allow reuse of components
* Centralize communication between components
* Allow further interaction changing  between individual object, without changing object (Colleagues) itself.

Disadvantage
* May introduce SPOF Single Point Of Failure
* May become God object (object that know to much (anti-pattern))

```js
/**
 * AuctionItem store a state about auction
 */
class AuctionItem {

    constructor(name, currentPrice){
        this._name = name;
        this._currentPrice = currentPrice;
        this._startPrice = currentPrice;

    }
    get name() {
        return this._name;
    }

    get price() {
        return this._currentPrice;
    }

    get startPrice() {
        return this._startPrice;
    }

    updatePrice(price){
        this._currentPrice = price;
    }

    toString(){
        return `Item '${this.name}' costs $${this.price}`;
    }
}


/** 
 *Class AuctionMediator present a Mediator.   
 */
class AuctionMediator{

    constructor(){
        // array which contains AuctioneerCollege objects
        this.auctioneers = [];
        this.seller;
    }

    // interface for sellers
    registerSeller(seller){
        this.seller = seller;
    }

    //interface for auctioneers
    registerAuctioneer(auctioneer){
        this.auctioneers.push(auctioneer)
    }

    //interface for auctioneers
    unregisterAuctioneer(auctioneer){
        let idx = this.auctioneers.indexOf(auctioneer);
        
        if(idx==-1) {
            return;
        }

        this.auctioneers.splice(idx, 1);
    }

    //interface for auctioneers
    placeBid(price){
        this.item.updatePrice(price);

        this.auctioneers.forEach(auctioneer => {
            auctioneer.priceChanged(this.item);
        });
    }

    //interface for client
    startAuction(item){
        this.item = item;
        this.auctioneers.forEach(auctioneer => {
            auctioneer.auctionStart(this.item);
        });
    }

}


class AbstractCollege{

    constructor(auctionMediator){
        this.auctionMediator = auctionMediator;
    }
    
    auctionStart(item){
        throw "Override auctionStart() of AbstractCollege please!";
    }

    priceChanged(price){
        throw "Override priceChanged() of AbstractCollege please!";
    }
}

class AuctioneerCollege extends AbstractCollege{

    constructor(auctionMediator, name){
        super(auctionMediator);

        this.name = name;

        this.auctionItem = null;
    }
    auctionStart(item){
        this.auctionItem = item;
        console.log(this.name + " receive NEW auction: " + item);
    }

    priceChanged(item){
        this.auctionItem = item;
        console.log(this.name + " receive PRICE change: " + item);
    }

    placeBid(newPrice){
        auctionMediator.placeBid(newPrice)
    }
}

// USAGE

// mediator
let auctionMediator = new AuctionMediator();

// auctioneers
let auctioneer1 = new AuctioneerCollege(auctionMediator, "John");
let auctioneer2 = new AuctioneerCollege(auctionMediator, "Bob");
let auctioneer3 = new AuctioneerCollege(auctionMediator, "Jessica");

// register
auctionMediator.registerAuctioneer(auctioneer1);
auctionMediator.registerAuctioneer(auctioneer2);
auctionMediator.registerAuctioneer(auctioneer3);

// just the item
let auctionItem = new AuctionItem("Violin", 100);

// start new auction
auctionMediator.startAuction(auctionItem);

// lets bid
console.log("-");
auctioneer2.placeBid(240);

console.log("-");
auctioneer1.placeBid(300);

console.log("-");
auctioneer3.placeBid(460);
```