/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'lib/markdown.js',
            'lib/to-markdown.js',
            'src/core/mdeditor.js',
            'src/core/mdeditor.clazz.js',
            'src/core/mdeditor.browser.js',
            'src/core/mdeditor.utils.js',
            'src/core/mdeditor.defaultoptions.js',
            'src/core/mdeditor.module.js',
            'src/core/dom.domutils.js',
            'src/core/dom.range.js',
            'src/core/dom.selection.js',
            'src/core/eventbase.js',
            'src/core/editor.js',
            'src/core/editor.event.js',
            'src/core/editor.shortcutkeys.js',
            'src/core/editor.command.js',
            'src/core/editor.module.js',
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
        baseURL = 'src/';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }

})();
