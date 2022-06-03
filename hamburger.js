// Hamburgers

class Cost {
    constructor(price = 0, calories = 0) {
        this.price = price;
        this.calories = calories;
    }

    sum(cost = new Cost()) {
        return new Cost(this.price + cost.price, this.calories + cost.calories);
    }
}

class QuanteeCost extends Cost {
    constructor(price = 0, calories = 0) {
        super(price, calories);
        this.quantity = 0;
    }

    getCost() {
        return new Cost(this.price * this.quantity, this.calories * this.quantity);
    }
}

class Toppings {
    static cheeseTopping = 'cheese';
    static saladTopping = 'salad';
    static potatoesTopping = 'potatoes';
    static seasoningTopping = 'seasoning';
    static mayonnaiseTopping = 'mayonnaise';

    constructor() {
        this.items = {};
        this.items[Toppings.cheeseTopping] = new QuanteeCost(10, 20);
        this.items[Toppings.saladTopping] = new QuanteeCost(20, 5);
        this.items[Toppings.potatoesTopping] = new QuanteeCost(15, 10);
        this.items[Toppings.seasoningTopping] = new QuanteeCost(15, 0);
        this.items[Toppings.mayonnaiseTopping] = new QuanteeCost(20, 5);
    };

    getCost() {
        let summary = new Cost();
        for (const toppingKey in this.items) {
            summary = summary.sum(this.items[toppingKey].getCost());
        }
        return summary;
    }
}

class Hamburger {
    constructor(cost = new Cost(), toppings = new Toppings()) {
        this.cost = cost;
        this.toppings = toppings;
    }

    incrementTopping(toppingKey) {
        if (toppingKey in this.toppings.items) {
            this.toppings.items[toppingKey].quantity++;
        }
    }

    incrementAllToppings() {
        for (const toppingKey in this.toppings.items) {
            this.toppings.items[toppingKey].quantity++;
        }
    }

    decrementTopping(toppingKey) {
        if (toppingKey in this.toppings.items) {
            this.toppings.items[toppingKey].quantity--;
        }
    }

    resetAllToppings() {
        for (const toppingKey in this.toppings.items) {
            this.toppings.items[toppingKey].quantity = 0;
        }
    }

    getCost() {
        return this.cost.sum(this.toppings.getCost());
    }
}

const bigHamburger = new Hamburger(new Cost(100, 40), new Toppings());
bigHamburger.incrementTopping(Toppings.cheeseTopping);
bigHamburger.incrementTopping(Toppings.potatoesTopping);
bigHamburger.incrementTopping(Toppings.potatoesTopping);
bigHamburger.incrementTopping(Toppings.potatoesTopping);
bigHamburger.decrementTopping(Toppings.potatoesTopping);
console.log('big hamburger');
console.log(bigHamburger.getCost());

const smallHamburger = new Hamburger(new Cost(50, 20), new Toppings());
smallHamburger.incrementTopping(Toppings.cheeseTopping);
smallHamburger.incrementTopping(Toppings.potatoesTopping);
smallHamburger.incrementTopping(Toppings.potatoesTopping);
smallHamburger.decrementTopping(Toppings.potatoesTopping);
smallHamburger.incrementTopping(Toppings.mayonnaiseTopping);
console.log('small hamburger');
console.log(smallHamburger.getCost());