var socket = io.connect("http://127.0.0.1:3005");
var defaultsHostsTpl = $("#hosts-temp").html();
var othersHostsTpl = $("#hosts-group-temp").html();
var hostsStage = $(".hosts-stage");

//更新成功之后，重新拉取一次最新的hosts/path,这样会触发node端的emit:get-hosts,
//前端会同步更新最新的hosts/path
socket.on("change-ok", function (data){
    socket.emit("get-hosts");
});

socket.on("get-hosts", function ( data ){

    //默认的hosts
    var defaults = data.defaults;
    $(".default-hosts-group").html(_.template(defaultsHostsTpl)({
        name : defaults.name,
        content : defaults.content.split("\n")
    }));

    //分组的hosts
    var others = data.others;
    $(".hosts-groups").html(_.template(othersHostsTpl)({
        others : others
    }));
});

//添加新的hosts分组
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
    //名称有做修改
    if( newName !== oldName ){
        socket.emit("change-hosts", {
            newName : newName,
            oldName : oldName
        })
    }

    newName = null;
    oldName = null;
});

