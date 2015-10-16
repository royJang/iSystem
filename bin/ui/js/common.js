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