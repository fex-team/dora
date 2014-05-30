var DR =
    window.DR = function () {
        var instanceMap = {},
            instanceId = 0;

        return {
            version: '1.0.0',
            createEditor: function (renderTarget, options) {
                options = options || {};
                options.renderTo = Utils.isString(renderTarget) ? document.getElementById(renderTarget) : renderTarget;
                var editor = new Dora(options);
                this.addEditor(options.renderTo, editor);
                return editor;
            },
            addEditor: function (target, editor) {
                var id;
                if (typeof ( target ) === 'string') {
                    id = target;
                } else {
                    id = target.id || ( "MD_INSTANCE_" + instanceId++ );
                }
                editor.eid = instanceId;
                instanceMap[ id ] = editor;
            },
            getEditor: function (target, options) {
                var id;
                if (typeof ( target ) === 'string') {
                    id = target;
                } else {
                    id = target.id || ( "MD_INSTANCE_" + instanceId++ );
                }
                return instanceMap[ id ] || this.createEditor(target, options);
            },
            dom: {},
            //挂接多语言
            LANG: {}
        };
    }();