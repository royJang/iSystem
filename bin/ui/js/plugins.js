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

editor.on("change", function (e){

});	

//
socket.on("code-run-result", function ( data ){
	codeReusultEditor.setValue( data ? data : "undefined" );
});

//
$(".code-run").on("click", function (){
    var val = editor.getValue();
    socket.emit("code-run", val);
});
