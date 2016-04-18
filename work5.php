<?php
//连接数据库
 $a1=$_GET['username'];
 $a2=$_GET['password'];
 $a3=$_GET['passwordd'];
 $a4=$_GET['email'];
 $a5=$_GET['phone'];

$link=mysql_connect("localhost","root","admin");
if($link){
echo "数据库服务器连接成功<br>";
}else{
echo "数据库服务器连接失败";
}
mysql_query("set names 'utf8'");
//连接数据库
$db=mysql_select_db("db_xm",$link)or die("数据库连接失败".mysql_error());
if($db){
echo "数据库服务器连接成功<br>";
}
//执行sql
$sql="insert into zhuce(username,password,passwordd,email,phone)values ('$a1','$a2','$a3','$a4','$a5')";
$result=mysql_query($sql,$link);
if(!empty($result)){
echo "修改成功";

}else{
echo "修改失败";
}

?>
