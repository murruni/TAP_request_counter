const GATEWAY_PORT = process.env.GATEWAY_PORT || 3000;
const GATEWAY_HOST = process.env.GATEWAY_HOST || 'localhost';
const GATEWAY_URL = 'http://' + GATEWAY_HOST + ':' + GATEWAY_PORT;
const TOKEN_PATH = '/validate'
const request = require('request');

const Count = require('../models/count');
const User = require('../models/user');
const ErrorHandler = require('../utils/error');
const castErr = function (err) {
    if (err.name == 'CastError' && err.kind == 'ObjectId')
        return new ErrorHandler(503, 'Servicio de base de datos no disponible');
    return err;
};

exports.count = (req, res, next) => {
    const cantReq = req.params.cant;

    var options = {
        url: GATEWAY_URL + TOKEN_PATH
        , headers: { 'Authorization': (req.headers.authorization || '') }
    };

    function callback(error, response, body) {
        if (error) return next(new ErrorHandler(500, 'Error de conexión al validador de usuarios'));
        if (response.statusCode == 200) {
            var u = new User();
            var now = Date.now();
            u.user = JSON.parse(body).sub;
            var limTime = Date.now();
            
            // MongoDB
            User.findOne({ 'user': u.user }, function (err, data) {
                if (err) return next(castErr(err));
                if (!data) { u.save({ new: true }, function (err) { if (err) return next(castErr(err)); }); }
            }).then(function (userFound) {
                // user existe o lo cree
                limTime -= userFound.seconds;
                Count.aggregate([{
                    $match: { $and: [{ user: userFound.user }, { timestamp: { $gt: limTime } }] },
                }, {
                    $group: { _id: "$user", total: { $sum: "$count" } }
                }]).exec(function (err, data) {
                    if (err) return next(castErr(err));
                    var acum = data ? (data[0]).total : 0;

                    if (userFound.quota >= (acum + cantReq)) {
                        // puede, agrego registro de solicitud
                        var c = new Count();
                        c.user = userFound.user;
                        c.count = cantReq;
                        c.timestamp = now;
                        c.save({ new: true }, function (err) {
                            if (err) return next(castErr(err));
                            return res.status(200).send({ status: `Registros sumados: ${c.count}` });
                        });
                    } else { // no puede
                        return res.status(401).send({ error: `Cuota de request del usuario: ${userFound.user} alcanzada, cuota: ${userFound.quota}, acumulado: ${acum}, solicitado: ${cantReq}` });
                    }
                })
            });
        } else {
            if (response.statusCode == 401) return next(new ErrorHandler(401, (JSON.parse(body).error || '')));
            if (response.statusCode == 503) return next(new ErrorHandler(500, 'Error de conexión al validador de usuarios'));
            return next(new ErrorHandler(500, 'Error no especificado-'));
        }
    }
    request(options, callback);
};