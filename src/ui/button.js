//button 类
DR.ui.define('button', {
    tpl: '<<%if(!texttype){%>div class="mdui-btn mdui-btn-<%=icon%> <%if(name){%>mdui-btn-name-<%=name%><%}%>" unselectable="on" onmousedown="return false" <%}else{%>a class="mdui-text-btn"<%}%><% if(title) {%> data-original-title="<%=title%>" <%};%>> ' +
    '<% if(icon) {%><div unselectable="on" class="mdui-icon-<%=icon%> mdui-icon"></div><% }; %><%if(text) {%><span unselectable="on" onmousedown="return false" class="mdui-button-label"><%=text%></span><%}%>' +
    '<%if(caret && text){%><span class="mdui-button-spacing"></span><%}%>' +
    '<% if(caret) {%><span unselectable="on" onmousedown="return false" class="mdui-caret"></span><% };%></<%if(!texttype){%>div<%}else{%>a<%}%>>',
    defaultOpt: {
        text: '',
        title: '',
        icon: '',
        width: '',
        caret: false,
        texttype: false,
        click: function () {
        }
    },
    init: function (options) {
        var me = this;

        me.root($($.parseTmpl(me.tpl, options)))
            .click(function (evt) {
                me.wrapclick(options.click, evt)
            });

        me.root().hover(function () {
            if (!me.root().hasClass("mdui-disabled")) {
                me.root().toggleClass('mdui-hover')
            }
        })

        return me;
    },
    wrapclick: function (fn, evt) {
        if (!this.disabled()) {
            this.root().trigger('wrapclick');
            $.proxy(fn, this, evt)()
        }
        return this;
    },
    label: function (text) {
        if (text === undefined) {
            return this.root().find('.mdui-button-label').text();
        } else {
            this.root().find('.mdui-button-label').text(text);
            return this;
        }
    },
    disabled: function (state) {
        if (state === undefined) {
            return this.root().hasClass('mdui-disabled')
        }
        this.root().toggleClass('mdui-disabled', state);
        if (this.root().hasClass('mdui-disabled')) {
            this.root().removeClass('mdui-hover')
        }
        return this;
    },
    active: function (state) {
        if (state === undefined) {
            return this.root().hasClass('mdui-active')
        }
        this.root().toggleClass('mdui-active', state)

        return this;
    },
    mergeWith: function ($obj) {
        var me = this;
        me.data('$mergeObj', $obj);
        $obj.mdui().data('$mergeObj', me.root());
        if (!$.contains(document.body, $obj[0])) {
            $obj.appendTo(me.root());
        }
        me.on('click', function () {
            me.wrapclick(function () {
                $obj.mdui().show();
            })
        }).register('click', me.root(), function (evt) {
            $obj.hide()
        });
    }
});