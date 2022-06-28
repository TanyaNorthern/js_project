const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GOODS_URL = BASE_URL + '/catalogData.json';
const BASKET_GOODS_URL = BASE_URL + '/getBasket.json'

function service(url) {
    return fetch(url).then(response => response.json());
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
        return service(GOODS_URL);
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
        return service(BASKET_GOODS_URL);
    }
}

document.getElementsByClassName('search-button')[0].addEventListener('click', () => {
    const value = document.getElementsByClassName('goods-search')[0].value;
    goodsList.filterItems(value);
    goodsList.render();
});

const goodsList = new GoodsList();
goodsList.fetchData().then(data => {
    goodsList.items = data;
    goodsList.filteredItems = data;
    goodsList.render();
    console.log(goodsList.items);
    console.log(goodsList.summary());
});

const basketGoodsList = new BasketGoodsList();
basketGoodsList.fetchData().then(data => {
    basketGoodsList.items = data;
    console.log(basketGoodsList.items);
});