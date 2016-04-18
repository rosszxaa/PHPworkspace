<?php

$time=getdate();
 $time_day=$time['mday'];
 $time_month=$time['mon'];
 if($time_day==1){
   switch($time_month){
     case 4:echo "愚人节快乐";break;
     case 5:echo "劳动节快乐";break;
     case 10:echo "国庆节快乐";break;
   }
 }
 else if($time_day==8 and $time_month==3){
   echo "妇女节快乐";
 }
?>

