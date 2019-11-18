var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountSchema = Schema({
    user: String,
    count: Number, 
    timestamp: Number
});

module.exports = mongoose.model('Count', CountSchema);