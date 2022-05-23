const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Jeans' },
];

const renderGoodsItem = (title = '', price = 0) =>
    `<div class="goods-item">
      <h3>${title}</h3>
      <p>${price}</p>
    </div>`;

const renderGoodsList = (list = []) =>
    document.querySelector('.goods-list')
    .innerHTML = list
    .map(item => renderGoodsItem(item.title, item.price))
    .reduce((first, next) => first + next, '');

renderGoodsList(goods);