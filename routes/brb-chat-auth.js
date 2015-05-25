var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var chatRoom = require('./brb-chat-publicRoom');

module.exports = function() {
    'use strict';

    var login = function(username, password, done) {

        console.warn(username + ' is trying to log in.');

        User.find({username: username}, function (error, users) {
            if (error) {
                console.warn('Login failed', error);
                return done(error);
            }

            if (users.length) {
                var user = users[0];
                if (user.password !== password) {
                    console.warn(username + ' is found. ');
                    return done(null, false, {
                        message: 'You entered wrong username or password. Please try again.'
                    });
                }
                user.lastLoginDate = Date.now();
                user.chatRoom = chatRoom.roomId;
                console.log('user found ', user.username);
                return done(null, user);
            } else {
                var newUser = User({
                    username: username,
                    password: password,
                    chatRoom: chatRoom.roomId,
                    lastLoginDate: Date.now(),
                    registrationDate: Date.now()
                });
                console.log('Creating new user.');
                newUser.save(function (error, u) {
                    if (error) {
                        console.warn('Failed creating a user ', newUser);
                        return done(null, false, {
                            message: 'Error occured during registration.'
                        });
                    } else {
                        console.log('New user is created ', u);
                        u.chatRoom = chatRoom.roomId;
                        return done(null, u);
                    }
                });
            }
        });
    };

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.status(200).send({redirectUrl: '/login'});
    };

    var authenticate = function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(200).send({
                    redirectUrl: '/login'
                });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                return res.status(200).send({
                    user: user,
                    redirectUrl: '/chatRoom'
                });
            });
        })(req, res, next);
    };

    var configure = function(config, app) {

        console.log('Auth initialization.');

        passport.use(new LocalStrategy(login));

        passport.serializeUser(function (user, done) {
            done(null, user._id);
        });

        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });

        app.post(config.api + '/login', authenticate);

        app.post(config.api, isAuthenticated)
    };

    return {
        login: login,
        isAuthenticated: isAuthenticated,
        configure: configure
    }
}();