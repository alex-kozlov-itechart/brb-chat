'use strict';

var app = angular.module('angularBrbChat', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap']);

app.config(function($routeProvider){
    $routeProvider.when('/chatRoom', {
        templateUrl: 'views/chatRoom.html'
    }).when('/login', {
        templateUrl: 'views/login.html'
    }).otherwise({
        redirectTo: '/chatRoom'
    });
});