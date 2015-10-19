## iSystem

> 一键翻墙, 支持 windows , linux 及 osx

### 安装

> iSystem 依赖于Node.js ( [安装教程](http://www.runoob.com/nodejs/nodejs-install-setup.html) )

> 安装成功后，在命令行输入  `npm install isystem -g`

### 使用
>　命令行输入　` isystem `   

出现 isystem listen at 3005 则说明启动成功

### 使用官方插件
> iSystem 团队提供了一些插件可以让您一键获取最新的可用hosts                        
> 内容来源于知名开源 hosts 列表                     

> `1.` 点击 `获取他人分享的脚本` 按钮                         
> `2.` 选择任意一项即可    
> `3.` 添加插件     

### 自定义插件
> iSystem 允许自定义 `Javascript` 脚本 来快速更新Hosts,          
> 脚本环境为`用户当前 Node.js` 版本       

> `1.` 输入 脚本名称 (  比如 : `cross-wall-google`  )    
> `2.` 输入脚本内容      
> `3.` 添加插件     

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

### 添加插件

> 1. 点击 `运行` 按钮， 等待稍许, 脚本的运行结果会显示在下方,        
> 2. 确认返回结果正确后，请继续点击 `添加插件` 按钮，        
> 3. 之后如有Hosts的更新，只需点击`更新` 按钮,就会自动更新最新的 Hosts          

### 插件支持哪些 Node.js 库 ？

```
"cheerio"    :   "^0.19.0"
"fs-extra"   :   "^0.24.0"
"request"    :   "^2.65.0"
"underscore" :   "^1.8.3"
```

使用 如： `var _ = require("underscore");`  来引用underscore

 
### 帮助  
> 1. linux 及 osx 用户，使用 `sudo isystem` 提高权限
> 2. windows 用户，使用 `以管理员身份运行` 提高权限
> 2. 使用 `isystem -h` 来获取帮助           
> 3. 使用 `isystem -V` 查看当前版本       
> 4. 使用 `isystem -p 2000` 在2000端口下启动应用           
> 5. 使用 `isystem -c` 清除所有分组文件      

### 已经通过测试的平台

> windows 7 	    x64    
windows 8           x64
widows 10           x64
osx 	Lion 	    x64
osx     Yosemite    x64
linux 	ubuntu 		x64              

### change log

> https://github.com/royJang/iSystem/blob/master/changelog.md

### License 

The MIT License (MIT) copyright (c) <2015> iSystem