import { writeFile, readFile } from 'fs/promises'
import express from 'express';
import cors from 'cors';

const GOODS_PATH = './static/goods.json'
const BASKET_PATH = './static/basket-goods.json'

function read(PATH) {
    return readFile(PATH, 'utf-8').then((file) => JSON.parse(file));
}

function readGoods() {
    return readFile(GOODS_PATH, 'utf-8').then((file) => JSON.parse(file));
}

function readBasket() {
    return readFile(BASKET_PATH, 'utf-8').then((file) => JSON.parse(file));
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/goods', (res, req) => {
    read(GOODS_PATH).then((goods) => {
        req.send(JSON.stringify(goods));
    });
});

app.get('/basket', (res, req) => {
    Promise.all([
        read(BASKET_PATH),
        read(GOODS_PATH)
    ]).then(([basketList, goodsList]) => {
        return basketList.map(basketItem => {
            const goodsItem = goodsList.find(({id: _goodsId}) => {
                return _goodsId === basketItem.id;
            });
            return {
                ...basketItem,
                ...goodsItem
            };
        });
    }).then(result => {
        req.send(JSON.stringify(result));
    });
});

app.listen('8000', () => {
    console.log('server is starting!')
});