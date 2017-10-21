
!(function (window, $) {
    //弹出框对象的HTML部分
    let template = '<div class="mask" id="${id}">' +
        '<div class="alert">' +
        '<div class="header"></div>' +
        '<div class="body"></div>' +
        '<div class="footer">' +
        '<div class="btn left"></div>' +
        '<div class="btn right"></div>' +
        '</div>' +
        '</div>' +
        '</div>';

    function EAlert(opts) {
        this.settings = {
            title: "提示",
            body: "",
            left: {
                text: "取消",
                onPress: function () { }
            },
            right: {
                text: "确认",
                onPress: function () { }
            }
        };
        $.extend(this.settings, opts);
    }

    //把弹出框对象渲染到页面上
    EAlert.prototype.render = function () {
        var id = "KEY_" + parseInt(Math.random() * 10000000);
        var html = template.replace("${id}", id);
        var self = this;
        $("body").append(html);

        $("#" + id).find(".header").html(this.settings.title);
        $("#" + id).find(".body").html(this.settings.body);
        $("#" + id).find(".left").html(this.settings.left.text || "取消");
        $("#" + id).find(".right").html(this.settings.right.text || "确认");

        //绑定左边按钮事件
        $("#" + id).on("click", ".left", function () {
            self.settings.left.onPress && self.settings.left.onPress()
            self.close(id);
        })

        //绑定右边按钮事件
        $("#" + id).on("click", ".right", function () {
            self.settings.right.onPress && self.settings.right.onPress()
            self.close(id);
        })
        return id;
    }

    EAlert.prototype.show = function (obj) {
        this.settings.title = obj.title || "提示";
        this.settings.body = obj.message || "";
        this.settings.left = obj.cancel;
        this.settings.right = obj.ok;
        return this.render();
    }

    EAlert.prototype.close = function (id) {
        $("#" + id).remove();
    }

    $.extend({
        alert: function (params) {
            new EAlert().show(params);
        }
    });


})(window, jQuery)