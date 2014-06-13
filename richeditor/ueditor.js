/**
 * 开发版本的文件导入
 */
(function (){
    var paths  = [
            'editor.js',
            'core/browser.js',
            'core/utils.js',
            'core/EventBase.js',
            'core/dtd.js',
            'core/domUtils.js',
            'core/Range.js',
            'core/Selection.js',
            'core/Editor.js',
            'core/Editor.defaultoptions.js',
            'core/ajax.js',
            'core/filterword.js',
            'core/node.js',
            'core/htmlparser.js',
            'core/filternode.js',
            'core/plugin.js',
            'core/keymap.js',
            'core/localstorage.js',
            'plugins/defaultfilter.js',
            'plugins/inserthtml.js',
            'plugins/autotypeset.js',
            'plugins/autosubmit.js',
            'plugins/background.js',
            'plugins/image.js',
            'plugins/justify.js',
            'plugins/font.js',
            'plugins/link.js',
            'plugins/iframe.js',
            'plugins/scrawl.js',
            'plugins/removeformat.js',
            'plugins/blockquote.js',
            'plugins/convertcase.js',
            'plugins/indent.js',
            'plugins/print.js',
            'plugins/preview.js',
            'plugins/selectall.js',
            'plugins/paragraph.js',
            'plugins/directionality.js',
            'plugins/horizontal.js',
            'plugins/time.js',
            'plugins/rowspacing.js',
            'plugins/lineheight.js',
            'plugins/cleardoc.js',
            'plugins/anchor.js',
            'plugins/wordcount.js',
            'plugins/pagebreak.js',
            'plugins/wordimage.js',
            'plugins/dragdrop.js',
            'plugins/undo.js',
            'plugins/paste.js',
            'plugins/puretxtpaste.js',
            'plugins/list.js',
            'plugins/enterkey.js',
            'plugins/keystrokes.js',
            'plugins/fiximgclick.js',
            'plugins/autolink.js',
            'plugins/shortcutmenu.js',
            'plugins/basestyle.js',
            'plugins/elementpath.js',
            'plugins/formatmatch.js',
            'plugins/searchreplace.js',
            'plugins/customstyle.js',
            'plugins/catchremoteimage.js',
            'plugins/snapscreen.js',
            'plugins/insertparagraph.js',
            'plugins/template.js',
            'plugins/music.js',
            'plugins/autoupload.js',
            'plugins/autosave.js'
        ],
        baseURL = getBaseBir() + 'src/';

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
