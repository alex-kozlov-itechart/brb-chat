var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicMessageSchema = new Schema({
    id: String,
    message: String,
    postedDate: { type: Date, default: Date.now },
    author: {
        id: String,
        username: String
    }
});

var PublicMessage = mongoose.model('PublicMessage', PublicMessageSchema);

module.exports = PublicMessage;