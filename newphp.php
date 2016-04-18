<?php
//$uname=$_REQUEST['uname'];//不区分接收方式
//$pwd=$_REQUEST['pwd'];
header("Content-Type: text/html;charset=utf-8");
$link=mysql_connect("169.254.94.239","root","root") or die("数据库服务器连接失败".mysql_error());
if($link){echo "数据库服务器连接成功<br>";}
$db=mysql_select_db("db38",$link) or die("数据库连接失败".mysql_error());
mysql_query("set names 'utf8'");
if($db){echo "数据库连接成功<br>";}
$sql="select * from t_user ";
$result=mysql_query($sql,$link);
$arr_jh=array();
while($res=mysql_fetch_array($result)){

     $a1=array("uid"=>$res['uid'],"username"=>$res['username'],"password"=>$res['password']);
     array_push($arr_jh,$a1);
}
//json_encode  对变量进行json格式编码
echo json_encode($arr_jh);
?>