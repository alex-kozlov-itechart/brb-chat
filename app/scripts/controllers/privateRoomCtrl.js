'use strict';

var app = angular.module('angularBrbChat');

app.controller('privateRoomCtrl', function($rootScope, $scope, $modalInstance, room, socketService) {

    $scope.room = room;

    $scope.newMessage = '';

    $scope.send = function(message){

        var msg = new MessageModel($rootScope.App.session.user, message);

        socketService.sendPrivateMessage($scope.room.user, msg);

        $scope.room.messages.push(msg);

        $scope.newMessage = '';
    };

    $scope.close = function(){
        $modalInstance.dismiss('close');
        room.unreadMessages = [];
    };

    room.unreadMessages = [];
});