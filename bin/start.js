#!/usr/bin/env node

var version = "0.4.11";
var fs = require("fs-extra");
var program = require('commander');
var isystem = require("./index");
var config = require("./library/config");
var os = require("os");
var serverListen = 3005;

global.isystem_version = version;
global.save_path = null;

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
    })
    .option('-m', '将旧的Hosts配置文件迁移到新的目录', function ( path ){
        if( os.platform != "darwin" ) return console.log("目前只支持Mac平台的迁移!");
        fs.copy('/usr/isystem/', '/applications/isystem', function (err){
            if(err) return console.log(err);
            return console.log('迁移成功');
        })
    });

program.parse( process.argv );

isystem.cli( serverListen );

