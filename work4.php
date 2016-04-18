<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="zhuce.css">
    <script src="jquery-1.11.1.js" type="text/javascript"></script>
    <script src="jquery.validate.min.js" type="text/javascript"></script>
    <script>

var validator1;
$(document).ready(function () {
    validator1 = $("#demoForm").validate({
       
        rules: {
            username: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            password: {
                required: true,
                minlength: 2,
                maxlength: 16
            },
            passwordd: {
                equalTo: "#password"
            },
            email:{
                required:true,
                email:true
            },
            phone:{
                required: true,
                minlength: 11,
                maxlength: 11
            }
        },
        messages: {
            username: {
                required: '请输入用户名',
                minlength: '用户名不能小于2个字符',
                maxlength: '用户名不能超过10个字符',
                remote: '用户名不存在'
            },
            password: {
                required: '请输入密码',
                minlength: '密码不能小于2个字符',
                maxlength: '密码不能超过16个字符'
            },
            passwordd: {
                equalTo: "两次输入密码不一致"
            },
            email:{
                required:"必填",
                email:"E-Mail格式不正确"
            },
            phone:{
                required:"必填",
                minlength: '手机号是11位',
                maxlength: '手机号是11位'
            }

        }


    });

    $("#check").click(function () {
        console.log($("#demoForm").valid() ? "填写正确" : "填写不正确");
    });
});
    </script>
</head>
<body>
<div class="zcbj">
        <div class="zczc">
            <img src="images/zclogo.jpg">
            <div class="zcdl">
                <p>我已经注册，现在就<a href="#">登陆</a></p>
            </div>
        </div>
        <div class="zccontent">

            <form id="demoForm" action="work5.php">



                        <label for="username">用户名</label>
                        <input type="text" id="username" name="username"/><br><br>


                        <label for="password">请设置密码</label>
                        <input type="password" id="password" name="password"/><br><br>



                        <label for="passwordd">请确认密码</label>
                        <input type="password" id="passwordd" name="passwordd"/><br><br>



                        <label for="email">邮箱</label>
                        <input type="email" id="email" name="email"/><br><br>



                        <label for="phone">手机号</label>
                        <input type="text" id="phone" name="phone"/><br><br>



                        <input type="submit" id="zczc" value="注册"/><br><br>


            </form>
            <img src="images/zcsj.jpg">
        </div>
        <div class="zcfoot">
                <div><a href="#">关于我们</a>|<a href="#">联系我们</a>|<a href="#">人才招聘</a>|<a href="#">商家入驻</a>|<a href="#">广告服务</a>|<a href="#">手机京东</a>|<a href="#">友情链接</a>|<a href="#">销售联盟</a>|<a href="#">京东社区</a>|<a href="#">京东公益</a></div>
                <div class="zcfooter">Copyright 2004-2015  京东JD.com 版权所有</div>
            </div>
</div>

</body>
</html>
