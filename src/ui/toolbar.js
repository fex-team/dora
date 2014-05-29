//toolbar 类
(function () {
    DR.ui.define('toolbar', {
        tpl: '<div class="mdui-toolbar"  ><div class="mdui-btn-toolbar" unselectable="on" onmousedown="return false"  ></div></div>',
        init: function () {
            var $root = this.root($(this.tpl));
            this.data('$btnToolbar', $root.find('.mdui-btn-toolbar'))
        },
        appendToBtnmenu: function (data) {
            var $cont = this.data('$btnToolbar');
            data = $.isArray(data) ? data : [data];
            $.each(data, function (i, $item) {
                $cont.append($item)
            })
        }
    });
})();
