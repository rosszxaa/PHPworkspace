<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<?php
$link=mysql_connect("localhost","root","admin");
//if($link){
//echo "数据库服务器连接成功<br>";
//}else{
//echo "数据库服务器连接失败";
//}

$db=mysql_select_db("db38",$link)or die("数据库连接失败".mysql_error());
//if($db){
//echo "数据库服务器连接成功<br>";
//}
mysql_query("set names 'utf8'");
//查询
$sq1="SELECT a.username,b.dep_name,c.zwname,a.gongzi,a.uid FROM yuangong a,t_dep b,t_zw c WHERE a.dep_id=b.dep_id and a.zw_id=c.zw_id";
$result=mysql_query($sq1,$link);
//从数据库返回的结果集中提取数据

?>


  <table >
      <tr>
        <th>员工id</th>
        <th>姓名</th>
        <th>收入</th>
        <th>职业</th>
        <th>部门</th>
      </tr>


  <?php


     while($res=mysql_fetch_array($result)){?>
     <tr>
            <td><?php   echo $res['uid']; ?></td>
            <td><?php   echo $res['username']; ?></td>
            <td><?php   echo $res['gongzi']; ?></td>
             <td><?php   echo $res['dep_name']; ?></td>
              <td><?php   echo $res['zwname']; ?></td>
              </tr>
     <?php }  ?>




      <table>



</body>
</html>