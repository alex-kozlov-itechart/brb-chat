'use strict';

var app = angular.module('angularBrbChat');

app.controller('loginCtrl', function($scope, authService, $location){
    $scope.user = {
        username: null,
        password: null
    };

    $scope.login = function(user) {
        authService.login(user, function(redirectUrl){
            return $location.path(redirectUrl);
        });
    };
});