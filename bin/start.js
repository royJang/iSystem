#!/usr/bin/env node

var fs = require("fs-extra");
var program = require('commander');
var isystem = require("./index");
<<<<<<< HEAD
var version = "0.4.0";
=======
var version = "0.3.3";
>>>>>>> e2fc523e7fd464380fefc80c3012dc1df71c33d0
var serverListen = 3005;

program
    .version( version )
    .option('-p, --port <port>', 'set port', function ( port ){
        serverListen = port;
    })
    .option('-c --clear', 'clear config files', function (){
        fs.remove("config/", function (err){
            if( err ) return console.log(err);
            console.log("clear success!");
        });
    });

program.parse( process.argv );

isystem.cli( serverListen );

