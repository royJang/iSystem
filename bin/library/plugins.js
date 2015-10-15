var vm = require("vm");
var sandbox = {
    require : require,
    callback : callback
};
vm.createContext(sandbox);

var $socket = null;

function getVmResult ( sockets, data ){
	try{
        vm.runInContext(String(data), sandbox);
        $socket = sockets;
    }catch(e){}
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
