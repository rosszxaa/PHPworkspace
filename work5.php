<?php
//�������ݿ�
 $a1=$_GET['username'];
 $a2=$_GET['password'];
 $a3=$_GET['passwordd'];
 $a4=$_GET['email'];
 $a5=$_GET['phone'];

$link=mysql_connect("localhost","root","admin");
if($link){
echo "���ݿ���������ӳɹ�<br>";
}else{
echo "���ݿ����������ʧ��";
}
mysql_query("set names 'utf8'");
//�������ݿ�
$db=mysql_select_db("db_xm",$link)or die("���ݿ�����ʧ��".mysql_error());
if($db){
echo "���ݿ���������ӳɹ�<br>";
}
//ִ��sql
$sql="insert into zhuce(username,password,passwordd,email,phone)values ('$a1','$a2','$a3','$a4','$a5')";
$result=mysql_query($sql,$link);
if(!empty($result)){
echo "�޸ĳɹ�";

}else{
echo "�޸�ʧ��";
}

?>
