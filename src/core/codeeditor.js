var CodeEditor = MD.createClass("CodeEditor", {
    constructor: function (editor) {
        this.editor = editor;
    }
});

MD.extendClass(CodeEditor, BaseEditor);
