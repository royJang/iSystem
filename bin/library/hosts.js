var os = require("os");
var platform = os.platform();
var fs = require("fs-extra");

var HostsMaps = {
    "darwin" : "/etc/hosts",
    "win32" : "c:/Windows/System32/drivers/etc/hosts"
};

function get ( callback ){
    //读取hosts文件
    fs.readFile( HostsMaps[ platform ], 'utf-8', function (err, data) {
        if( err ){
            return callback( err );
        }

        var fl = [];
        //读取config/hosts下的各组文件
        fs.readdir("config/hosts", function (err, arr){
            if( err ){
                return callback( err );
            }
            //读取各组文件
            arr.forEach(function ( el ){
                var $fs = fs.readJsonSync("config/hosts/" + el);
                $fs = JSON.parse(JSON.stringify($fs));
                //组名就是文件名(当然要删除.json这5个字符),
                //内容为json里的内容
                fl.push({
                    name : el.replace(/\.json/, ""),
                    content : $fs.content
                });
            });

            var maps = {};

            maps.defaults = {
                name : "Default Hosts",
                content : data.toString()
            };

            maps.others = fl;

            return callback( null, maps );
        });
    });
}

module.exports = {
    get : get
};