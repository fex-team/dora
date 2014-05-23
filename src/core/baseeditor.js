var BaseEditor = MD.createClass("BaseEditor", {
    constructor: function (editor) {
        this.editor = editor;
    },
    init: function (editor) {
        var me = this;
        me.editor = editor;
        me._focusFlag = false;
    },
    isFocus: function(){
        return this._focusFlag;
    },
    renderTo: function($container){
        var me = this;
        me.$container = $container;
        me.$iframe = $('<iframe>').appendTo($container);

        var iframe = me.$iframe.get(0);
        me.document = iframe.contentDocument || iframe.contentWindow.document;
        me.$body = $(me.document.body);
        me.selection = new MD.dom.Selection(me.document, me.document.body);

        me.$body.attr('contenteditable', true);
    }
});
