#!/usr/bin/env node

var version = "0.4.8";
var isystem = require("./index");
var config = require("./library/config");
var fs = require("fs-extra");
var argv = require('optimist').argv;
var serverListen = 3005;

if( argv.h || argv.help ){
    return console.log(
        ' Usage: isystem [options]\n',
        'An application for pizzas ordering\n',
        'Options:\n',
        '   -v : output the version number\n',
        '   -h : output usage information\n',
        '   -p : set the network port\n',
        '   -c : clear group files\n'
    );
}

if( argv.v || argv.V ){
    return console.log( version );
}

if( argv.p ){
    serverListen = argv.p || serverListen;
}

if( argv.c ){
    fs.remove(config["backup_hosts"], function (err){
        if( err ) return console.log(err);
        console.log("clear success!");
    });
}

isystem.cli( serverListen );

