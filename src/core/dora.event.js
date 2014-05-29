DR.extendClass(Editor, {
    _initEvents: function () {
        this._eventCallbacks = {};
    },
    _initDomEvent: function () {
        var me = this,
            $codeBody = me.codeEditor.$body,
            $richBody = me.richEditor.$body;

        /* 鼠标事件 */
        var keys = 'click mousedown mouseup mousemove mouseover mouseout contextmenu selectstart keydown keyup keypress';
        $codeBody.on(keys, me._getProxyDomEvent(me.codeEditor));
        $richBody.on(keys, me._getProxyDomEvent(me.richEditor));

    },
    _getProxyDomEvent: function (target) {
        var me = this;
        return function (evt) {
            evt.targetEditor = target;
            target.fire.call(target, evt.type.replace(/^on/, ''), evt);
            return me.fire.call(me, evt.type.replace(/^on/, ''), evt);
        };
    }
});

DR.extendClass(Editor, EventBase);