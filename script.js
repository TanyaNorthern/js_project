const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS_URL = BASE_URL + '/catalogData.json';
const BASKET_GOODS_URL = BASE_URL + '/getBasket.json'

function service(url, callback) {
    fetch(url).then(response => response.json()).then(data => callback(data));
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
        this.filteredItems = [];
    }

    fetchData() {
        service(GOODS_URL, data => {
            // Execute in EventLoop!!!
            this.items = data;
            this.filteredItems = data;
            goodsList.render();
            console.log(this.items);
            console.log(goodsList.summary());
        });
    }
    filterItems(value) {
        this.filteredItems = this.items.filter(({ product_name }) => {
            return product_name.match(new RegExp(value, 'gui'));
        })
    }
    render() {
        document.querySelector('.goods-list').innerHTML =
            this.filteredItems.map(item => { return new GoodsItem(item).render() }).join('');

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

document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
    const value = document.getElementsByClassName('goods-search')[0].value;
    goodsList.filterItems(value);
    goodsList.render();
});

const goodsList = new GoodsList();
goodsList.fetchData();

const basketGoodsList = new BasketGoodsList();
basketGoodsList.fetchData();