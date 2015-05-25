var http = require('http');
var util = require('util');

module.exports.mount = function(config, app) {
    'use strict';

    var server = http.createServer(app);

    require('./brb-chat-db')(config);
    require('./brb-chat-server')(config, app);
    require('./brb-chat-auth').configure(config, app);
    require('./brb-chat-publicRoom').configure(config, app, server);

    server.listen(config.port, config.address);

    return config;
};