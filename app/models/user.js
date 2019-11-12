var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user: String,   // nombre usuario
    quota: Number,  // limite de consultas    
    seconds: Number // ventana de tiempo    
});

module.exports = mongoose.model('User', UserSchema);