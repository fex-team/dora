/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'lib/markdown.js',
            'lib/to-markdown.js',
            'src/core/dr.js',
            'src/core/dr.clazz.js',
            'src/core/dr.browser.js',
            'src/core/dr.utils.js',
            'src/core/dr.defaultoptions.js',
            'src/core/dr.module.js',
            'src/core/dr.syncer.js',
            'src/core/dr.mdparser.js',
            'src/core/dom.domutils.js',
            'src/core/dom.range.js',
            'src/core/dom.selection.js',
            'src/core/dora.js',
            'src/core/dora.event.js',
            'src/core/dora.shortcutkeys.js',
            'src/core/dora.editor.js',
            'src/core/dora.command.js',
            'src/core/dora.module.js',
            'src/modules/basestyle.js',
            'src/modules/drafts.js',
            'src/adapter/adapter.js',
            'src/adapter/button.js',
            'src/adapter/dialog.js',
            'src/ui/widget.js',
            'src/ui/toolbar.js',
            'src/ui/button.js',
            'src/ui/modal.js',
            'src/ui/widget.js',
            'src/parser/gfm.js',
            'lang/zh-cn/zh-cn.js'
        ],
        baseURL = getBaseBir();

    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }

    function getBaseBir(){
        var srcipts = document.getElementsByTagName('script'),
            src = srcipts[srcipts.length - 1].src;

        if (src) {
            var a = document.createElement('a');
            a.href = src;
            a.href = a.href;
            return a.protocol + '//' + a.host + a.pathname.substr(0, a.pathname.lastIndexOf('/') + 1);
        }
        return '';
    }

})();
