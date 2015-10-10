var socket = io.connect(location.href);
var defaultsHostsTpl = $("#hosts-temp").html();
var othersHostsTpl = $("#hosts-group-temp").html();
var hostsStage = $(".hosts-stage");

socket.emit("get-hosts");

//当修改完毕,get-hosts会触发前端模版重绘
socket.on("change-ok", function (data){
    socket.emit("get-hosts");
});

//当error
socket.on("system-error", function (data){
    if( data.errno == -13 ){
        showConfirm("权限不足, 需要sudo-.-");
    }
});

socket.on("get-hosts", function ( data ){

    //the default hosts
    var defaults = data.defaults;

    $(".default-hosts-group").html(_.template(defaultsHostsTpl)({
        name : defaults.name,
        content : defaults.content.split("\n")
    }));

    //others hosts group
    var others = data.others;
    $(".hosts-groups").html(_.template(othersHostsTpl)({
        others : others
    }));
});

//add more hosts group
$(".add-more-hosts").on("click", function (){
    socket.emit("change-hosts", {
        newGroup : true
    });
});

var oldName = null;
var newName = null;

hostsStage.on("focus", ".title", function (){
    oldName = $(this).html();
});

hostsStage.on("blur", ".title", function (){

    newName = $(this).html();
    if( newName !== oldName && !!newName ){
        socket.emit("change-hosts", {
            newName : newName,
            oldName : oldName
        })
    }

    newName = null;
    oldName = null;
});

//delete hosts group
hostsStage.on("click", ".delete", function (e){
    var theName = $(e.currentTarget).attr("data-name");
    socket.emit("change-hosts", {
        $delete : true,
        name : theName
    })
});

var ipRe = /((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]))/g;

hostsStage.on("blur", ".hosts-list", function (e){
    var theName = $(e.currentTarget).attr("data-name");
    var theContent = $(this).text()
        .replace(ipRe, "\n$1")
        .replace(/\s{2,}/g, "\n");

    socket.emit("change-hosts", {
        name : theName,
        content : theContent
    })
});

function showConfirm ( data ){
    $(".system-prompt").html(data).show();
    setTimeout(function (){
        $(".system-prompt").hide();
    }, 2000)
}
