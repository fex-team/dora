DR.registerModule("basestylemodule", function () {
    var me = this;

    function getExecute(cmd){
        return function(){
            var editor = me.getCurrentEditor();
            editor.execCommand(cmd);
            me.syncer.sync(editor);
        }
    }

    return {
        "init": function () {

        },
        "defaultOptions": {
        },
        "commands": {
            "bold": {
                execute: getExecute('bold'),
                queryState: function () {

                }
            },
            "italic": {
                execute: getExecute('italic'),
                queryState: function () {

                }
            },
            "strikethrough": {
                execute: getExecute('strikethrough'),
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