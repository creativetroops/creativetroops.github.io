Contact={init:function(){var a=$("#name"),t=$("#email"),e=$("#msg");$("#btn-send").on("click",function(n){n.preventDefault(),Contact.validateMsg(a,t,e)})},validateMsg:function(a,t,e){Contact.sendMsg(a,t,e)},sendMsg:function(a,t,e){Contact.validate(a,t,e)?$.ajax({type:"POST",url:"https://formspree.io/diogo@diogocezar.com",data:{name:a.val(),email:t.val(),message:e.val()},success:function(t){console.log(t),$("#form-alerts").empty().html(t),a.focus()}}):$("#form-alerts").empty().html("Ops! Verifique os campos e tente novamente.")},validate:function(a,t,e){var n=!0,o="";(null==a.val()||""==a.val())&&(""==o&&(o=a),n=!1);var l=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;return l.test(t.val())||(""==o&&(o=t),n=!1),(null==e.val()||""==e.val())&&(""==o&&(o=e),n=!1),""!=o&&$(o).focus(),n}},$(document).ready(function(){Contact.init()});