(function(){

    MdParser.registerParser('github', {
        md2html: function (md) {
            return markdown.toHTML(md);
        },
        html2md: function (html) {
            return toMarkdown(html);
        }
    });

})();
