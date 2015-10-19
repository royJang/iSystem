var socket = io.connect(location.host);

socket.emit("get-help");

socket.on("output-help", function (data){
    $(".markdown").html(data);
});