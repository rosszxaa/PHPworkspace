<?php
//连接数据库
 $a1=$_GET['num1'];
 $a2=$_GET['num2'];

$link=mysql_connect("localhost","root","admin");
if($link){
echo "数据库服务器连接成功<br>";
}else{
echo "数据库服务器连接失败";
}
mysql_query("set names 'utf8'");
//连接数据库
$db=mysql_select_db("db38",$link)or die("数据库连接失败".mysql_error());
if($db){
echo "数据库服务器连接成功<br>";
}
//执行sql
$sql="insert into t_user(uname,password)values ('$a1','$a2')";
$result=mysql_query($sql,$link);
if(!empty($result)){
echo "修改成功";

}else{
echo "修改失败";
}

?>
