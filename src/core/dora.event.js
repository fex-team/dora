DR.extendClass(Dora, {
    _initEvents: function () {
        this._eventCallbacks = {};
    },
    _initDomEvent: function () {
        var me = this;
        me.codeeditor.on('allevents', function(){
            me.fire.apply(me, arguments);
        });
        me.richeditor.on('allevents', function(){
            me.fire.apply(me, arguments);
        });
    },
    _getProxyDomEvent: function (target) {
        var me = this;
        return function (evt) {
            evt.targetEditor = target;
            target.fire.call(target, evt.type.replace(/^on/, ''), evt);
            return me.fire.call(me, evt.type.replace(/^on/, ''), evt);
        };
    },
    _listen: function (type, callback) {
        if (!this._eventCallbacks) {
            this._eventCallbacks = {};
        }
        var callbacks = this._eventCallbacks[ type ] || ( this._eventCallbacks[ type ] = [] );
        callbacks.push(callback);
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
        var callbacks;
        if (this._eventCallbacks && (callbacks = this._eventCallbacks[type.toLowerCase()])) {
            for (var i = 0; i < callbacks.length; i++) {
                var res = callbacks[ i ].apply(this, arguments);
                if (res == false) {
                    break;
                }
            }
            return res;
        }
    }
});
