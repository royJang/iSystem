var socket = io.connect(location.host);

socket.emit("get-help");

socket.on("output-help", function (data){
    $(".markdown").html(data);
});

socket.on("get-help-error", function (){
	$(".markdown").html("<font color='red' size='4'>获取<帮助>失败,请刷新重试</font>");
});