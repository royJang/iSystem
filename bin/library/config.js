var os = require("os");
var platform = os.platform();

var s = {
    "darwin" : {
        "backup_hosts" : "/usr/isystem/",
        "system_hosts" : "/etc/hosts",
        "command" : "dscacheutil -flushcache;discoveryutil udnsflushcache;killall -HUP mDNSResponder; echo update hosts success!"
    },
    "win32" : {
        "backup_hosts" : "",
        "system_hosts" : "C:/Users/Administrator/AppData/Roaming/isystem",
        "command" : "ipconfig/flushdns"
    },
    "linux" : {
        "backup_hosts" : "/usr/isystem/",
        "system_hosts" : "/etc/hosts",
        "command" : "#/etc/init.d/nscd retart; systemctl restart NetworkManager"
    }
};

module.exports = s[ platform ];