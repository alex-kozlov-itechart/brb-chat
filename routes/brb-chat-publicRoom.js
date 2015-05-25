var privateMessage = require('./models/privateMessage');
var publicMessage = require('./models/publicMessage');
var sio = require('socket.io');
var User = require('./models/user');
var uuid = require('node-uuid');


module.exports = function(){
    'use strict';

    var roomId = uuid.v1();
    var users = {};
    var io = null;

    var registerUserInRoom = function (req, res, next) {
        console.log(req.body);

        var reqUser = req.body;

        User.findById(reqUser.userId, function (err, user) {
            if (err) {
                console.warn(err);
            }

            users[reqUser.userSocketId] = user;
            users[reqUser.userSocketId].socketId = reqUser.userSocketId;

            io.of(reqUser.userSocketId)
                .on('connection', function (unknownSocket) {

                    if (unknownSocket.id === reqUser.userSocketId) {
                        users[reqUser.userSocketId].socket = unknownSocket;
                        unknownSocket.on('newMessage',function(msg) {
                            unknownSocket.emit('newMessage', msg);
                        });
                    } else if (users[reqUser.userSocketId] && users[reqUser.userSocketId].socket){

                        unknownSocket.on('newMessage',function(msg) {
                            console.log(msg);
                            console.log(reqUser.userSocketId);
                            users[reqUser.userSocketId].socket.emit('newMessage', msg);
                        });
                    }
                });

            res.status(200).send('[]');
        });
    };

    var configure = function(config, app, server){

        console.log('brb-chat-publicRoom initialization.');

        var brbChatAuth = require('./brb-chat-auth');

        app.post(config.api + '/user', brbChatAuth.isAuthenticated, registerUserInRoom);

        io = sio(server);

        var chat = io.of(roomId)
            .on('connection', function (socket) {
                console.log('connected: ', socket.id);

                socket.on('disconnect', function () {
                    var username = users[socket.id] ? users[socket.id].username : 'user';
                    console.log(username + ' disconnected');
                    delete users[socket.id];
                    socket.broadcast.emit('updatedUsersList', users);
                });

                socket.on('knock-knock', function(){
                    console.log('entering the room.');
                    if (users[socket.id]) {
                        users[socket.id].socketId = socket.id;
                        socket.broadcast.emit('knock-knock', users[socket.id]);
                        socket.broadcast.emit('updatedUsersList', users);
                        socket.emit('updatedUsersList', users);
                    }
                });

                socket.on('publicMessage', function(message) {
                    socket.broadcast.emit('publicMessage', message);
                });
            });
    };

    return {
        roomId: roomId,
        users: users,
        socketServer: io,
        configure: configure
    }
}();
