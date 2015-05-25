'use strict';

var app = angular.module('angularBrbChat');

app.service('chatRoomService', function($http, $rootScope, socketService){
   return {
       registerUserInRoom: function(user) {

           if (user) {
               $http.post('api/v1/user', {
                   userId: user.id,
                   userSocketId: user.socketId
               }).success(function(data) {
                   user.socket.emit('knock-knock');
                   socketService.createPrivateRoom(user.socket.id);
               }).error(function(err){
                    console.error(err);
               });
           }
       }
   }
});