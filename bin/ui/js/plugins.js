var editor = CodeMirror.fromTextArea(document.querySelector(".pluginCode"), {
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
    styleActiveLine: true
});

codeReusultEditor.setOption("theme", "mbo");

editor.on("change", function (e){

});


$(".code-run").on("click", function (){
    
});
