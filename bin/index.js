var fs = require("fs-extra");
var http = require("http");
var url = require("url");
var path = require("path");
var socket = require("socket.io");
var _ = require("underscore");

var hosts = require("./library/hosts");

var hosts_path = "config/hosts/";

function cli ( port ){

    var server = http.createServer( handle );
    var io = socket( server );

    server.listen( port );

    console.log("isystem listen on " + port);

    io.on("connection", function ( sockets ){

        sockets.on("change-hosts", function ( data ){
            //创建新分组
            if( data.newGroup == true ){
                fs.writeJson( hosts_normalize("new_hosts_" + new Date().getTime()), {
                    content : "",
                    ban : 0
                }, function (){
                    sockets.emit("change-ok");
                });
            }
            //分组名修改
            else if( data.oldName && data.newName ){

                var olds = hosts_normalize(data.oldName);
                var news = hosts_normalize(data.newName);

                fs.rename( olds, news, function (err){
                    if( err ) return sockets.emit("system-error", err);
                    sockets.emit("change-ok");
                })
            }
            //删除分组
            else if( data.$delete && data.name ){
                fs.remove( hosts_normalize(data.name), function ( err ){
                    if( err ) return sockets.emit("system-error", err);
                    refresh_hosts(function (){
                        sockets.emit("change-ok");
                    });
                })
            }
            //修改分组内容
            else if ( data.name && (typeof data.ban == "number" || data.content )){
                var _path = hosts_normalize((data.name));
                delete data.name;
                fs.readJson( _path, function ( err, json ){
                    //io时间差会导致文件没有被快速删除,导致读出undefined
                    if( !json ) return;
                    _.extend( json, data );
                    fs.writeJson( _path, json, function (){
                        refresh_hosts(function (){
                            sockets.emit("change-ok");
                        });
                    })
                });
            }
        });

        sockets.on("get-hosts", function (){
            hosts.get(function (err, data){
                sockets.emit("get-hosts", data);
            })
        });

        function refresh_hosts ( callback ){
            hosts.get(function ( err, data ){
                var r = "";
                data.others.forEach(function ( el, i ){
                    //被禁用的分组不写入hosts
                    if( el.ban == 0 ){
                        r += (el.content + "\n");
                    }
                });
                // r 就是分组内的所有hosts信息
                data.defaults.content += r;
                hosts.set( data.defaults.content, function (err){
                    if( err ) return sockets.emit("system-error", err);
                    sockets.emit("change-ok");
                    callback();
                });
            });
        }
    });
}

var suffixMaps = {
    "css" : "text/css",
    "js" : "text/javascript",
    "json" : "application/json",
    "html" : "text/html"
};

function hosts_normalize ( name ){
    return path.normalize( hosts_path + name + ".json" );
}

function handle ( request, response ){
    //解析请求url
    var pathname = url.parse(request.url).pathname;

    pathname = pathname == "/" ? "index.html" : pathname;

    //index路径
    var realPath = path.normalize( "../isystem/bin/ui/" + pathname );

    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end();
        } else {
            fs.readFile(realPath, "binary", function(err, file) {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.end(err);
                } else {
                    var r = realPath.split(".");
                    var suffix = suffixMaps[r[r.length - 1]];
                    response.writeHead(200, {"Content-Type" : suffix});
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
}

module.exports = {
    cli : cli
};
