<?php

$uname=$_REQUEST['uname'];//不区分接收方式
$pwd=$_REQUEST['pwd'];

header("Content-Type: text/html;charset=utf-8");
$link=mysql_connect("localhost","root","root") or die("数据库服务器连接失败".mysql_error());
$db=mysql_select_db("db38",$link) or die("数据库连接失败".mysql_error());
mysql_query("set names 'utf8'");
//查询
// $_GET['username']  //get方式
// $_POST['username']  //post方式
$sql="select * from t_user where uname='$uname'  and password='$pwd'";
$result=mysql_query($sql,$link);
//提取单行数据
$arr_result= mysql_fetch_row($result);
if(!empty($arr_result)){
   echo $uname."用户登陆成功";
  } else{
   echo '用户名密码错误，登陆失败';
  }
?>
