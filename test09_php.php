 <?php
header("Content-Type: text/html;charset=utf-8");
$link=mysql_connect("169.254.94.239","root","root") or die("数据库服务器连接失败".mysql_error());
if($link){
echo "数据库服务器连接成功<br>";
}
$db=mysql_select_db("db38",$link) or die("数据库连接失败".mysql_error());
if($db){
echo "数据库服务器连接成功<br>";
}
mysql_query("set names 'utf8'");

$sql="select * from t_user where uid between $uname and $pwd ";
$result=mysql_query($sql,$link);

$arr_jh=array();
while($res=mysql_fetch_array($result)){
     $a1=array("userid"=>$res['uid'],"uname"=>$res['uname'],"pwd"=>$res['password']);
     array_push($arr_jh,$a1);
}
//json_encode  对变量进行json格式编码
echo json_encode($arr_jh);
//"[{},{},{}]"
?>
