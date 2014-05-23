var MdParser = MD.MdParser = MD.createClass("MdParser", {
    constructor: function (editor) {
        this.editor = editor;
        this.mdTool = window.toMarkdown;
        this.htmlTool = window.markdown;

        this._initParseRules();
    },
    _initParseRules: function(){
        this._Md2HtmlRules = [];
        this._Html2MdRules = [];
    },
    splitMdBlocks: function(md){
        var mdObj = new this.mdTool.Markdown();
        return mdObj.split_blocks(md);
    },
    addMd2HtmlRule: function(rule){
        this._Md2HtmlRules.push(rule);
    },
    addHtml2MdRule: function(){
        this._Html2MdRules.push(rule);
    },
    parseMd2Html: function(md){
        var me = this,
            html = md;
        $.each(this._Md2HtmlRules, function(i, r){
            html = r.call(me, html);
        });
        return me.mdTool.toHTML(md);
    },
    parseHtml2Md: function(html){
        var me = this,
            md = html;
        $.each(this._Html2MdRules, function(i, r){
            md = r.call(me, md);
        });
        return toMarkdown(md);
    },
    md2html: function(md){
        var me = this,
            htmlBlocks = [],
            blocks = this.splitMdBlocks();
        $.each(blocks, function(i, b){
            var html = me.parseMd2Html(b);
            htmlBlocks.push(html);
        });
        return htmlBlocks.join('');
    },
    html2md: function(html){
        var me = this;
        return me.parseHtml2Md(html);
    }
});