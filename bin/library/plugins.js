var vm = require("vm");
var domain = require("domain");
var EventEmitter = require('events').EventEmitter;

var sandbox = {
    require : require,
    callback : callback,
    console : console
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
        vm.runInContext(String(data), sandbox);
    });
}

function callback(){
    var p = [];
    for(var i in arguments){
        p.push( typeof arguments[i] == "object" ? JSON.stringify(arguments[i]) : String(arguments[i]) );
    }
    $socket.emit("code-run-result", p.join(","));
}

module.exports = {
	get : getVmResult
};
