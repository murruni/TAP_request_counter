var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user: String,   // nombre usuario
    quota: { type: Number, default: 10000 }, // limite de consultas
    seconds: { type: Number, default: 604800 } // ventana de tiempo 60*60*24*7
});

module.exports = mongoose.model('User', UserSchema);