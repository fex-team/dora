DR.extendClass(Dora, {
    _initEditors: function () {
        this._initCodeEditor();
        this._initRichEditor();
    },
    _initCodeEditor: function(){
        this.codeeditor = new UE.Editor();
    },
    _initRichEditor: function(){
        this.codeeditor = new UE.Editor();
    },
    render: function(codeContainer, richContainer){
        this.codeeditor.render(codeContainer);
        this.codeeditor.render(richContainer);
    },
    getCurrentEditor: function(){

    },
    getEditorEditor: function(){

    }
});