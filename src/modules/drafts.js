DR.registerModule("draftsmodule", function () {
    var me = this;

    return {
        "init": function () {

        },
        "commands": {
            "drafts": {
                execute:  function(){
                    var editor = me.getCurrentEditor();
                    editor.execCommand('drafts');
                    me.syncer.sync(editor);
                },
                queryState: function () {

                }
            }
        }
    };
});