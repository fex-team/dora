DR.registerModule("basestylemodule", function () {
    var me = this;

    return {
        "init": function () {

        },
        "defaultOptions": {
        },
        "commands": {
            "bold": {
                execute: function () {
                    var editor = me.getCurrentEditor();
                    console.log('bold');
                    if (me.codeEditor.isFocus()) {
                        var rng = me.codeEditor.selection.getRange();
                        rng.getPlainTxt();
                    }

                },
                queryState: function () {

                }
            },
            "italic": {
                execute: function () {

                },
                queryState: function () {

                }
            },
            "strikethrough": {
                execute: function () {
                },
                queryState: function () {

                }
            }
        },
        "events": {

        },
        "shortcutKeys": {
            "bold": "ctrl+66",//^B
            "italic" : "ctrl+73", //^I
            "underline" : "ctrl+shift+85",//^U
            "strikethrough" : 'ctrl+shift+83' //^S
        },
        "md2htmlRule": {
//            'bold': function (md) {
//                return md.replace(/\*\*([^\*\s]+)\*\*/, '<strong>$1</strong>');
//            }
        },
        "html2mdlRule": {
//            'bold': function (md) {
//                return md.replace(/<strong>([^<\s])<\/strong>/, '** $1 **');
//            }
        }
    };
});