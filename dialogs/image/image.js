(function () {

    var utils = DR.utils,
        browser = DR.browser,
        Base = {
        checkURL: function (url) {
            if(!url)    return false;
            url = utils.trim(url);
            if (url.length <= 0) {
                return false;
            }
            if (url.search(/http:\/\/|https:\/\//) !== 0) {
                url += 'http://';
            }

            url=url.replace(/\?[\s\S]*$/,"");

            if (!/(.gif|.jpg|.jpeg|.png)$/i.test(url)) {
                return false;
            }
            return url;
        },
        getAllPic: function (sel, $w, editor) {
            var me = this,
                arr = [],
                $imgs = $(sel, $w);

            $.each($imgs, function (index, node) {
                $(node).removeAttr("width").removeAttr("height");
                return arr.push({
                    _src: node.src,
                    src: node.src
                });
            });

            return arr;
        },
        scale: function (img, max, oWidth, oHeight) {
            var width = 0, height = 0, percent, ow = img.width || oWidth, oh = img.height || oHeight;
            if (ow > max || oh > max) {
                if (ow >= oh) {
                    if (width = ow - max) {
                        percent = (width / ow).toFixed(2);
                        img.height = oh - oh * percent;
                        img.width = max;
                    }
                } else {
                    if (height = oh - max) {
                        percent = (height / oh).toFixed(2);
                        img.width = ow - ow * percent;
                        img.height = max;
                    }
                }
            }

            return this;
        },
        close: function ($img) {

            $img.css({
                top: ($img.parent().height() - $img.height()) / 2,
                left: ($img.parent().width()-$img.width())/2
            }).prev().on("click",function () {

                if ( $(this).parent().remove().hasClass("mdui-image-upload-item") ) {
                    //显示图片计数-1
                    Upload.showCount--;
                    Upload.updateView();
                }

            });

            return this;
        },
        createImgBase64: function (img, file, $w) {
            if (browser.webkit) {
                //Chrome8+
                img.src = window.webkitURL.createObjectURL(file);
            } else if (browser.gecko) {
                //FF4+
                img.src = window.URL.createObjectURL(file);
            } else {
                //实例化file reader对象
                var reader = new FileReader();
                reader.onload = function (e) {
                    img.src = this.result;
                    $w.append(img);
                };
                reader.readAsDataURL(file);
            }
        },
        callback: function (editor, $w, url, state) {

            if (state == "SUCCESS") {
                //显示图片计数+1
                Upload.showCount++;
                var $img = $("<img src='" + editor.options.imagePath + url + "' class='mdui-image-pic' />"),
                    $item = $("<div class='mdui-image-item mdui-image-upload-item'><div class='mdui-image-close'></div></div>").append($img);

                if ($(".mdui-image-upload2", $w).length < 1) {
                    $(".mdui-image-content", $w).append($item);

                    Upload.render(".mdui-image-content", 2)
                        .config(".mdui-image-upload2");
                } else {
                    $(".mdui-image-upload2", $w).before($item).show();
                }

                $img.on("load", function () {
                    Base.scale(this, 120);
                    Base.close($(this));
                    $(".mdui-image-content", $w).focus();
                });

            } else {
                currentDialog.showTip( state );
                window.setTimeout( function () {

                    currentDialog.hideTip();

                }, 3000 );
            }

            Upload.toggleMask();

        }
    };

    /*
     * 本地上传
     * */
    var Upload = {
        showCount: 0,
        uploadTpl: '<div class="mdui-image-upload%%">' +
            '<span class="mdui-image-icon"></span>' +
            '<form class="mdui-image-form" method="post" enctype="multipart/form-data" target="up">' +
            '<input style=\"filter: alpha(opacity=0);\" class="mdui-image-file" type="file" hidefocus name="upfile" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp"/>' +
            '</form>' +

            '</div>',
        init: function (editor, $w) {
            var me = this;

            me.editor = editor;
            me.dialog = $w;
            me.render(".mdui-image-local", 1);
            me.config(".mdui-image-upload1");
            me.submit();
            me.drag();

            $(".mdui-image-upload1").hover(function () {
                $(".mdui-image-icon", this).toggleClass("hover");
            });

            if (!(DR.browser.ie && DR.browser.version <= 9)) {
                $(".mdui-image-dragTip", me.dialog).css("display", "block");
            }


            return me;
        },
        render: function (sel, t) {
            var me = this;

            $(sel, me.dialog).append($(me.uploadTpl.replace(/%%/g, t)));

            return me;
        },
        config: function (sel) {
            var me = this,
                url=me.editor.option('serverUrl');

            url=url + (url.indexOf("?") == -1 ? "?" : "&") + "editorid="+me.editor.id;//初始form提交地址;

            $("form", $(sel, me.dialog)).attr("action", url);

            return me;
        },
        uploadComplete: function(r){
            var me = this;
            try{
                var json = eval('('+r+')');
                Base.callback(me.editor, me.dialog, json.url, json.state);
            }catch (e){
                var lang = me.editor.lang('image');
                Base.callback(me.editor, me.dialog, '', (lang && lang.uploadError) || 'Error!');
            }
        },
        submit: function (callback) {

            var me = this,
                input = $( '<input style="filter: alpha(opacity=0);" class="mdui-image-file" type="file" hidefocus="" name="upfile" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp">'),
                input = input[0];

            $(me.dialog).delegate( ".mdui-image-file", "change", function ( e ) {

                if ( !this.parentNode ) {
                    return;
                }

                $('<iframe name="up"  style="display: none"></iframe>').insertBefore(me.dialog).on('load', function(){
                    var r = this.contentWindow.document.body.innerHTML;
                    if(r == '')return;
                    me.uploadComplete(r);
                    $(this).unbind('load');
                    $(this).remove();

                });

                $(this).parent()[0].submit();
                Upload.updateInput( input );
                me.toggleMask("Loading....");
                callback && callback();

            });

            return me;
        },
        //更新input
        updateInput: function ( inputField ) {

            $( ".mdui-image-file", this.dialog ).each( function ( index, ele ) {

                ele.parentNode.replaceChild( inputField.cloneNode( true ), ele );

            } );

        },
        //更新上传框
        updateView: function () {

            if ( Upload.showCount !== 0 ) {
                return;
            }

            $(".mdui-image-upload2", this.dialog).hide();
            $(".mdui-image-dragTip", this.dialog).show();
            $(".mdui-image-upload1", this.dialog).show();

        },
        drag: function () {
            var me = this;
            //做拽上传的支持
            if (!DR.browser.ie9below) {
                me.dialog.find('.mdui-image-content').on('drop',function (e) {

                    //获取文件列表
                    var fileList = e.originalEvent.dataTransfer.files;
                    var img = document.createElement('img');
                    var hasImg = false;
                    $.each(fileList, function (i, f) {
                        if (/^image/.test(f.type)) {
                            //创建图片的base64
                            Base.createImgBase64(img, f, me.dialog);

                            var xhr = new XMLHttpRequest();
                            xhr.open("post", me.editor.getOpt('imageUrl'), true);
                            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                            //模拟数据
                            var fd = new FormData();
                            fd.append(me.editor.getOpt('imageFieldName'), f);

                            xhr.send(fd);
                            xhr.addEventListener('load', function (e) {
                                var r = e.target.response, json;
                                me.uploadComplete(r);
                                if (i == fileList.length - 1) {
                                    $(img).remove()
                                }
                            });
                            hasImg = true;
                        }
                    });
                    if (hasImg) {
                        e.preventDefault();
                        me.toggleMask("Loading....");
                    }

                }).on('dragover', function (e) {
                        e.preventDefault();
                    });
            }
        },
        toggleMask: function (html) {
            var me = this;

            var $mask = $(".mdui-image-mask", me.dialog);
            if (html) {
                if (!(DR.browser.ie && DR.browser.version <= 9)) {
                    $(".mdui-image-dragTip", me.dialog).css( "display", "none" );
                }
                $(".mdui-image-upload1", me.dialog).css( "display", "none" );
                $mask.addClass("mdui-active").html(html);
            } else {

                $mask.removeClass("mdui-active").html();

                if ( Upload.showCount > 0 ) {
                    return me;
                }

                if (!(DR.browser.ie && DR.browser.version <= 9) ){
                    $(".mdui-image-dragTip", me.dialog).css("display", "block");
                }
                $(".mdui-image-upload1", me.dialog).css( "display", "block" );
            }

            return me;
        }
    };

    /*
     * 网络图片
     * */
    var NetWork = {
        init: function (editor, $w) {
            var me = this;

            me.editor = editor;
            me.dialog = $w;

            me.initEvt();
        },
        initEvt: function () {
            var me = this,
                url,
                $ele = $(".mdui-image-searchTxt", me.dialog);

            $(".mdui-image-searchAdd", me.dialog).on("click", function () {
                url = Base.checkURL($ele.val());

                if (url) {

                    $("<img src='" + url + "' class='mdui-image-pic' />").on("load", function () {



                        var $item = $("<div class='mdui-image-item'><div class='mdui-image-close'></div></div>").append(this);

                        $(".mdui-image-searchRes", me.dialog).append($item);

                        Base.scale(this, 120);

                        $item.width($(this).width());

                        Base.close($(this));

                        $ele.val("");
                    });
                }
            })
                .hover(function () {
                    $(this).toggleClass("hover");
                });
        }
    };

    var $tab = null,
        currentDialog = null;

    DR.registerWidget('image', {
        tpl: "<link rel=\"stylesheet\" type=\"text/css\" href=\"<%=image_url%>image.css\">" +
            "<div class=\"mdui-image-wrapper\">" +
            "<ul class=\"mdui-tab-nav\">" +
            "<li class=\"mdui-tab-item mdui-active\"><a data-context=\".mdui-image-local\" class=\"mdui-tab-text\"><%=lang_tab_local%></a></li>" +
            "<li  class=\"mdui-tab-item\"><a data-context=\".mdui-image-JimgSearch\" class=\"mdui-tab-text\"><%=lang_tab_imgSearch%></a></li>" +
            "</ul>" +
            "<div class=\"mdui-tab-content\">" +
            "<div class=\"mdui-image-local mdui-tab-pane mdui-active\">" +
            "<div class=\"mdui-image-content\"></div>" +
            "<div class=\"mdui-image-mask\"></div>" +
            "<div class=\"mdui-image-dragTip\"><%=lang_input_dragTip%></div>" +
            "</div>" +
            "<div class=\"mdui-image-JimgSearch mdui-tab-pane\">" +
            "<div class=\"mdui-image-searchBar\">" +
            "<table><tr><td><input class=\"mdui-image-searchTxt\" type=\"text\"></td>" +
            "<td><div class=\"mdui-image-searchAdd\"><%=lang_btn_add%></div></td></tr></table>" +
            "</div>" +
            "<div class=\"mdui-image-searchRes\"></div>" +
            "</div>" +
            "</div>" +
            "</div>",
        initContent: function (editor, $dialog) {
            var lang = editor.lang('image') && editor.lang('image')["static"],
                opt = $.extend({}, lang, {
                    image_url: DORA_CONFIG.DORA_HOME_URL + 'dialogs/image/'
                });

            Upload.showCount = 0;

            if (lang) {
                var html = $.parseTmpl(this.tpl, opt);
            }

            currentDialog = $dialog.mdui();

            this.root().html(html);

        },
        initEvent: function (editor, $w) {
//            $tab = $.mduitab({selector: ".mdui-image-wrapper"})
//                .mdui().on("beforeshow", function (e) {
//                    e.stopPropagation();
//                });

            Upload.init(editor, $w);

            NetWork.init(editor, $w);
        },
        buttons: {
            'ok': {
                exec: function (editor, $w) {
                    var sel = "",
                        index = $tab.activate();

                    if (index == 0) {
                        sel = ".mdui-image-content .mdui-image-pic";
                    } else if (index == 1) {
                        sel = ".mdui-image-searchRes .mdui-image-pic";
                    }

                    var list = Base.getAllPic(sel, $w, editor);

                    if (index != -1) {
                        editor.execCommand('insertimage', list);
                    }
                }
            },
            'cancel': {}
        },
        width: 700,
        height: 408
    }, function (editor, $w, url, state) {
        Base.callback(editor, $w, url, state)
    })
})();

