const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');
const compression = require('compression');

const app = express();

app.use(compression());

app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
    res.setHeader('Cache-Control', 'max-age=365000000, immutable');
    next();
});

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {
        prefix: process.env.PREFIX,
    });
});

app.get('/scanner', (req, res) => {
    res.render('scanner', {
        prefix: process.env.PREFIX,
    });
});

app.get('/manual', (req, res) => {
    res.render('manual', {
        prefix: process.env.PREFIX,
    });
});

app.get('/results', async (req, res) => {
    if (req.query === undefined || req.query.length === 0) {
        res.redirect('/manual');
    } else {
        let counter = 1;
        counter = parseInt(req.query.counter);
        await fetch(`https://world.openfoodfacts.org/category/${req.query.product}/${counter}.json`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.products);
                res.render('results', {
                    prefix: process.env.PREFIX,
                    products: data,
                    placeholderProduct: req.query.product,
                    count: data.count,
                });
            })
            .catch((err) => {
                res.redirect('/errorPage');
                console.error(err);
            });
    }
});

app.get('/details/:id', async (req, res) => {
    const code = req.params.id;
    await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 0) {
                res.render('errorPage', {
                    prefix: process.env.PREFIX,
                });
            } else {
                console.log(data.product.product);
                res.render('details', {
                    product: data.product,
                });
            }
        });
});

app.get('/offline', (req, res) => {
    res.render('offline');
});

app.get('/error', (req, res) => {
    res.render('errorPage', {
        prefix: process.env.PREFIX,
    });
});

app.use((req, res) => {
    res.status(404).render('error404', {
        prefix: process.env.PREFIX,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Application started on port: http://localhost:${process.env.PORT}`);
});
