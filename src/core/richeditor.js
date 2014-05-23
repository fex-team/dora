var RichEditor = MD.createClass("RichEditor", {
    constructor: function (editor) {
        this.editor = editor;
    }
});

MD.extendClass(RichEditor, BaseEditor);
