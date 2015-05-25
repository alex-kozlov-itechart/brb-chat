var express = require('express');
var app = express();

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));

var router = require('./routes/brb-chat-router.js');
var server = router.mount(config, app);