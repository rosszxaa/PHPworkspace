 <?php
header("Content-Type: text/html;charset=utf-8");
$link=mysql_connect("localhost","root","root") or die("数据库服务器连接失败".mysql_error());
//if($link){echo "数据库服务器连接成功<br>";}
$db=mysql_select_db("db38",$link) or die("数据库连接失败".mysql_error());
mysql_query("set names 'utf8'");
//if($db){echo "数据库服务器连接成功<br>";}
$cpname=$_REQUEST['cp_name'];//不区分接收方式
//$cpname='d';
//echo $cpname;
$sql="select * from cm_cp where cp_name like '%".$cpname."%'";
$result=mysql_query($sql,$link);
//echo $cpname;
$arr_jh=array();
while($res=mysql_fetch_array($result)){

     $a1=array("cp_id"=>$res['cp_id'],"cp_name"=>$res['cp_name'],"cp_model"=>$res['cp_model'],"cp_img"=>$res['cp_img']);
     array_push($arr_jh,$a1);
}
//json_encode  对变量进行json格式编码
echo json_encode($arr_jh);
?>