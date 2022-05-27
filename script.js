const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

class GoodsFormatter {
    constructor(itemClassName = '') {
        this.itemClassName = itemClassName;
    }
    format(item = null) {
        return `<div class="${this.itemClassName}"><h3>${item.title}</h3><p>${item.price}</p></div>`;
    }
}

class GoodsTools {
    summary(items = []) {
        return items
            .map(item => item.price)
            .reduce((prev, next) => prev + next);
    }
}

class CardsHandler {
    constructor(containerClassName = '', goodsFormatter = null, goodsTools = null) {
        this.containerClassName = containerClassName;
        this.goodsFormatter = goodsFormatter;
        this.goodsTools = goodsTools;
    }
    render(items = []) {
        return document.querySelector(`.${this.containerClassName}`)
            .innerHTML = items.map(item => this.goodsFormatter.format(item)).join('');
    }
    summary(items = []) {
        return this.goodsTools.summary(items);
    }
}

const cardsHandler = new CardsHandler('goods-list', new GoodsFormatter('goods-item'), new GoodsTools());
cardsHandler.render(goods);
console.log(cardsHandler.summary(goods))

// Hamburgers

class Cost {
    constructor(price = 0, calories = 0) {
        this.price = price;
        this.calories = calories;
    }
    sum(cost = new Cost()) {
        return new Cost(this.price + cost.price, this.calories + cost.calories);
    }
    multiple(times = 0) {
        return new Cost(this.price * times, this.calories * times);
    }
}

class Addons {
    constructor() {
        this.items = {
            cheese: {
                cost: new Cost(10, 20),
                quantity: 0
            },
            salad: {
                cost: new Cost(20, 5),
                quantity: 0
            },
            potatoes: {
                cost: new Cost(10, 20),
                quantity: 0
            },
            seasoning: {
                cost: new Cost(15, 10),
                quantity: 0
            },
            mayonnaise: {
                cost: new Cost(20, 5),
                quantity: 0
            },
        };
    }
}

class Hamburger {
    constructor(cost = new Cost(), addons = new Addons()) {
        this.cost = cost;
        this.addons = addons;
    }

    incrementTopping(toppingKey) {
        if (toppingKey in this.addons.items) {
            this.addons.items[toppingKey].quantity++;
        }
    }

    incrementAllToppings() {
        for (const toppingKey in this.addons.items) {
            this.addons.items[toppingKey].quantity++;
        }
    }

    decrementTopping(toppingKey) {
        if (toppingKey in this.addons.items) {
            this.addons.items[toppingKey].quantity--;
        }
    }

    resetAllToppings() {
        for (const toppingKey in this.addons.items) {
            this.addons.items[toppingKey].quantity = 0;
        }
    }

    calculateTotalCost() {
        let summary = new Cost();
        for (const toppingKey in this.addons.items) {
            summary = summary.sum(this.addons.items[toppingKey].cost.multiple(this.addons.items[toppingKey].quantity));
        }
        summary = summary.sum(this.cost);
        return summary;
    }
}

const bigHamburgerCost = new Cost(100, 40);
let addons = new Addons();
const bigHamburger = new Hamburger(bigHamburgerCost, addons);
bigHamburger.incrementTopping('cheese');
bigHamburger.incrementTopping('potatoes');
bigHamburger.incrementTopping('potatoes');
bigHamburger.incrementTopping('potatoes');
bigHamburger.decrementTopping('potatoes');
console.log(bigHamburger);
console.log(bigHamburger.calculateTotalCost());

const smallHamburgerCost = new Cost(50, 20);
addons = new Addons();
const smallHamburger = new Hamburger(smallHamburgerCost, addons);
smallHamburger.incrementTopping('cheese');
smallHamburger.incrementTopping('potatoes');
smallHamburger.incrementTopping('potatoes');
smallHamburger.decrementTopping('potatoes');
smallHamburger.incrementTopping('mayonnaise');
console.log(smallHamburger);
console.log(smallHamburger.calculateTotalCost());