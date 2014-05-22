MD.extendClass(Editor, {
    _initEvents: function () {
        this._eventCallbacks = {};
    },
    _initDomEvent: function () {
        var me = this,
            $codeBody = me.codeEditor.$body,
            $richBody = me.richEditor.$body;

        /* 鼠标事件 */
        $codeBody.on('click mousedown mouseup mousemove mouseover mouseout contextmenu selectstart', me._codeProxyDomEvent(me.codeEditor));
        $richBody.on('click mousedown mouseup mousemove mouseover mouseout contextmenu selectstart', me._richProxyDomEvent(me.richEditor));

    },
    _getProxyDomEvent: function(target){
        return function (evt) {
            var me = this;
            if (evt.originalEvent) {
                evt.targetEditor = target;
                /* 同时触发 tree.click 等事件 */
                me.fire(p + '.' + evt.type.replace(/^on/, ''), evt);
            }
            return this.fire(evt.type.replace(/^on/, ''), evt);
        };
    },
    _listen: function (type, callback) {
        var callbacks = this._eventCallbacks[ type ] || ( this._eventCallbacks[ type ] = [] );
        callbacks.push(callback);
    },
    setFocus: function () {
        this.isFocused = true;
        this.fire('focus');
    },
    setBlur: function () {
        this.isFocused = false;
        this.fire('blur');
    },
    on: function (name, callback) {
        var types = name.split(' ');
        for (var i = 0; i < types.length; i++) {
            this._listen(types[ i ].toLowerCase(), callback);
        }
        return this;
    },
    one: function (name, callback) {
        var me = this,
            handler = function () {
                callback();
                me.off(name, handler);
            };

        me.on(name, handler);
        return this;
    },
    off: function (name, callback) {
        var types = name.split(' ');
        var i, j, callbacks, removeIndex;
        for (i = 0; i < types.length; i++) {
            callbacks = this._eventCallbacks[ types[ i ].toLowerCase() ];
            if (callbacks) {
                removeIndex = null;
                for (j = 0; j < callbacks.length; j++) {
                    if (callbacks[j] == callback) {
                        removeIndex = j;
                    }
                }
                if (removeIndex !== null) {
                    callbacks.splice(removeIndex, 1);
                }
            }
        }
    },
    fire: function (type) {
        var callbacks = this._eventCallbacks[ type.toLowerCase() ];
        if (!callbacks) {
            return;
        }
        for (var i = 0; i < callbacks.length; i++) {
            var res = callbacks[ i ].apply(this, arguments);
            if (res == false) {
                break;
            }
        }
        return res;
    }
});