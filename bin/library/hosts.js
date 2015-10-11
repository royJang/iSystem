var os = require("os");
var platform = os.platform();
var fs = require("fs-extra");
var path = require("path");
var shell = require("shelljs/global");

var HostsMaps = {
    "darwin" : "/etc/hosts",
    "win32" : "c:/Windows/System32/drivers/etc/hosts"
};

var HostsExec = {
    "darwin" : "source /etc/hosts",
    "win32" : "ipconfig/flushdns"
};

var hostsPath = HostsMaps[ platform ];
var hostsCommand = HostsExec[ platform ];

var configHostsPath = "config/hosts/",
    DefaultsName = "Default";

function getOriginHosts ( callback ){
    var p = path.normalize( configHostsPath + DefaultsName + ".json");
    //config存在default的时候直接拉去default.json ，否则从 系统hosts文件中拉取
    fs.exists( p, function ( status ){
        fs.readFile( status ? p : hostsPath, 'utf-8', function (err, data) {
            if( err ) return callback( err );
            if( status ) return callback( null, data );
            fs.outputJson( p, {
                content : data.toString()
            } ,function ( err ){
                if( err ) return console.log( err );
                return callback( null, data );
            });
        });
    });
}

function get ( callback ){

    getOriginHosts( function ( err, data ){

        if( err ) return console.log( err );

        var fl = [];

        fs.readdir(configHostsPath, function (err, arr){

            if( err ) return callback( err );

            arr.forEach(function ( el ){

                var $fs = fs.readJsonSync( configHostsPath + el);
                $fs = JSON.parse(JSON.stringify($fs));

                var $n = el.replace(/\.json/, "");

                //default文件不加入分组
                if( $n !== DefaultsName ){
                    fl.push({
                        name : $n,
                        content : $fs.content,
                        ban : $fs.ban
                    });
                }
            });

            var maps = {};

            maps.defaults = {
                name : DefaultsName,
                content : JSON.parse(data.toString()).content
            };

            maps.others = fl;

            return callback( null, maps );
        });
    });
}

function set ( data, callback ){
    //插入系统hosts文件中
    fs.writeFile( hostsPath, data, 'utf-8', function ( err ){
        if( err ) return callback( err );
        exec( hostsCommand, function (){
            return callback( null );
        });
    });
}

module.exports = {
    get : get,
    set : set
};