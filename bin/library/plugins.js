var vm = require("vm");

function getVmResult ( data ){
	var sandbox = {
		require : require
	};
	vm.createContext(sandbox);
	try{
		var r = vm.runInContext(String(data), sandbox);
		return typeof r == "object" ? JSON.stringify(r) : String(r);
	}catch(e){};
}

module.exports = {
	get : getVmResult
}	
