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
            'src/core/dom.domutils.js',
            'src/core/dom.range.js',
            'src/core/dom.selection.js',
            'src/core/eventbase.js',
            'src/core/dora.js',
            'src/core/dora.event.js',
            'src/core/dora.shortcutkeys.js',
            'src/core/dora.command.js',
            'src/core/dora.module.js',
            'src/core/baseeditor.js',
            'src/core/codeeditor.js',
            'src/core/richeditor.js',
            'src/core/mdparser.js',
            'src/modules/basestyle.js',
            'src/adapter/adapter.js',
            'src/adapter/button.js',
            'src/ui/widget.js',
            'src/ui/toolbar.js',
            'src/ui/button.js',
            'codeeditor/core/editor.js',
            'codeeditor/modules/basestyle.js',
            'richeditor/core/editor.js',
            'richeditor/plugins/basestyle.js',
            'lang/zh-cn/zh-cn.js'
        ],
        baseURL = '';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }

})();
