DR.registerUI('link image', function (name) {

    var me = this, currentRange, $dialog,
        opt = {
            title: (me.option('labelMap') && me.option('labelMap')[name]) || me.lang("labelMap." + name),
            url: me.option('DORA_HOME_URL') + 'dialogs/' + name + '/' + name + '.js'
        };

    var $btn = $.mduibutton({
        icon: name,
        title: this.lang('labelMap')[name] || ''
    });

    //加载模版数据
    utils.loadFile(document,{
        src: opt.url,
        tag: "script",
        type: "text/javascript",
        defer: "defer"
    },function(){
        //调整数据
        var data = DR.getWidgetData(name);
        if(!data) return;
        if(data.buttons){
            var ok = data.buttons.ok;
            if(ok){
                opt.oklabel = ok.label || me.lang('ok');
                if(ok.exec){
                    opt.okFn = function(){
                        return $.proxy(ok.exec,null,me,$dialog)();
                    };
                }
            }
            var cancel = data.buttons.cancel;
            if(cancel){
                opt.cancellabel = cancel.label || me.lang('cancel');
                if(cancel.exec){
                    opt.cancelFn = function(){
                        return $.proxy(cancel.exec,null,me,$dialog)();
                    };
                }
            }
        }
        data.width && (opt.width = data.width);
        data.height && (opt.height = data.height);

        $dialog = $.mduimodal(opt);

        $dialog.attr('id', 'mdui-dialog-' + name).addClass('mdui-dialog-' + name)
            .find('.mdui-modal-body').addClass('mdui-dialog-' + name + '-body');

        $dialog.mdui().on('beforehide',function () {
//            var rng = me.selection.getRange();
//            if (rng.equals(currentRange)) {
//                rng.select();
//            }
        }).on('beforeshow', function () {
            var $root = this.root(),
                win = null,
                offset = null;
            //currentRange = me.selection.getRange();
            if (!$root.parent()[0]) {
                me.$container.find('.mdui-dialog-container').append($root);
            }

            //IE6下 特殊处理, 通过计算进行定位
            if( $.IE6 ) {

                win = {
                    width: $( window ).width(),
                    height: $( window ).height()
                };
                offset = $root.parents(".mdui-toolbar")[0].getBoundingClientRect();
                $root.css({
                    position: 'absolute',
                    margin: 0,
                    left: ( win.width - $root.width() ) / 2 - offset.left,
                    top: 100 - offset.top
                });

            }
            DR.setWidgetBody(name,$dialog,me);
            DR.setTopEditor(me);
        }).on('afterbackdrop',function(){
            this.$backdrop.css('zIndex',me.option('zIndex')+1).appendTo(me.$container.find('.mdui-dialog-container'));
            $dialog.css('zIndex',me.option('zIndex')+2);
        }).on('beforeok',function(){
            try{
//                currentRange.select();
            }catch(e){}
        }).attachTo($btn);
    });


    me.on('selectionchange', function () {
        var state = this.queryCommandState(name);
        $btn.mdui().disabled(state == -1).active(state == 1);
    });
    return $btn;

});