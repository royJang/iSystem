#! /usr/bin/env node

var program = require('commander');
var isystem = require("./index");
var version = "0.1.12";
var serverListen = 3005;

program
    .version( version )
    .option('-p, --port <port>', 'set port', function (port){
        serverListen = port;
    });

program.parse(process.argv);

isystem.cli( serverListen );

