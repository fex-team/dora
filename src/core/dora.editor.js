DR.extendClass(Dora, {
    _initEditors: function () {
        this._initCodeEditor();
        this._initRichEditor();
    },
    _initCodeEditor: function(){
        var me = this;
        me.codeeditor = new UE.Editor();
        me.codeeditor.on('focus', function(){
            me._currentEditor = me.codeeditor;
        });
    },
    _initRichEditor: function(){
        var me = this;
        me._currentEditor = me.richeditor = new UE.Editor();
        me.richeditor.on('focus', function(){
            me._currentEditor = me.richeditor;
        });
    },
    render: function(codeContainer, richContainer){
        this.codeeditor.render(codeContainer);
        this.richeditor.render(richContainer);
    },
    getCurrentEditor: function(){
        return this._currentEditor;
    },
    getAnotherEditor: function(){
        return this._currentEditor === this.richeditor ? this.codeeditor:this.richeditor;
    }
});