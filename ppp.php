<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <title>图片无刷新上传</title>
 <script src="js/jquery-1.8.2.js"></script>
  </head>
  <body>
    <form id="form" enctype="multipart/form-data">
      <input type="text" name="name" id="name" value="" />
      <input type="text" name="model" id="model" value="" />
       <input type="file" name="img" id="img" />
      <input type="submit" name="do" id="do" value="修改" />
    </form>
    <div id = "cool" style="color:red"></div>
    <script>
    $("form").submit(function(e){
      e.preventDefault();
      
      //空对象然后添加
      var fd = new FormData();
      fd.append("name", document.getElementById("name"));
      fd.append("model", document.getElementById("model"));
      fd.append("img", document.getElementById("img"));
      //fd.append("file", $(":file")[0].files[0]); //jQuery 方式
      fd.append("do", "submit");
      
      //通过表单对象创建 FormData
      var fd = new FormData(document.getElementById("form"));
      //var fd = new FormData($("form:eq(0)")[0]); //jquery 方式
      
      $.ajax({
              type:"post",
              url:"scbsx.php",
              data: fd,
              processData: false,
              contentType: false
            }).done(function(res){
            alert(res);
            $("#cool").text(res);
              console.log(res);
            });


    });
    </script>
  </body>
</html>