'use strict'

var app = angular.module('angularBrbChat');

app.service('socketService', function($rootScope) {
   return {
       enterChatRoom: function(user, callback) {
          var socket = io.connect('http://localhost:7777/' + user.chatRoom)
              .on('connect', function(){
                  user.socket = socket;
                  user.socketId = socket.id;
                  callback && callback(user);
              })
              .on('publicMessage', function(msg) {
                  $rootScope.App.messages.push(msg);
                  $rootScope.$apply();
              })
              .on('knock-knock', function (user){
                  var msg = user.username + ' entered the room...';
                  $rootScope.App.messages.push(new MessageModel(user, msg));
                  $rootScope.$apply();
              })
              .on('updatedUsersList', function(users){
                 $rootScope.App.users = [];
                 var newPrivateRooms = {};
                 var rooms = $rootScope.App.privateRooms

                 for (var socketId in users) {
                    if (users.hasOwnProperty(socketId)){

                        var u = new UserModel(users[socketId]);

                        $rootScope.App.users.push(u);

                        if (!rooms[u.id]) {
                            newPrivateRooms[u.id] = new PrivateRoomModel(u);
                        } else {
                            newPrivateRooms[u.id] = rooms[u.id];
                        }
                    }
                 }

                 for (var room in rooms) {
                     if (rooms.hasOwnProperty(room)) {
                         delete rooms[room];
                     }
                 }
                  for (var newRoom in newPrivateRooms) {
                      if (newPrivateRooms.hasOwnProperty(newRoom)) {
                          rooms[newPrivateRooms[newRoom].user.id] = newPrivateRooms[newRoom];
                      }
                  }
                 $rootScope.$apply();
              });
       },
       createPrivateRoom: function(socketId){
           io.connect('http://localhost:7777/' + socketId)
               .on('newMessage', function(msg){
                   $rootScope.App.privateRooms[msg.author.id].messages.push(msg);
                   $rootScope.App.privateRooms[msg.author.id].unreadMessages.push(msg);
                   $rootScope.$apply();
               })
       },
       sendPublicMessage: function(user, message){
           user.socket.emit('publicMessage', message);
       },
       sendPrivateMessage: function(user, message){
           if (user.socket){
               user.socket.emit('newMessage', message);
           }
           else {
               var socket = io.connect('http://localhost:7777/' + user.socketId)
                   .on('connect', function(){
                       user.socket = socket;
                       socket.emit('newMessage', message);
                   });
           }
       }
   }
});