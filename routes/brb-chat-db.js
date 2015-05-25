var mongoose = require('mongoose');

function brbChatDb(config) {
    'use strict';

    console.log('Db initialization.');

    var connectedTo = "";

    try{
        if (config.db.url !== '') {
            connectedTo = 'Connecting to MongoDb ' + config.db.url;
            console.log(connectedTo);
            mongoose.connect(config.db.url);
        } else{
            connectedTo = 'Connecting to MongoDb ' + config.db.server + ':' + config.db.port + ' ' + config.db.dbName;
            console.log(connectedTo);
            mongoose.connect(config.db.server, config.db.dbName, config.db.port);
        }
    }
    catch(ex) {
        throw new Error('Unable to connect to MongoDb database');
    }

    mongoose.connection.on('connected', function(){
        console.log('Mongoose: connected to ', connectedTo);
    });

    mongoose.connection.on('error', function(){
        console.log('Mongoose: error connecting to ', connectedTo);
    });

    mongoose.connection.on('disconnected', function(){
       console.log('Mongoose: disconnected from ', connectedTo);
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Mongoose: disconnecting due to app termination');
            process.exit(0);
        });
    })
}

module.exports = brbChatDb;