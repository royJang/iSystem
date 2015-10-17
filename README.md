## iSystem v0.4.4

> 可视化配置 和 动态更新 hosts, 支持 windows , linux 及 osx

### 安装

> `npm install isystem -g`

### 使用
> ` isystem `   

出现 isystem listen at 3005 则说明启动成功

### 插件
> iSystem 允许自定义 `Javascript` 脚本 来快速更新Hosts,     
> 脚本环境为`用户当前 Node.js` 版本      

>  `1.` 输入 脚本名称 (  比如 : `cross-wall-google`  )    
> ` 2.` 输入脚本内容    

```
var request = require("request");        

//开源项目 https://github.com/racaljk/hosts       
//当然，如果您有一些优质的Hosts来源，也可以自己编写脚本来获取Hosts,并使用iSystem一键更新它!         

request("https://raw.githubusercontent.com/racaljk/hosts/master/hosts",         
	function ( e, res, body ){         
		// callback 函数为iSystem 内置函数, 会将内容编译至运行结果中，从而加入Hosts        
	  	callback( body );           
	});	        
```

> `3.` 点击  `运行` 按钮， 脚本的运行结果会显示在下方,     
> `4.` 返回结果正确后，请继续点击 `添加插件` 按钮，     
> `5.`之后如有Hosts的更新，只需点击`更新` 按钮,就会自动更新最新的 Hosts          

### iSystem插件支持哪些 Node.js 库 ？

```
"cheerio"    :   "^0.19.0"
"fs-extra"   :   "^0.24.0"
"request"    :   "^2.65.0"
"underscore" :   "^1.8.3"
```

使用 如： `var _ = require("underscore");`  来引用underscore

 
### 帮助  
> 1. isystem需要系统权限
> 2. 使用 `isystem -h` 来获取帮助           
> 3. 查看当前版本 ` isystem -V `        
> 4. 使用2000端口启动 isystem ` (sudo) isystem -p 2000 `         
> 5. 清除所有config文件 ` isystem -c `      

### 已经通过测试的平台

> windows 7 	    x64    
osx 	Yosemite 	x64    
linux 	ubuntu 		x64              

### change log

> https://github.com/royJang/iSystem/blob/master/changelog.md

### License 

The MIT License (MIT) copyright (c) <2015> iSystem