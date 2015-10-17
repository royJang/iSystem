var socket = io.connect(location.host);

var editor = CodeMirror.fromTextArea(document.querySelector(".pluginCode"), {
    value : "function (){}",
    lineNumbers: true,
    mode : "javascript",
    lineWrapping: true,
    styleActiveLine: true
});

editor.setOption("theme", "mbo");

var codeReusultEditor = CodeMirror.fromTextArea(document.querySelector(".pluginResultCode"),{
    lineNumbers: true,
    mode : "javascript",
    lineWrapping: true,
    styleActiveLine: true,
    readOnly : true
});

codeReusultEditor.setOption("theme", "mbo");

//
var pluginName = $(".pluginName");

var greatScriptWrap = $(".great-script");
var greatScriptTpl = $("#great-script-tpl").html();
var getScriptBtn = $(".script-title");

getScriptBtn.on("click", function (e){
    e.stopPropagation();
    socket.emit("get-others-script");
    greatScriptWrap.show();
});

socket.on("other-scripts", function (data){
    greatScriptWrap.html(_.template(greatScriptTpl)({
        key : _.keys(data),
        value : _.values(data)
    }));
});

greatScriptWrap.on("click", "li", function (e){
    e.stopPropagation();
    var target = $(e.currentTarget);
    var title = target.find("span.script-child-title").text();
    var content = target.find("span.script-content").text();
    set$name(title);
    editor.setValue(content);
});

$("body").on("click", function (){
    greatScriptWrap.hide();
});

//修改
pluginName.val(get$name());

//set title in location.hash
pluginName.on("keyup", function (){
    location.hash = "#" + pluginName.val();
});

//
editor.setValue( getStore() );

editor.on("change", function (e){
    setStore();
});

//当运行结果返回
socket.on("code-run-result", function ( data ){
	codeReusultEditor.setValue( data ? data : "undefined" );
});

var $complileText = "Compile...";

//运行代码
$(".code-run").on("click", function (){
    codeReusultEditor.setValue($complileText);
    socket.emit("code-run", getStore());
    setStore();
});

//添加插件
$(".add-plugins").on("click", function (){

    var val = codeReusultEditor.getValue();

    if( val.indexOf($complileText) > -1 || val.length < 1 ) return;

    socket.emit("change-hosts", {
        newGroup : true,
        content : val,
        name : get$name()
    });

    location.href = "/";
});

function setStore (){
    var v = editor.getValue(),
        s = get$name();
    v && v.length > 0 
    && s && s.length > 0 
    && localStorage.setItem( s, v );
}

function getStore (){
    return !!get$name() ? ( localStorage.getItem(get$name()) || "") : "";
}

function set$name ( name ){
    location.hash = "#" + name;
    pluginName.val(get$name());
}

function get$name(){
    return location.hash.slice(1);
}