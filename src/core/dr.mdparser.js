var MdParser;

(function (){

    var _parserPool = {},
        _lastParser;

    MdParser = DR.MdParser = DR.createClass("MdParser", {
        constructor: function (editor) {
            this.editor = editor;
        },
        _initParser: function(parser){
            parser = parser || _lastParser;
            this._md2html = parser.md2html;
            this._html2md = parser.html2md;
        },
        switchParser: function(name){
            var parser;
            if (name && (parser = _parserPool[name])) {
                this._md2html = parser.md2html;
                this._html2md = parser.html2md;
            }
        },
        md2html: function (md) {
            var me = this;
            return me._md2html(md);
//            var me = this,
//                htmlBlocks = [],
//                blocks = this.splitMdBlocks(md);
//            $.each(blocks, function (i, b) {
//                var html = me._md2html(b);
//                htmlBlocks.push(html);
//            });
//            return htmlBlocks.join('');
        },
        html2md: function (html) {
            var me = this;
            return me._html2md(html);
        },
        splitMdBlocks: function splitMdBlocks(input) {
            // Normalize linebreaks to \n.
            input = input.replace(/\r\n?/g, "\n");
            // Match until the end of the string, a newline followed by #, or two or more newlines.
            // [\s\S] matches _anything_ (newline or space)
            // [^] is equivalent but doesn't work in IEs.
            var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
                blocks = [],
                m;

            if (( m = /^(\s*\n)/.exec(input) ) !== null) {
                // skip (but count) leading blank lines
                re.lastIndex = m[0].length;
            }

            while (( m = re.exec(input) ) !== null) {
                if (m[2] === "\n#") {
                    m[2] = "\n";
                    re.lastIndex--;
                }
                blocks.push(m[1]);
            }

            return blocks;
        }

    });

    MdParser.registerParser = function(name, parser){
        _parserPool[name] = parser;
        _lastParser = parser;
    };

})();