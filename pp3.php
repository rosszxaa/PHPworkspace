<?php

$time=getdate();
 $time_day=$time['mday'];
 $time_month=$time['mon'];
 if($time_day==1){
   switch($time_month){
     case 4:echo "���˽ڿ���";break;
     case 5:echo "�Ͷ��ڿ���";break;
     case 10:echo "����ڿ���";break;
   }
 }
 else if($time_day==8 and $time_month==3){
   echo "��Ů�ڿ���";
 }
?>

