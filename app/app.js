// express
var compression = require('compression');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// middlewares compress all responses & parse application/json
app.use(compression());
app.use(bodyParser.json());

// middleware log to console all request
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.path}`);
    next();
});

// middleware routes
app.use('/', require('./routes/routes'));

// middleware for others routes and verbs
app.all('/*', function (req, res, next) {
    res.status(501).send('No implementado');
    return (next);
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err);
    return res.status(err.code || 500 ).send({ error: err.message });
});

module.exports = app;