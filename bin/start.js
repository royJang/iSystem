#!/usr/bin/env node

var version = "0.4.7";
var fs = require("fs-extra");
var program = require('commander');
var isystem = require("./index");
var config = require("./library/config");
var serverListen = 3005;

program
    .version( version )
    .option('-p, --port <port>', 'set port', function ( port ){
        serverListen = port;
    })
    .option('-c --clear', 'clear config files', function (){
        fs.remove(config["backup_hosts"], function (err){
            if( err ) return console.log(err);
            console.log("clear success!");
        });
    });

program.parse( process.argv );

isystem.cli( serverListen );

