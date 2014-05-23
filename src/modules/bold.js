UF.registerModule("boldmodule", function () {
    var me = this;

    return {
        "init": function () {

        },
        "defaultOptions": {
        },
        "commands": {
            "bold": {
                execute: function (path) {

                    if (me.codeEditor.isFocus()) {
                        var rng = me.codeEditor.selection.getRange();
                        rng.getPlainTxt();
                    }

                },
                queryState: queryState
            }
        },
        "events": {

        },
        "md2htmlRule": {
            'bold': function(md){
                return md.replace(/\*\*([^\*\s]+)\*\*/, '<strong>$1</strong>');
            }
        },
        "html2mdlRule": {
            'bold': function(md){
                return md.replace(/<strong>([^<\s])<\/strong>/, '** $1 **');
            }
        }
    };
});