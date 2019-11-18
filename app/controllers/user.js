const User = require('../models/user');
const myMiddlewares = require('../utils/middleware');
const ErrorHandler = require('../utils/error');

exports.getAll = (req, res, next) => {
    User.find({}, function (err, users) {
        if (err) {
            if (err.name == 'CastError' && err.kind == 'ObjectId') {
                res.status(503).send('Service Unavailable');
            }
            return next(err);
        }
        res.send(users);
    });
};

exports.get = (req, res, next) => {
    let id = getUrlIdField(req);
    User.findById(id, function (err, usr) {
        if (err) {
            if (err.name == 'CastError' && err.kind == 'ObjectId') {
                res.status(404).send('Not user found');
            }
            return next(err);
        }
        res.send(usr);
    });
};

exports.count = (req, res, next) => {
    /*
    User.find({}, function (err, users) {
        if (err) {
            if (err.name == 'CastError' && err.kind == 'ObjectId') {
                res.status(503).send('Service Unavailable');
            }
            return next(err);
        }
        res.send(users);
    });
    */
};

exports.set = (req, res, next) => {

};


// -------------------------------------------------------------------
/** @returns User */
function getBodyUser(req) {
    var user = new User();
    /** @todo desconfiar de los datos */
    if (req.body.user) user.user = req.body.user;
    if (req.body.pass) user.pass = req.body.pass;
    if (req.body.email) user.email = req.body.email;
    if (req.body.houses) user.houses = req.body.houses;
    return user;
}

/** @returns id field */
function getUrlIdField(req) {
    /** @todo desconfiar de los datos */
    return req.params.id;
}