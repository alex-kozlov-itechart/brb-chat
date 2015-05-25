var express = require('express');
var cookieParser = require('cookie-parser')
var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require( 'body-parser' );
var passport = require('passport');
var flash = require('connect-flash');
var expressSession = require('express-session');

module.exports = function (config, app) {
    'use strict';

    console.log('brb-chat-server initialization.');

    var options = {
        dotfiles: 'ignore',
        extensions: [
            'js',
            'png',
            'html', 'jpeg', 'jpg', 'gif',
            'css'
        ],
        index: 'index.html'
    };
    app.use(serveStatic(config.clientAppDir, options));

    app.use(cookieParser());

    app.use(bodyParser.json());

    app.use(expressSession({secret: 'mySecretKey'}));

    app.use(passport.initialize());

    app.use(passport.session());

    app.use(flash());
};

