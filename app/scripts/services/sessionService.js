'use strict';

var app = angular.module('angularBrbChat');

app.service('sessionService', function($rootScope, $cookieStore){
    return {
        getSession: function() {
            if ($cookieStore.get('App.session')) {
                return $cookieStore.get('App.session');
            } else {
                return {};
            }
        },
        setSession: function(value) {
            return $cookieStore.put('App.session', value);
        }
    };
});
