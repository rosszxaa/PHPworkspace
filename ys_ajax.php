<?php

$uname=$_REQUEST['uname'];//不区分接收方式
$pwd=$_REQUEST['pwd'];
$fun= $_REQUEST['fun'];
//echo $fun."(".$uname.")";
header("Content-Type: text/html;charset=utf-8");
$link=mysql_connect("localhost","root","root") or die("数据库服务器连接失败".mysql_error());
$db=mysql_select_db("db38",$link) or die("数据库连接失败".mysql_error());
mysql_query("set names 'utf8'");
//查询
// $_GET['username']  //get方式
// $_POST['username']  //post方式
$sql="select * from t_user where uname= '$uname'  and password='$pwd'";
$result=mysql_query($sql,$link);
$arr_jh=array();
while($res=mysql_fetch_array($result)){

     $a1=array("uid"=>$res['uid'],"uname"=>$res['uname'],"password"=>$res['password']);
     array_push($arr_jh,$a1);
}

   echo $fun."('".json_encode($arr_jh)."')";

?>

