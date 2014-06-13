var Syncer = DR.Syncer = DR.createClass("Syncer", (function(){

    var blankClass = 'blank',
        blankHtml = '<p class="' + blankClass + '"><br/></p>';

    return {
        constructor: function (editor) {
            this.editor = editor;
            this.codeeditor = editor.codeeditor;
            this.richeditor = editor.richeditor;
            this.oldMd = this.oldHtml = '';
        },
        _initSyncer: function(){
            var me = this,
                editor = me.editor,
                timer;
            editor.on('contentchange', function(){
                var current = editor.getCurrentEditor();
                if (timer) {
                    return;
                }
                timer = setTimeout(function(){
                    me.sync(current);
                    timer = null;
                }, 500);
            });
        },
        sync: function(current){
            var me = this,
                editor = me.editor,
                i, diff, newMd = '', newHtml = '', newMdArr = [], newHtmlArr = [];

            current = current || editor.getCurrentEditor();

            if (current === me.codeeditor) {
                newMd = me.codeeditor.getPlainTxt();
                //diff = me.makeMdPatch(me.oldMd, newMd, 'md');
                diff = me.makePatch(newMd, me.oldMd, 'md');

                for (i = 0; i < diff.change.length; i++) {
                    newHtmlArr.push(editor.mdparser.md2html(diff.change[i]));
                }

                me.setHtmlPartContent(newHtmlArr, diff.start, diff.end);
            } else if (current === me.richeditor) {
                newHtml = me.richeditor.getContent();
                diff = me.makePatch(newHtml, me.oldHtml, 'html');

                for (i = 0; i < diff.change.length; i++) {
                    newHtmlArr.push(editor.mdparser.html2md(diff.change[i]));
                }

                me.setMdPartContent(newHtmlArr, diff.start, diff.end);
            }

            me.oldMd = me.codeeditor.getPlainTxt();
            me.oldHtml = me.richeditor.getContent();
        },
        setMdPartContent: function(md, start, end){
            this.codeeditor.setContent('<pre>' + md.join('\n\n') + '</pre>', start, end);
        },
        setHtmlPartContent: function(html, start, end){
            var me = this,
                childrens;

            if (!me.richeditor.hasContents()) {

                me.richeditor.setContent(blankHtml + html.join(blankHtml) + blankHtml, start, end);

            } else {

                cleanBlank();
                childrens = me.richeditor.body.children;

                var startBlock, endBlock, index, i, current, delNode;

                for (index = -1, i = 0; i < childrens.length && index < end; i++) {
                    if (isBlank(childrens[i])) {
                        index++;
                    }
                    if (index >= start && !startBlock) {
                        startBlock = childrens[i];
                    }
                    if (index >= end) {
                        endBlock = childrens[i];
                        break;
                    }
                }

                if (startBlock && startBlock != endBlock) {
                    current = startBlock.nextSibling;
                    while (current && (!endBlock || (UE.dom.domUtils.getPosition(current, endBlock) & UE.dom.domUtils.POSITION_PRECEDING))) {
                        delNode = current;
                        current = current.nextSibling;
                        $(delNode).remove();
                    }
                }

                if (html.length) {
                    if (endBlock) {
                        $(endBlock).before(blankHtml + html.join(blankHtml) + blankHtml);
                    } else {
                        $(me.richeditor.body).append(blankHtml + html.join(blankHtml) + blankHtml);
                    }
                }

            }

            cleanBlank();

            function isBlank(ele){
                return $(ele).hasClass(blankClass);
            }

            function cleanBlank(){
                var childrens = me.richeditor.body.children;
                for (var i = childrens.length - 1; i >= 0; i--) {
                    if (i != 0 && isBlank(childrens[i]) && isBlank(childrens[i].previousSibling)) {
                        $(childrens[i]).remove();
                    }
                }
                if (!isBlank(me.richeditor.body.firstChild)) {
                    $(me.richeditor.body).prepend(blankHtml);
                }
                if (!isBlank(me.richeditor.body.lastChild)) {
                    $(me.richeditor.body).append(blankHtml);
                }
            }
        },
        splitMdBlocks: function(input){
            input = input.replace(/\r\n?/g, "\n");
            var re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
                blocks = [],
                m;

            if (( m = /^(\s*\n)/.exec(input) ) !== null) {
                re.lastIndex = m[0].length;
            }

            while (( m = re.exec(input) ) !== null) {
                if (m[2] === "\n#") {
                    m[2] = "\n";
                    re.lastIndex--;
                }
                blocks.push(m[1]);
            }

            return blocks;
        },
        splitHtmlBlocks: function(input){

            //input = input.replace(new RegExp('(' + blankHtml.replace('/', '\\\/') + '){2,}', 'g'), "\n");

            var blocks = input.split(blankHtml);

            for (var i = blocks.length - 1; i >= 0; i--){
                if (i > 0 && Utils.trim(blocks[i]) == '' && Utils.trim(blocks[i - 1]) == '') {
                    blocks.splice(i,1);
                }
            }
            if (Utils.trim(blocks[blocks.length - 1]) == '') {
                blocks.splice(blocks.length - 1, 1);
            }
            if (Utils.trim(blocks[0]) == '') {
                blocks.splice(0, 1);
            }
            return blocks;
        },
        makePatch: function(oldStr, newStr, type){
            var me = this;
            var oldBlocks = type == 'md' ? me.splitMdBlocks(oldStr):me.splitHtmlBlocks(oldStr);
            var newBlocks = type == 'md' ? me.splitMdBlocks(newStr):me.splitHtmlBlocks(newStr);

            var i = 0, j = 0, start, end;
            while (i < newBlocks.length && j < oldBlocks.length && newBlocks[i] == oldBlocks[j]) {
                i++;
                j++;
            }
            start = i;

            i = newBlocks.length - 1;
            j = oldBlocks.length - 1;
            while (i >= start && j >= start && newBlocks[i] == oldBlocks[j]) {
                i--;
                j--;
            }
            end = i + 1;

            var change = [];
            for (i = start; i < oldBlocks.length && i < (j + 1); i++) {
                change.push(oldBlocks[i]);
            }

            if (start == end && start == oldBlocks.length && oldBlocks.length == newBlocks.length) {
                start = end = 0;
            }

            return {
                start: start,
                end: end,
                change: change
            }
        },
        applyPatch: function(oldStr, patch, type){
            var me = this,
                output = [],
                newBlocks = type == 'md' ? me.splitMdBlocks(oldStr):me.splitHtmlBlocks(oldStr);

            for (i = 0; i < patch.start; i++) {
                output.push(newBlocks[i]);
            }
            for (i = 0; i < patch.change.length; i++) {
                output.push(patch.change[i]);
            }
            for (i = patch.end; i < newBlocks.length; i++) {
                output.push(newBlocks[i]);
            }
            return output;
        }
    }

})());
