var CodeEditor = DR.createClass("CodeEditor", {
    constructor: function (editor) {
        this.editor = editor;
    }
});

DR.extendClass(CodeEditor, BaseEditor);
