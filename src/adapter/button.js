DR.registerUI('bold italic strikethrough undo redo insertorderedlist insertunorderedlist drafts',
    function (name) {
        var me = this;
        var $btn = $.mduibutton({
            icon: name,
            click: function (evt) {
                me.execCommand(name);
                evt.preventDefault();
                return false;
            },
            title: me.lang('labelMap')[name] || ''
        });

        me.on('selectionchange ready focus blur currentpathchange', function () {
            var state = me.queryCommandState(name);
            $btn.mdui().disabled(state == -1).active(state == 1);
        });
        return $btn;
    }
);
