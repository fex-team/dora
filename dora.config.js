
(function () {
    var URL = window.MDEDITOR_HOME_URL || getBaseBir();

    window.MDEDITOR_CONFIG = {

        MDEDITOR_HOME_URL: URL
        , toolbars: [
            'fullscreen', 'undo', 'redo', 'bold', 'italic', 'strikethrough', 'image',
            'insertorderedlist', 'insertunorderedlist', 'link', 'drafts'
        ]

    };

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
