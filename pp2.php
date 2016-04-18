<?php
$v1=$_GET['n1'];
$v2=$_GET['n2'];
$v3=$v2%100;
$v4=$v2%400;
$v5=$v2%4;

switch($v1){
 case '2':if(($v3!=0 and $v5==0) or $v4==0){
                  echo '28';
             }else{echo'29';}
 break;
 case '4':
 case '6':
 case '9':
 case '11':echo'30';
 break;
 default :echo'31';
  break;
 }


?>