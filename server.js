"use strict";
var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express(),
    categories = JSON.parse(fs.readFileSync('data/categories.json', 'utf-8')),
    annonces = JSON.parse(fs.readFileSync('data/annonces.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-InlineCount');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})


//The dist folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + '/dist'));

app.get('/api/annonces', (req, res) => {
    res.json(annonces);
});

app.get('/api/annonces/:id', (req, res) => {
    let annonceId = +req.params.id;
    let selectedAnnonce = {};
    for (let annonce of annonces) {
        if (annonce.id === annonceId) {
            selectedAnnonce = annonce;
            break;
        }
    }
    res.json(selectedAnnonce);
});


app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.post('/api/annonces', (req, res) => {
    let postedAnnonce = req.body;
    let maxId = Math.max.apply(Math, annonces.map((cust) => cust.id));
    postedAnnonce.id = ++maxId;
    annonces.push(postedAnnonce);
    res.json(postedAnnonce);
    recordFile(annonces);
});


// Pagination sur les annonces
app.get('/api/annonces/page/:skip/:top', (req, res) => {
    const topVal = req.params.top,
        skipVal = req.params.skip,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > annonces.length) {
        top = skip + (annonces.length - skip);
    }

    console.log(`Skip: ${skip} Top: ${top}`);

    var pagedAnnonces = annonces.slice(skip, top);
    res.setHeader('X-InlineCount', annonces.length);
    res.json(pagedAnnonces);
});

// Envoie le nombre d'éléments
app.get('/api/annoncescount', (req, res) => {
    res.json(annonces.length);
});


app.post('/api/auth/login', (req, res) => {
    var userLogin = req.body;
    res.json(true);
});

app.post('/api/auth/logout', (req, res) => {
    res.json(true);
});

function recordFile(objet) {
    const json = JSON.stringify(objet);
    fs.writeFile('data/annonces.json', json, 'utf8', function () { });
}

app.listen(3000);

console.log('Express listening on port 3000.');

//Open browser
var opn = require('opn');

opn('http://localhost:3000').then(() => {
    console.log('Browser closed.');
});