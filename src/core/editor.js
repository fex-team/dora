var Editor = MD.Editor = MD.createClass('Editor', {
    constructor: function (options) {
        this._options = $.extend(window.MDEDITOR_CONFIG || {}, options);
        this._setDefaultOptions(MD.defaultOptions);
        this._initEvents();
        this._initEditor();
        this._initShortcutKey();
        this._initModules();

        this.fire('editorready');
    },
    _initEditor: function () {
        this.codeEditor = new CodeEditor(this);
        this.richEditor = new RichEditor(this);
    },
    _setDefaultOptions: function (key, val) {
        var obj = {};
        if (Utils.isString(key)) {
            obj[key] = val;
        } else {
            obj = key;
        }
        $.extend(this._options, obj, true);
    },
    option: function (key, value) {
        if (value === undefined) {
            return this._options[ key ];
        } else {
            this._options[key] = value;
        }
    },
    lang: function (path) {
        var lang = MD.LANG[this.option('lang')];
        if (!lang) {
            throw new Error("not import language file");
        }
        path = (path || "").split(".");
        for (var i = 0, ci; ci = path[i++];) {
            lang = lang[ci];
            if (!lang)break;
        }
        return lang;
    }
});