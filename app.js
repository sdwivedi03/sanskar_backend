const express = require('express');

app = express();

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({extended:true}));

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
        'GET,POST,PUT'
    );
    next();
});


app.use((req, res, next) => {
    res.set("Content-Type", "application/json");
    next();
});

app.use('/v1',require('./routes'));

module.exports = app;
