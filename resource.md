# Hosts 资源 及 脚本

> 来源：https://github.com/racaljk/hosts

```
var request = require("request");

request("https://raw.githubusercontent.com/racaljk/hosts/master/hosts", function ( e, res, body ){
  	callback( body );
});	
```

> 来源：https://github.com/highsea/Hosts

```
var cheerio = require("cheerio");
var request = require("request");
var os = require("os");

request("https://github.com/highsea/Hosts/blob/master/hosts", function (err, res, body){
	var $ = cheerio.load(body);
    var r = "";	
    $(".js-file-line-container").find("tr").each(function (i, el){
    	r += $(el).find(".blob-code").text() + os.EOL;
    })	
    callback(r);
})
```