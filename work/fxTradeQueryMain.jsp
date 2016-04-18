<%@page contentType="text/html";charset=GB2312%>
<%@page import="com.css.cfets.logic.common.*"%>
<%@page import="com.css.cfets.common.cfg.*"%>
<%
  String path= request.getContextPath();
  String basePath= request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

  String workdate= WorkDate.getDate("ZW");

  String filePath= CFG.getData("reportHome");
  String userName= (String)session.getAttribute("username");
  String currentDate= CFG.getCurrDate("");
  String fileName= userName+ currentDate+".xls";
  String fullFileName= filePath+ fileName;
        %>
    <!DOCTYPE html>
<html>
<head lang="en">
    <base href="<%=basePath%>">
  <meta charset="UTF-8">
  <title>外汇交易数据查询</title>
    <meta http-equiv="" content="">
    <meta http-equiv="" content="">
    <meta http-equiv="" content="">
    <meta http-equiv="" content="">
    <meta http-equiv="" content="">

    <link rel= stylesheet href="" type="">
    <link rel= stylesheet href="" type="">
    <script type= "text/javascript" src="/js/close.js"></script>
    <script type= "text/javascript" src="/js/common.js"></script>
    <script type= "text/javascript" src="/js/xml.js"></script>
    <script type= "text/javascript" src="/js/applet.js"></script>
    <script type= "text/javascript" src="/js/query.js"></script>
    <script type= "text/javascript" src="/js/queryutil.js"></script>
</head>
<body>

</body>
</html>
    <script>
      function exportFxTrade(){
       var flag= checkDate();
       if(flag){
         var where= getWhere();
       //将查询条件
    var export_xml= document.getElementById("xqp");
    var root= export_xml.documentElement;
    var node= root.selectSingleNode("//opmode");
    node.text= "export";
    node= root.selectSingleNode("//where");
    node.text= where;
    var rs= ComApplet.send("ktp.FxTradeQuery",xqp.documentElement.xml);
    var openFile= "<%=fullFileName%>";
    var saveFileName= "<%=currentDate%>"+".xls";
    document.all.openFile.value= openFile;
    document.all.saveFileName.value= saveFileName;
    document.all.down.submit();
    }
    }
    </script>