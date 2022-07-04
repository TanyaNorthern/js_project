import { writeFile, readFile } from 'fs/promises'
import express from 'express';
import cors from 'cors';

const GOODS_PATH = './static/goods.json'
const BASKET_GOODS_PATH = './static/basket-goods.json'

function getGoods() {
    return readFile(GOODS_PATH, 'utf-8').then((file) => JSON.parse(file))
}

function getBasketGoods() {
    return readFile(BASKET_GOODS_PATH, 'utf-8').then((file) => JSON.parse(file))
}

function read(PATH) {
    return readFile(PATH, 'utf-8').then((file) => JSON.parse(file));
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

function assemble(res) {
    Promise.all([
        read(BASKET_GOODS_PATH),
        read(GOODS_PATH)
    ]).then(([basketList, goodsList]) => {
        const result = basketList.map(basketItem => {
            const goodsItem = goodsList.find(({ id: _goodsId }) => {
                return _goodsId === basketItem.id;
            });
            return {
                ...basketItem,
                ...goodsItem,
                total: goodsItem.price * basketItem.count
            };
        });
        res.send(JSON.stringify(result));
    });
}

app.get('/goods', (res, req) => {
    getGoods().then((goods) => {
        req.send(JSON.stringify(goods));
    })
});

app.get('/basketgoods', (res, req) => {
    assemble(req);
});

app.post('/basketgoods', (res, req) => {
    getBasketGoods().then((basketGoods) => {
        let hasGod = false;
        const result = basketGoods.map((basketGood) => {
            if (basketGood.id === res.body.id) {
                hasGod = true;
                return {
                    ...basketGood,
                    count: basketGood.count + 1
                }
            } else {
                return basketGood;
            }
        });
        if (!hasGod) {
            result.push({
                id: res.body.id,
                count: 1
            });
        }
        writeFile(BASKET_GOODS_PATH, JSON.stringify(result)).then(() => {
            assemble(req);
        });
    });
});

app.delete('/basketgoods/:id', (res, req) => {
    getBasketGoods().then((basketGoods) => {
        let result = basketGoods.map((basketGood) => {
            if (basketGood.id === res.params.id) {
                if (basketGood.count >= 2) {
                    return {
                        ...basketGood,
                        count: basketGood.count - 1
                    }
                } else {
                    return {
                        ...basketGood,
                        count: 0
                    }
                }
            } else {
                return basketGood;
            }
        })
        result = result.filter(item => item.count > 0);
        writeFile(BASKET_GOODS_PATH, JSON.stringify(result)).then(() => {
            assemble(req);
        });
    });
})

app.listen('8000', () => {
    console.log('server is starting!')
})