<?php
//�������ݿ�
 $a1=$_GET['num1'];
 $a2=$_GET['num2'];

$link=mysql_connect("localhost","root","admin");
if($link){
echo "���ݿ���������ӳɹ�<br>";
}else{
echo "���ݿ����������ʧ��";
}
mysql_query("set names 'utf8'");
//�������ݿ�
$db=mysql_select_db("db38",$link)or die("���ݿ�����ʧ��".mysql_error());
if($db){
echo "���ݿ���������ӳɹ�<br>";
}
//ִ��sql
$sql="insert into t_user(uname,password)values ('$a1','$a2')";
$result=mysql_query($sql,$link);
if(!empty($result)){
echo "�޸ĳɹ�";

}else{
echo "�޸�ʧ��";
}

?>
