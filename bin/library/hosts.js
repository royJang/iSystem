var os = require("os");
var platform = os.platform();
var fs = require("fs-extra");

var HostsMaps = {
    "darwin" : "/etc/hosts"
};

function get ( callback ){
    fs.readFile( HostsMaps[ platform ], 'utf-8', function (err, data) {
        if( err ){
            return callback( err );
        }
        return callback( null, data.toString() );
    });
}

module.exports = {
    get : get
};