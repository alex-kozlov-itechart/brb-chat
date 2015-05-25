'use strict';

var app = angular.module('angularBrbChat');

app.controller('chatRoomCtrl', function($scope, $rootScope, $modal, $http, $location,
                                        sessionService, chatRoomService, socketService){

    var user = $rootScope.App.session && $rootScope.App.session.user;

    if (user) {
        $rootScope.App.users.push(user);
        socketService.enterChatRoom(user, function(user) {
            chatRoomService.registerUserInRoom(user);
        });
    } else {
        $location.path('/login');
    }

    $scope.user = user;

    $scope.privateRooms = $rootScope.App.privateRooms;

    $scope.messages = $rootScope.App.messages;

    $scope.newMessage = '';

    $scope.send = function(newMessage) {

        var message = new MessageModel(user, newMessage);

        $rootScope.App.messages.push(message);

        socketService.sendPublicMessage(user, message);

        $scope.newMessage = '';
    };

    $scope.sendPrivateMessage = function(room) {

        var privateRoom = $modal.open({
            templateUrl: 'views/privateRoom.html',
            controller: 'privateRoomCtrl',
            resolve: {
                room: function () {
                    return room;
                }
            }
        });
    };

    $scope.$on('$destroy', function () {
        $rootScope.App.session.user = null;
    });
});