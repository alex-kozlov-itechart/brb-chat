var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    username: String,
    password: String,
    chatRoom: String,
    socketId: String,
    registrationDate: { type: Date, default: Date.now },
    lastLoginDate: { type: Date, default: Date.now }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;