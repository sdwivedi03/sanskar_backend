const express = require('express');
const bodyParser = require('body-parser');

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST'
    );
    next();
});


app.use((req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
});

app.use('/v1',require('./routes'));

module.exports = app;
