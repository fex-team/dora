var MdParser = DR.MdParser = DR.createClass("MdParser", {
    constructor: function (editor) {
        this.editor = editor;
        this._parserPool = {};
    },
    registerParser: function(name, parser){
        this._parserPool[name] = parser;
        if (parser && (this._md2html || this._html2md)) {
            this._md2html = parser.md2html;
            this._html2md = parser.html2md;
        }
    },
    switchParser: function(name){
        var parser;
        if (name && (parser = this._parserPool[name])) {
            this._md2html = parser.md2html;
            this._html2md = parser.html2md;
        }
    },
    splitMdBlocks: function (md) {
        var mdObj = new this.mdTool.Markdown();
        return mdObj.split_blocks(md);
    },
    md2html: function (md) {
        var me = this,
            htmlBlocks = [],
            blocks = this.splitMdBlocks(md);
        $.each(blocks, function (i, b) {
            var html = me._md2html(b);
            htmlBlocks.push(html);
        });
        return htmlBlocks.join('');
    },
    html2md: function (html) {
        var me = this;
        return me._md2html(html);
    }
});