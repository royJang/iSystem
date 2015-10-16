var fs = require("fs-extra");
var path = require("path");
var shell = require("shelljs/global");
var config = require("./config");

var hostsPath = config["system_hosts"];
var hostsCommand = config["command"];

var configHostsPath = config["backup_hosts"],
    DefaultsName = "Default";

function getOriginHosts ( callback ){
    var p = path.normalize( configHostsPath + DefaultsName + ".json");
    //没有hosts备份文件，就从系统的hosts拉取
    fs.exists( p, function ( status ){
        fs.readFile( status ? p : hostsPath, 'utf-8', function (err, data) {
            if( err ) return callback( err );
            if( status ) return callback( null, data, true);
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

    getOriginHosts( function ( err, data, origin ){

        if( err ) return console.log( err );

        var fl = [];

        fs.readdir(configHostsPath, function (err, arr){

            if( err ) return callback( err );

            arr.forEach(function ( el ){

                var $fs = fs.readJsonSync( configHostsPath + el);
                $fs = JSON.parse(JSON.stringify($fs));

                var $n = el.replace(/\.json/, "");

                //default�ļ����������
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
                content : !origin ? data.toString() : JSON.parse(data.toString()).content
            };

            maps.others = fl;

            return callback( null, maps );
        });
    });
}

function set ( data, callback ){
    //写入hosts
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