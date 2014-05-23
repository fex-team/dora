/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'lib/markdown.js',
            'lib/to-markdown.js',
            'core/mdeditor.js',
            'core/mdeditor.clazz.js',
            'core/mdeditor.browser.js',
            'core/mdeditor.utils.js',
            'core/mdeditor.defaultoptions.js',
            'core/mdeditor.module.js',
            'core/dom.domutils.js',
            'core/dom.range.js',
            'core/dom.selection.js',
            'core/eventbase.js',
            'core/editor.js',
            'core/editor.event.js',
            'core/editor.shortcutkeys.js',
            'core/editor.command.js',
            'core/editor.module.js',
            'core/baseeditor.js',
            'core/codeeditor.js',
            'core/richeditor.js',
            'core/mdparser.js',
            'modules/bold.js',
            'adapter/adapter.js',
            'ui/widget.js',
            'ui/toolbar.js',
            'lang/zh-cn/zh-cn.js'
        ],
        baseURL = 'src/';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }

})();
