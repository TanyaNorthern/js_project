const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS_URL = BASE_URL + '/catalogData.json';
const BASKET_GOODS_URL = BASE_URL + '/getBasket.json'

function service(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
        // Execute in EventLoop!!!
        callback(JSON.parse(xhr.response));
    }
    xhr.send();
}

class GoodsItem {
    constructor({ product_name, price }) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="goods-item">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.items = [];
    }
    fetchData() {
        service(GOODS_URL, data => {
            // Execute in EventLoop!!!
            this.items = data;
            goodsList.render();
            console.log(goodsList.summary());
        });
    }
    render() {
        document.querySelector('.goods-list').innerHTML =
            this.items.map(item => { return new GoodsItem(item).render() }).join('');
    }
    summary() {
        return this.items.reduce((prev, next) => prev + next.price, 0);
    }
}

class BasketGoodsList {
    constructor() {
        this.items = {};
    }
    fetchData() {
        service(BASKET_GOODS_URL, data => {
            // Execute in EventLoop!!!
            this.items = data;
            console.log(this.items);
        });
    }
}

const goodsList = new GoodsList();
goodsList.fetchData();

const basketGoodsList = new BasketGoodsList();
basketGoodsList.fetchData();

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