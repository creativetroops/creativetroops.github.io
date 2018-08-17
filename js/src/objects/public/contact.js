Contact = {
    init: function () {
        var name  = $("#name");
        var email = $("#email");
        var msg   = $("#msg");
        $("#btn-send").on("click", function (e) { e.preventDefault(); Contact.validateMsg(name, email, msg) });
    },
    validateMsg: function (name, email, msg) {
        Contact.sendMsg(name, email, msg);
    },
    sendMsg: function (name, email, msg) {
        if (Contact.validate(name, email, msg)) {
            $.ajax({
                type: "POST",
                url: "https://formspree.io/diogo@diogocezar.com",
                data:
				{
				    name: name.val(),
				    email: email.val(),
				    message: msg.val(),
                },
                datatype: 'json',
                success: function (result) {
                    console.log(result);
                    $("#form-alerts").empty().html(result);
                    name.focus();
                },
            });
        }
        else{
            $("#form-alerts").empty().html("Ops! Verifique os campos e tente novamente.");
        }
    },
    validate: function (name, email, msg) {
        var err = true;
        var focus = "";
        if (name.val() == null || name.val() == "") {
            if (focus == "") {
                focus = name;
            }
            err = false;
        }
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email.val())) {
            if (focus == "") {
                focus = email;
            }
            err = false;
        }
        if (msg.val() == null || msg.val() == "") {
            if (focus == "") {
                focus = msg;
            }
            err = false;
        }
        if (focus != "") {
            $(focus).focus();
        }
        return err;
    }
}

$(document).ready(function () {
    Contact.init();
});