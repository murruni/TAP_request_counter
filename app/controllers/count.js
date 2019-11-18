const Count = require('../models/count');
const myMiddlewares = require('../utils/middleware');
const ErrorHandler = require('../utils/error');

exports.count = (req, res, next) => {
    res.status(200).send();
};