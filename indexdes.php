
<html>
<head>

</head>
<body>

<?php

include"header.html"?>


<?php

if(!empty($_GET['aa'])){

$v1=$_GET['aa'];

switch($v1){

           case 2:include"cc.html";break;
           case 3:include"dd.html";break;
           default:include"zxsp.html";
               break;
         }
}else{
   include"zxsp.html";
 }

         ?>
</body>