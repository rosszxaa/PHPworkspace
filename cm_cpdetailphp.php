<?php
  /*
  文件上传
  预定义变量：$_FILES
  $_FILES[上传文件控件的name值]["name"]:获取上传的文件名 第二个括号内容固定
  $_FILES[上传文件控件的name值]["tmp_name"]:获取临时文件名(文件上传时，会在临时目录中创建一个临时文件)
  $_FILES[上传文件控件的name值]["type"]:获取上传文件类型 image/jpeg image/bmp image/png image/gif
  $_FILES[上传文件控件的name值]["size"]:获取上传文件的大小，单位为字节
  */
   isset( $_REQUEST['do']);
//    var_dump($_REQUEST);
//    var_dump($_FILES);

  $ts="";
  //$f_luruNUM="";
  //文件大小字节限制
  if(!empty($_FILES["cp_img"])){

  //获取上传的文件名
                  $f_name = $_FILES["cp_img"]["name"];
                  $f_tmpname =  $_FILES["cp_img"]["tmp_name"];
//                  echo $f_name;
                  $f_type =  $_FILES["cp_img"]["type"];

                  $f_size =  $_FILES["cp_img"]["size"];
                  //文件传输格式
                 if($f_type=="image/png"||$f_type=="image/jpeg"||$f_type=="image/bmp"||$f_type=="image/gif"){
                                      if($f_size<409600 && $f_size>0){
                                        move_uploaded_file($f_tmpname,"image/".$f_name);
                                      $ts= "image/".$f_name;

                                      }else{
                                      $ts="图片太大或为空!";
                                      }
                                    }else{
                                      $ts="文件格式不正确，只能上传图片!";
                                    }

  }
  else{
 $ts="未上传图片!";
}
echo $ts;

?>