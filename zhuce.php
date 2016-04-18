<?php
//连接数据库
 $a1=$_REQUEST['uname'];
 $a2=$_REQUEST['pwd'];
 $a5=$_REQUEST['pwdcof'];
 $a3=$_REQUEST['email'];
 $a4=$_REQUEST['tel'];


$link=mysql_connect("localhost","root","root");
if($link){
echo "数据库服务器连接成功<br>";
}else{
echo "数据库服务器连接失败";
}

//连接数据库
$db=mysql_select_db("db_computer",$link)or die("数据库连接失败".mysql_error());
if($db){
echo "数据库服务器连接成功<br>";
}
//执行sql
mysql_query("set names 'utf8'");
$sql="insert into t_user(user_name,user_password,user_email,user_tel)values('$a1','$a2','$a3','$a4')";
$result=mysql_query($sql,$link);
if(!empty($result)){
echo "注册成功";

}else{
echo "注册失败";
}

?>
