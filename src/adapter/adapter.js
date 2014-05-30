(function () {

    var _mdeditorUI = {},
        _activeWidget = null,
        _widgetData = {},
        _widgetCallBack = {};

    $.extend(DR, {
        registerUI: function (uiname, fn) {
            $.each(uiname.split(/\s+/), function (i, name) {
                _mdeditorUI[ name ] = fn;
            });
        },
        _createContainer: function (id) {
            var $container = $('<div class="mdui-container"></div>');
            var $toolbar = $.mduitoolbar().appendTo($container);
            var $codeeditor = $('<div class="mdui-codeeditor"></div>').appendTo($container);
            var $richeditor = $('<div class="mdui-richeditor"></div>').appendTo($container);

            $(Utils.isString(id) ? '#' + id : id).append($container);

            return {
                $container: $container,
                $toolbar: $toolbar,
                $codeeditor: $codeeditor,
                $richeditor: $richeditor
            };
        },
        _createToolbar: function (editor, $toolbar) {
            var toolbars = editor.option('toolbars');

            if (toolbars && toolbars.length) {
                var btns = [];
                $.each(toolbars, function (i, uiNames) {
                    $.each(uiNames.split(/\s+/), function (index, name) {
                        if (name == '|') {
                            $.mduiseparator && btns.push($.mduiseparator());
                        } else {
                            if (_mdeditorUI[ name ]) {
                                var ui = _mdeditorUI[ name ].call(editor, name);
                                ui && btns.push(ui);
                            }
                        }

                    });
                    btns.length && $toolbar.mdui().appendToBtnmenu(btns);
                });
            }
            $toolbar.append($('<div class="mdui-dialog-container"></div>'));
        },
        _createMessageHolder: function (editor) {
            var $messageHolder = $('<div class="mdui-message-list"></div>');
            editor.$container.append($messageHolder);
            editor.$messageHolder = $messageHolder;

            var _messages = {};

            editor.on('showmessage', function (type, p) {
                var $message = _mdeditorUI['message'].call(editor, 'message', {
                    icon: p.icon || 'warning',
                    title: p.title || '',
                    loadedPercent: p.loadedPercent || 100,
                    timeout: p.timeout,
                    id: p.id || 'm' + (+new Date()).toString(36)
                });
                if (p.id) {
                    _messages[p.id] = $message;
                }
                $messageHolder.append($message);
                $message.mdui().show();
            });
            editor.on('updatemessage', function (type, p) {
                var $message;
                if (p.id && ($message = _messages[p.id])) {
                    $message.mdui().setIcon(p.icon).setMessage(p.title).setTimer(p.timeout).setLoadedPercent(p.loadedPercent);
                }
            });
            editor.on('hidemessage', function (type, p) {
                var $message;
                if (($message = _messages[p.id])) {
                    $message.mdui().hide();
                }
            });
        },
        getDora: function (id, options) {
            var txt = $('#' + id).text();

            var doms = this._createContainer(id),
                editor = this.getEditor(id, options);

            editor.$container = doms.$container;
            editor.$toolbar = doms.$toolbar;

            editor.render(doms.$codeeditor.get(0), doms.$richeditor.get(0));

            this._createToolbar(editor, doms.$toolbar);
            this._createMessageHolder(editor);

            editor._initDomEvent();
            editor.fire('ready');
            return editor;
        },
        delDora: function (id) {

        },
        registerWidget: function (name, pro, cb) {
            _widgetData[name] = $.extend2(pro, {
                $root: '',
                _preventDefault: false,
                root: function ($el) {
                    return this.$root || (this.$root = $el);
                },
                preventDefault: function () {
                    this._preventDefault = true;
                },
                clear: false
            });
            if (cb) {
                _widgetCallBack[name] = cb;
            }
        },
        getWidgetData: function (name) {
            return _widgetData[name];
        },
        setWidgetBody: function (name, $widget, editor) {
            if (!editor._widgetData) {
                Utils.extend(editor, {
                    _widgetData: {},
                    getWidgetData: function (name) {
                        return this._widgetData[name];
                    },
                    getWidgetCallback: function (widgetName) {
                        var me = this;
                        return function () {
                            return  _widgetCallBack[widgetName].apply(me, [me, $widget].concat(Array.prototype.slice.call(arguments, 0)));
                        };
                    }
                });

            }
            var pro = _widgetData[name];
            if (!pro) {
                return null;
            }
            pro = editor._widgetData[name];
            if (!pro) {
                pro = _widgetData[name];
                pro = editor._widgetData[name] = $.type(pro) == 'function' ? pro : Utils.clone(pro);
            }

            pro.root($widget.mdui().getBodyContainer());

            pro.initContent(editor, $widget);
            if (!pro._preventDefault) {
                pro.initEvent(editor, $widget);
            }

            pro.width && $widget.width(pro.width);

        },
        setTopEditor: function(){

        },
        createToolbar: function (options, editor) {

        }
    });

})();
