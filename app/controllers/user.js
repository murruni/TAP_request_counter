const GATEWAY_PORT = process.env.GATEWAY_PORT || 3000;
const GATEWAY_HOST = process.env.GATEWAY_HOST || 'localhost';
const GATEWAY_URL = 'http://' + GATEWAY_HOST + ':' + GATEWAY_PORT;
const request = require('request');

const User = require('../models/user');
const ErrorHandler = require('../utils/error');
const castErr = function (err) {
    if (err.name == 'CastError' && err.kind == 'ObjectId')
        return new ErrorHandler(503, 'Servicio de base de datos no disponible');
    return err;
};

exports.getAll = (req, res, next) => {
    User.find({}, '-_id user quota seconds', function (err, data) {
        if (err) return next(castErr(err));
        if (data) res.status(200).send(data);
        res.status(200).send({ error: 'No hay datos' });
    });
};

exports.get = (req, res, next) => {
    User.findOne({ user: req.params.user }, '-_id user quota seconds', function (err, data) {
        if (err) return next(castErr(err));
        if (data) return res.status(200).send(data);
        res.status(200).send({ error: 'No hay datos' });
    });
};