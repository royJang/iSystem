socket.on("change-ok", function (){
    socket.emit("get-hosts");
    showConfirm("success!");
});

socket.on("system-error", function (data){
    if( data.errno == -13 ){
        showConfirm("需要系统权限!", true);
    } else if( data.vmCodeError ){
        codeReusultEditor.setValue( data.vmCodeError );
    }
});

socket.on("version", function (data){
    $(".logo").html("iSystem v" + data);
});

socket.on("pull-resource-error", function (){
    greatScriptWrap.html("<div><p>访问github超时</p><p>请刷新页面重试！</p></div>");
});

socket.on("new-version", function (data){
    $(".update-info").show().html(_.template($("#update-info-tpl").html())(data));
});

$(".update-info").on("click", ".iKnow", function (){
    $(".update-info").hide();
});

function showConfirm ( data, warning ){
    var _prompt = $(".system-prompt");
    _prompt.removeClass("warning");
    if( warning ){
        _prompt.addClass("warning");
    }
    _prompt.html(data).show();
    setTimeout(function (){
        _prompt.hide();
    }, 2000)
}

