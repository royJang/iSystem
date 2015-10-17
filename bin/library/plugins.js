var vm = require("vm");
var domain = require("domain");
var EventEmitter = require('events').EventEmitter;
var request = require("request");
var cheerio = require("cheerio");

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

function getOtherScript ( sockets ){
    request("https://github.com/royJang/iSystem/blob/master/resource.json", function (err, res, body){
        try {
            var $ = cheerio.load(body);
            var content = $(".js-file-line-container").text();
            sockets.emit("other-scripts", !!content ? JSON.parse(content) : {
                "Connection Failed" : ""
            });
        } catch (e){
            sockets.emit("error", new Error(e));
        }
    })
}

module.exports = {
	get : getVmResult,
    getOtherScript : getOtherScript
};
