'use strict';

var app = angular.module('angularBrbChat');

app.controller('appCtrl', function($scope, $rootScope, socketService, sessionService,
                                   $location){

    var App = {};
    App.session = sessionService.getSession();
    App.messages = [];
    App.users = [];
    App.privateRooms = {};

    $scope.App = $rootScope.App = App;
});