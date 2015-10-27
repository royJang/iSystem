var os = require("os");
var platform = os.platform();

var s = {
    "darwin" : {
        "backup_hosts" : "/Applications/isystem/",
        "system_hosts" : "/etc/hosts",
        "command" : "dscacheutil -flushcache;discoveryutil udnsflushcache;killall -HUP mDNSResponder" 
    },
    "win32" : {
        "backup_hosts" : "c:/users/isystem/",
        "system_hosts" : "c:/Windows/System32/drivers/etc/hosts",
        "command" : "ipconfig/flushdns"
    },
    "linux" : {
        "backup_hosts" : "/usr/isystem/",
        "system_hosts" : "/etc/hosts",
        "command" : "#/etc/init.d/nscd retart; systemctl restart NetworkManager"
    }
};

module.exports = s[ platform ];