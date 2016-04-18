<html>
<body>


<?php
$a3=array(array(array('b1','b2'),array('b11','b22'),array('b1','b2')));
//for($v1=0;$v1<count($a3);$v1++){
//  for($v2=0;$v2<count($a3[$v1]);$v2++){
//   for($v3=0;$v3<count($a3[$v1][$v2]);$v3++){
//    echo $a3[$v1][$v2][$v3];
//  }}}

foreach ($a3 as $v1)
  foreach ($v1 as $v2)
  foreach ($v2 as $v3){
  echo $v3;}



?>
<body>
</html>