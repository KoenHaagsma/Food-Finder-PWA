require('dotenv').config();
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/scanner', function (req, res) {
    res.render('scanner');
});

app.get('/manual', function (req, res) {
    res.render('manualInput');
});

app.get('/details/:id', function (req, res) {
    res.render('details');
});

app.get('/error', function (req, res) {
    res.render('error404');
});

app.set('port', process.env.PORT || 8000);

const server = app.listen(app.get('port'), function () {
    console.log(`Application started on port: ${app.get('port')}`);
});
