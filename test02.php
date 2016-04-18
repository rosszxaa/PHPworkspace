<?php
//执行前端文件
//$_GET 接受前端get方式接受
//       $v1=$_GET['num1'];-
//       $v2=$_GET['num2'];
//        $sum=$v1+$v2;
        //php 字符串连接用"."
//        echo '输出和:'.$sum;
        //练习 输入三角形的三条边 判断是否为三角形 如不是给出提示
        //如是计算三角形周长并输出。
        //(integer)$v1//将变量转换为整形
        //(boolean)$v1//转换为布尔型
         $v1=$_GET['num1'];
         $v2=$_GET['num2'];
         $v3=$_GET['num3'];
         $sum=$v1+$v2+$v3;
        if($v1+$v2>$v3&&$v1-$v2<$v3){
           echo $sum;
        }
        else{
            echo "不是三角形";
        }

?>
