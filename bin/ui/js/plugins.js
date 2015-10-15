var socket = io.connect(location.host);

function getParameter ( e ){
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
        n = location.search.substr(1).match(t);
    return n != null ? decodeURIComponent(n[2]) : null
}

function paramsToJSON (){
    var $u = location.search.slice(1),
        r = {};
    if( !!$u ){
        $u = $u.split("&");
    } else {
        return r;
    }

    $u.forEach(function (el){
        var $n = el.split("=");
        r[$n[0]] = $n[1];
    });
    return r;
}

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

var pluginName = $(".pluginName");

function get$name(){
    return location.hash.slice(1);
}

var $name = get$name();

//修改
if( !!$name ){
    pluginName.val( $name );
}

pluginName.on("keyup", function (){
    location.hash = "#" + pluginName.val();
});

var v = localStorage.getItem(get$name());
!!v && editor.setValue( v );

editor.on("change", function (e){
    var val = editor.getValue();
    !!val && val.length > 0 && !!pluginName.val() && localStorage.setItem( pluginName.val(), val );
});

//当运行结果返回
socket.on("code-run-result", function ( data ){
	codeReusultEditor.setValue( data ? data : "undefined" );
});

var $complileText = "Compile...";

//运行代码
$(".code-run").on("click", function (){
    var val = editor.getValue();
    socket.emit("code-run", val);
    codeReusultEditor.setValue($complileText);
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