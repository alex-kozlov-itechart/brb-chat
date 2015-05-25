'use strict';

var app = angular.module('angularBrbChat');

app.service('authService', function($rootScope, $http, $location, sessionService){
    return {
        endpoint: '/api/v1',
        login: function(user, callback){
            $http.post(this.endpoint + '/login', user)
                .success(function(data) {
                    var session = {
                        user: new UserModel(data.user),
                        authorized: true
                    };
                    sessionService.setSession(session);
                    $rootScope.App.session = session;
                    callback && callback(data.redirectUrl);
                }).error(function(err){
                    //TO DO:
                });
        },
        logout: function(){
            sessionService.setSession(null);
        }
    };
});