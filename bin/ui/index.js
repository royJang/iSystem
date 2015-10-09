var socket = io.connect("http://127.0.0.1:3005");

var hostsTempple = document.getElementById("hosts-temp");

socket.on("get-hosts", function ( data ){
    document.querySelector(".hosts-list").innerHTML = _.template(hostsTempple.innerHTML)({
        list : data.data.split("\n")
    });
});

$(".add-more-hosts").on("click", function (){
    var n = $('<div class="hosts-group group"><ul class="hosts-list" contenteditable="true"></ul></div>');
    n.insertBefore($(this));
});