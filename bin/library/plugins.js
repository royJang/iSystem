var vm = require("vm");
var domain = require("domain");
var EventEmitter = require('events').EventEmitter;
var request = require("request");
var cheerio = require("cheerio");
var http = require("http");

var sandbox = {
    require : require,
    callback : callback,
    console : console,
    setTimeout : setTimeout
};
vm.createContext(sandbox);

var $socket = null;

function getVmResult ( sockets, data ){

    $socket = sockets;

    var d = domain.create();
    var emitter = new EventEmitter();

    d.on("error", function ( err ){
        emitter.emit("error", new Error(err));
    });

    d.add(emitter);

    emitter.on("error", function (err){
        sockets.emit("system-error", {
            vmCodeError : err.message
        });
    });

    d.run(function (){
        try {
            vm.runInContext(String(data), sandbox);
        } catch( e ){
            emitter.emit("error", new Error(e));
        }
    });
}

function callback(){
    var p = [];
    for(var i in arguments){
        p.push( typeof arguments[i] == "object" ? JSON.stringify(arguments[i]) : String(arguments[i]) );
    }
    $socket.emit("code-run-result", p.join(","));
}

function getOtherShareScript ( sockets ){

    var d = domain.create();
    var emitter = new EventEmitter();

    d.on("error", function ( err ){
        emitter.emit("error", new Error(err));
    });

    emitter.on("error", function (err){
        sockets.emit("pull-resource-error", {});
    });

    d.run(function (){

        var _version = global.isystem_version.split(".");
        var master_version = _version[0],
            second_version = _version[1],
            fork_version = _version[2];

        var _url = (master_version >= 0  && second_version >= 4 && fork_version > 9) 
                ? "https://raw.githubusercontent.com/royJang/iSystem/master/resource_new.json"
                : "https://raw.githubusercontent.com/royJang/iSystem/master/resource.json";

         request(_url, function (err, res, body){
            try {
                sockets.emit("other-scripts", body.toString());
            } catch (e){
                sockets.emit("error", new Error(e));
            }
         });
    })
}

module.exports = {
	get : getVmResult,
    getOtherScript : getOtherShareScript
};
