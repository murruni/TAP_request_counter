var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    count: Number, 
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Count', CountSchema);