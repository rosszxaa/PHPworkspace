<?php

/*
文件上传
  预定义变量：$_FILES
       $_FILES[上传文件控件的name值][name]  ： 获取上传的文件名
       $_FILES[上传文件控件的name值][tmp_name]  ：获取临时文件名（文件上传时，会在临时目录中创建一个临时文件）
       $_FILES[上传文件控件的name值][type]  :获取上传文件类型   image/jpeg   image/bmp   image/png   image/gif
       $_FILES[上传文件控件的name值][size]  :获取上传文件的大小，单位为字节
*/
//文件类型与大小限制
$ts="";
$img_name="";
if(!empty($_FILES)){
    $f_name=$_FILES["cp_image"]["name"];
    $f_tmpname=$_FILES["cp_image"]["tmp_name"];
    $f_type=$_FILES["cp_image"]["type"];
    $f_size=$_FILES["cp_image"]["size"];
 if( $f_type=="image/png" ||$f_type=="image/jpeg"
  || $f_type=="image/bmp" || $f_type=="image/gif" ) {
    if($f_size<4000000 && $f_size>0){
          //文件上传
          move_uploaded_file($f_tmpname,"image/".$f_name);

          $img_name="cpimages/".$f_name; //提取上传的文件名及其存储路径，为插入数据库做准备
    }else{
       $ts="文件太大或为空，请重新上传！";
    }
}else{
    $ts="文件格式不正确，只能上传图片！";
}
}

//连接数据库
 $a1=$_POST['cp_name'];
 $a2=$_POST['cp_price'];
 $a3=$_POST['cp_content'];

$link=mysql_connect("169.254.94.239","root","root");
//if($link){
//echo "数据库服务器连接成功<br>";
//}else{
//echo "数据库服务器连接失败";
//}
mysql_query("set names 'utf8'");
//连接数据库
$db=mysql_select_db("db_xm",$link)or die("数据库连接失败".mysql_error());
//if($db){
//echo "数据库服务器连接成功<br>";
//}
//执行sql
$sql="insert into t_cp(cp_name,cp_price,cp_content,cp_image)values ('$a1','$a2','$a3','$img_name')";
$result=mysql_query($sql,$link);
if(!empty($result)){
echo "添加成功";

}else{
echo "添加失败";
}

?>