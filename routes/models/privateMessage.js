var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrivateMessageSchema = new Schema({
    id: String,
    message: String,
    createDate: { type: Date, default: Date.now },
    sender: {
        id: String,
        username: String
    },
    recepient: {
        id: String,
        username: String
    }
});

var PrivateMessage = mongoose.model('PrivateMessage', PrivateMessageSchema);

module.exports = PrivateMessage;