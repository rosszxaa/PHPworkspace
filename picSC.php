<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>图片上传</title>

</head>
<body>
<?php


//if(!empty($arr_result)){
//   echo "登陆成功";
//  } else{
//   echo '用户名密码错误，登陆失败';
//  }
/*
文件上传
预定义变量：$_FILES
$_FILES[上传文件控件的name值]["name"]:获取上传的文件名 第二个括号内容固定
$_FILES[上传文件控件的name值]["tmp_name"]:获取临时文件名(文件上传时，会在临时目录中创建一个临时文件)
$_FILES[上传文件控件的name值]["type"]:获取上传文件类型 image/jpeg image/bmp image/png image/gif
$_FILES[上传文件控件的name值]["size"]:获取上传文件的大小，单位为字节
*/
$ts="";
$img_name="";
//$f_luruNUM="";
//文件大小字节限制
if(!empty($_FILES)){

//获取上传的文件名
                $f_name = $_FILES["pic"]["name"];
                $f_tmpname =  $_FILES["pic"]["tmp_name"];
//                 echo $f_name;
                $f_type =  $_FILES["pic"]["type"];

                $f_size =  $_FILES["pic"]["size"];
                //文件传输格式
                if($f_type=="image/png"||$f_type=="image/jpeg"||$f_type=="image/bmp"||$f_type=="image/gif"){
                  if($f_size<409600 && $f_size>0){

$link=mysql_connect("localhost","root","root") or die("数据库服务器连接失败".mysql_error());
$db=mysql_select_db("db38",$link) or die("数据库连接失败".mysql_error());
mysql_query("set names 'utf8'");

$sql="select cp_id+1 from cm_cp order by cp_id desc limit 1";
$result=mysql_query($sql,$link);
$arr_result= mysql_fetch_row($result);
$f_luruNUM = $arr_result[0]*100;
//echo $f_luruNUM;
                    $f_luruSTR = ".".substr($f_type,6);//入库字段
                      $img_name="image/".$f_luruNUM.$f_luruSTR;//提取上传文件名及路径,为插入数据库做准备
//                    echo $img_name;
                    move_uploaded_file($f_tmpname,"image/".$f_luruNUM.$f_luruSTR);


                  }else{
                  $ts="文件太大或为空!";
                  }
                }else{
                  $ts="文件格式不正确，只能上传图片!";
                }

//文件上传
//           $_FILES["pic"]["image/jpeg"];
}


?>
<br>
产品名称:      <input type = "text" id = "name"><br><br>
价&nbsp&nbsp格:      <input type = "text" id = "price"><br><br>
介&nbsp&nbsp绍:      <textarea rows = "10" cols="30" id = "content"></textarea><br><br>
<form action="" method="post" enctype="multipart/form-data"> <!--php必须 不可改-->
上传图片:      <input type = "file"  name = "pic">

               <input type = "submit"  value = "上传" id="submit"><br>
               <?php
               //输出提示信息
                if($ts!=""){
                      echo "<div style='color:red'>$ts</div>";
                }
               ?>
               <input type="hidden" value=<?php echo $img_name?> name="scimage">
</form>
<button>添加产品</button>
</body>
</html>