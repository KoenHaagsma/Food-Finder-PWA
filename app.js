const express = require('express');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

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
    res.render('manualInput', {
        prefix: process.env.PREFIX,
    });
});

app.get('/details/:id', async (req, res) => {
    const code = req.params.code;
    await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.status === 0 || data.product.ingredients === undefined || data.product.ingredients.length === 0) {
                res.render('errorPage', {
                    prefix: process.env.PREFIX,
                });
            } else {
                res.render('details', {
                    product: data.product,
                });
            }
        });
});

app.get('/offline', (req, res) => {
    res.render('offline', {
        prefix: process.env.PREFIX,
    });
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
