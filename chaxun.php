<meta charset="utf-8">
<?php
$link=mysql_connect("localhost","root","root");
if($link){
echo "数据库服务器连接成功<br>";
}else{
echo "数据库服务器连接失败";
}

$db=mysql_select_db("db38",$link)or die("数据库连接失败".mysql_error());
if($db){
echo "数据库服务器连接成功<br>";
}
mysql_query("set names 'utf8'");
//查询
$sq1="SELECT a.username,b.dep_name,c.zwname FROM yuangong a,t_dep b,t_zw c WHERE a.dep_id=b.dep_id and a.zw_id=c.zw_id";
$result=mysql_query($sq1,$link);
//从数据库返回的结果集中提取数据
while($res=mysql_fetch_array($result)){
    echo $res['dep_name']."".$res['username'].'<br>';
}
?>