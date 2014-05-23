/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'core/mdeditor.js',
            'core/mdeditor.clazz.js',
            'core/mdeditor.browser.js',
            'core/mdeditor.utils.js',
            'core/mdeditor.defaultoptions.js',
            'core/mdeditor.module.js',
            'core/editor.js',
            'core/editor.event.js',
            'core/editor.shortcutkeys.js',
            'core/editor.command.js',
            'core/editor.module.js',
            'core/codeeditor.js',
            'core/richeditor.js',
            'core/mdparser.js'
        ],
        baseURL = 'src/';
    for (var i=0,pi;pi = paths[i++];) {
        document.write('<script type="text/javascript" src="'+ baseURL + pi +'"></script>');
    }

})();
