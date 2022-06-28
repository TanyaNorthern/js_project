const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
    return fetch(url).then((res) => res.json());
}

function init() {
    const app = new Vue({
        el: '#root',
        data: {
            items: [],
            filteredItems: [],
            search: '',
            cartItems: {},
            cartDisplay: false,
        },
        methods: {
            fetchGoods() {
                this.items = [];
                this.filteredItems = [];
                service(GET_GOODS_ITEMS).then((data) => {
                    this.items = data;
                    this.filteredItems = data;
                });
            },
            filterItems() {
                this.filteredItems = this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.search, 'gui'));
                });
            },
            fetchCartGoods() {
                cartItems = {};
                service(GET_BASKET_GOODS_ITEMS).then((data) => {
                    this.cartItems = data;
                });
            },
            onCartOpen() {
                if (!this.cartDisplay) {
                    this.cartDisplay = true;
                }
            },
            onCartClose() {
                if (this.cartDisplay) {
                    this.cartDisplay = false;
                }
            },
        },
        computed: {
            calculatePrice() {
                return this.filteredItems.reduce((prev, { price }) => {
                    return prev + price;
                }, 0);
            },
            getDisplayCart() {
                return 'display: ' + (this.cartDisplay ? 'flex;' : 'none;');
            },
        },
        mounted() {
            this.fetchGoods();
            this.fetchCartGoods();
        },
    })
}
window.onload = init;
