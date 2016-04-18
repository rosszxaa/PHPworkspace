/**
 * Created by asus on 2016/4/11.
 */
/**
 *页面表格相关javascript函数
 */
/**
 * 功能:对常数进行值名称翻译显示
 * 要求:页面需存在一个包括值与名称对应的xml,该xml可以通过查询fx_sm_const表获取
 *      以下是一个sample
 *      <XML id='TRANSXML'>
 *      <?xml version='1.0' encoding='GB2312'?>
 *      <rowset>
 *        <row id="1">
 *           <type_code></type_code>
 *           <const_code></const_code>
 *           <const_value></const_value>
 *           <const_memo></const_memo>
 *        </row>
 *      </rowset>
 *      </XML>
 * 参数:xdata document.getElementById("TRANSXML")
 *     typecode 需要翻译的类型
 *     const_code 需要翻译的值
 * 结果:如存在符合条件的const_value段,则将const_value段
 *     的文本作为返回值,否则直接返回const_code
 */
function transdisp(xdata,typecode,constcode){
    if(xdata!=null){
        xdata.setProperty("SelectionLanguage","XPath");
        var root = xdata.documentElement;
        var s = 'row[type_code="'+typecode+'"and const_code="'+constcode+'"]/const_value';
        var node= root.selectSingleNode(s);
        if(node!=null)
            return node.text;
        else
            return constcode;
    }else
        return constcode;

}

/**
 * 功能:根据列定义数组生成页面的表头
 * 要求:
 * 1.页面的表格外框由用户自行编写(注意不要定义table的width属性),在<table>下一行需存在以下定义
 * <thead id='dth'>
 * </thead>
 * 2.表格头部数组定义
 *    该数组为一个2维数组,第1维表示一列,第2维表示该列的相关定义
 *    0)查询字段名:本值将与数据xml中的tag相对应,是依靠本值去取数值,当本列只定义点击事件时,可以为非字段名
 *    1)显示类型:
 *        field 表示本格将显示一个数值列
 *        radio 表示本格将显示一个单选钮
 *        checkbox 表示本格将显示一个复选钮
 *        click 表示本格将定义点击事件,当既是field又需定义click事件时请选择field,但显示类型请选择self
 *    2)数据类型,当显示类型为field时需要定义
 *      string 文本
 *      int    整型
 *      numeric 实数,显示时将会自动加千分号
 *      boolean 布尔型
 *    3)显示名称:在表格头部需显示的文本
 *    4)宽度:本列将要显示的宽度,请按10px方式定义,当所有列的宽度累加超过屏幕时,将会自动向右扩展
 *    5)对齐方式:left,center,right
 *    6)翻译名称:指本列的数值需进行翻译后才显示,格式定义如下:
 *             translateXmlId | type_code 或 type_code
 *             例 "trans|pay_kind"或 "pay_kind"
 *             当无translateXmlId时,将自动默认为ID="transxml"的XML对象(需在页面先行定义)
 *    7)逻辑判断:根据本列逻辑判断规则,当结果为true时表示本行数据为合法数据,以正常方式显示和选择,
 *             当结果为false时表示本行数据为不合格数据,将以红色标注本行,而且如第1列为radio或checkbox时将不可选择
 *             逻辑定义如下:
 *             y  表示本列数据必须存在值,不可为空
 *             #fieldname#相关逻辑表达式 脚本将对本行数据row相对应的xmlnode段查找fieldname,并将此fieldname的xml文本值对#fieldname#进行替换
 *                    当所有#...#被替换后,将组成一个新的判断表达式,再通过eval()来校验此表达式
 *    8)点击触发:定义对本行数据的本列或本行点击时触发相关事件
 *             格式定义:
 *             (row|cell)|eventFunctionName||(string|img|null)|||(文本|imgSrc)
 *             row|cell:表示当前点击是针对行还是当前单元格,在同一张表格中只能定义一种方式
 *             eventFunctionName:定义点击后需触发的事件函数名
 *                           在此函数中需先定义window.event.cancelBubble=true以防止事件递归至父对象
 *                           在此函数张可以通过window.event.srcElement获取点击对象
 *                           当为cell模式时,srcElement.cellIndex表示当前行的第几列,从0计数,然后再通过srcElement.parentElement.rowIndex获取当前第几行,同样从0计数
 *                           当为row模式时,srcElement.rowIndex表示当前第几行,从0计数
 *             self|string|img|null:定义本列的显示类型
 *                           当为self时将采用第0项定义的数据值,string和img则是显示额外文字或图像,row模式时选择null表示本列只定义点击方式并不显示
 *             文本|imgSrc:当上一项为string时显示文本,为img时则显示imgSrc路径的图像,imgSrc不需要引号
 * 3.多行表头数组定义,与显示数据无关
 *    该数组为一个3维数组,第1维显示表头行,第2维表示行中的列,第3维表示列属性
 *    1)列名称
 *    2)列宽度,当colspan不为1时需自行累加,为1时与表格头部数组中定义相同
 *    3)rowspan 占用行数
 *    4)colsapan 占用列数
 * 参数:theadID thead的ID,如无则默认为dth
 *     tcola1 thead的内容定义数组,如无则默认为tcola
 *     tcola2 thead的表头定义数组,如无则表示单行表头
 */
function writeColHead(theadID,tcola1,tcola2){
    var oThead=document.getElementById(theadID==null?'dth':theadID);
    var dha=(tcola1==null?tcola:tcola1);//内容定义数组
    if(oThead!=null&&dha!=null){
        while(oThead.rows.length!=0){
            oThead.deleteRow();
        }
        if(tcola2==null){
            //单行表头
            var dth_row=oThead.insertRow();
            for(var i=0;i<dha.length;i++){
                if(dha[i].length!=9||(dha[i].length==9&&dha[i][8].indexOf("null")==-1)){
                    var dth_cell= dth_row.insertCell();
                    dth_cell.innerText= dha[i][3];
                    dth_cell.className="dispcolhead";
                    dth_cell.style.width=dha[i][4];
                    dth_cell.noWrap=true;
                }
            }
            for(var i=0;i<oThead.parentElement.children.length;i++){
                if(oThead.parentElement.children[i].tagName=="TFOOT"){
                    oThead.parentElement.children[i].rows[0].cells[0].colSpan=dha.length;
                    break;
                }
            }
        }else{
            //多行表头
            for(var m=0;m<tcola2.length;m++){
                var dth_row= dth.insertRow();
                for(var j=0;j<tcola2[m].length;j++){
                    var dth_cell= dth_row.insertCell();
                    dth_cell.innerText=tcola2[m][j][0];
                    dth_cell.className= "dispcolhead";
                    dth_cell.style.width=tcola2[m][j][1];
                    dth_cell.rowSpan= tcola2[m][j][2];
                    dth_cell.colSpan= tcola2[m][j][3];
                    dth_cell.noWrap=true;
                }
            }
        }
    }
}
//radioButton选择变量
var radioButtonSelectedID="";
//radioButton选择事件
function radioButtonOnClick(){
    try{
        if(radioButtonSelectedID!=""&&document.all(radioButtonSelectedID))
            document.all(radioButtonSelectedID).checked=false;
        this.checked=true;
        radioButtonSelectedID= this.id;

    }catch(x){alert(x.message);}
}
function row_mouseover(){
    var o= window.event.srcElement;
    if(o.tagName=="TD")
        o=o.parentElement;
    if(o.tagName=="TR"){
        for(var i=0;i<o.cells.length;i++)
            o.cells[i].className="disprow_onmouseover";
    }
}
function row_mouseout(){
    var o=window.event.srcElement;
    if(o.tarName=="TD")
        o=o.parentElement;
    if(o.tagName=="TR"){
        for(var i=0;i<o.cells.length;i++)
            o.cells[i].className="dispcoldata";
    }

}
/**
 * 功能:大数据量查询根据xml数据生成页面表格
 * 处理:系统先打开一个等待窗口,再调用writeTBody方法,后关闭等待窗口
 * 参数:xdataID   存放数据的xml对象的ID
 *     tbodyID   所需显示的tbody的ID,如无则默认为'dtb'
 *     tcola1Name thead的内容定义数组名字,如无则默认为'tcola'
 */
var WaitDataWindow= null;
var WaitDataTimer = null;
function writeLargeData(xdataID,tbodyID,tcola1Name){
    if(WaitDataTimer==null){
        WaitDataWindow= window.showModelessDialog("/waitData.html","","dialogHeight:10px;dialogWidth:200px;center:yes;edge:raised;help:no;resizable:no;scroll:no;status:no;unadorned:no");
        WaitDataTimer=  setTimeout("writeLargeData('"+xdataID+"','"+(tbodyID==null?'dtb':tbodyID)+"','"+(tcola1Name==null?'tcola':tocola1Name)+"')",300);
    }else{
        clearTimeout(WaitDataTimer);
        writeTBody(document.getElementById(xdataID),tbodyID,eval(tcola1Name));
        WaitDataWindow.close();
    }
}
/**
 * 功能:根据xml数据生成页面表格
 * 要求:数据存放在xml对象中,每一个tag的文本为所需显示的内容
 *      显示页面中需定义booleandispa数组以翻译布尔值的内容
 *      例:var booleandispa= ["否","是"];先false后true
 * 参数:xdata  存放数据的xml对象,通常为document.getElementById('XMLID')
 *     tbodyID 所需显示的tbody的ID,如无则默认为dtb
 *     tcola1  thead的内容定义数组,如无则默认为tcola
 */
function writeTBody(xdata,tbodyID,tcola1){
    radioButtonSelectedID="";
    var oTbody= document.getElementById(tbodyID==null?'dtb':tbodyID);
    var dha= (tcola1==null?tcola:tcola1);
    try{
        if(xdata.documentElement!=null&&oTbody!=null&&dha!=null) {
            //删除原tbody内的数据行
            while (oTbody.rows.length != 0) {
                //删除事件绑定
                for (var i = 0; i < dha.length; i++) {
                    if (dha[i].length == 9 && dha[i][8] != "") {
                        var pattern = dha[i][8].substring(0, dha[i][8].indexOf("|"));
                        var funname = "";
                        if (dha[i][8].indexOf("||") == -1)
                            funname = dha[i][8].substr(dha[i][8].indexOf("|") + 1);
                        else
                            funname = dha[i][8].substring(dha[i][8].indexOf("|") + 1, dha[i][8], indexOf("||"));
                        if (pattern == "row") {
                            oTbody.rows[0].detachEvent("onclick", eval(funname));
                            break;
                        } else {
                            oTbody.rows[0].cells[i].deachEvent("onclick", eval(funname));
                        }
                    }
                }
                //删除行变化事件
                oTbody.rows[0].detachEvent("onmouseover", row_mouseover);
                oTbody.rows[0].detachEvent("onmouseout", row_mouseout);
            }
            xdata.setProperty("SelectionLanguage", "XPath");
            var rowsetXdata = xdata.documentElement.selectSingleNode("//rowset");//查找行数组元素
            if (rowsetXdata) {
                for (var i = 0; i < rowsetXdata.childNodes.length; i++) {
                    var node = rowsetXdata.childNodes[i];
                    var dtb_row = document.createElement("TR");
                    oTbody.appendChild(dtb_row);
                    dtb_row.attachEvent("onmouseover", row_mouseover);
                    dtb_row.attachEvent("onmouseout", row_mouseout);
                    for (var j = 0; j < dha.length; j++) {
                        var dtb_cell = null;
                        //点击事件
                        if (dha[j].length == 9 && dha[j][8] != "") {
                            var pattern = dha[j][8].substring(0, dha[j][8].indexOf("|"));
                            var funname = "";
                            var disptype = "";
                            var dispvalue = "";
                            if (dha[j][8].indexOf("||") == -1) {
                                funname = dha[j][8].substr(dha[j][8].indexOf("|") + 1);
                            } else {
                                funname = dha[j][8].substring(dha[j][8].indexOf("|") + 1, dha[j][8].indexOf("||"));
                                disptype = dha[j][8].substring(dha[j][8].indexOf("||") + 2, dha[j][8].indexOf("|||"));
                                dispvalue = dha[j][8].substr(dha[j][8].indexOf("|||") + 3);
                            }

                            if (pattern == "row") {
                                dtb_row.attachEvent("onclick", eval(funname));
                            } else {
                                dtb_cell = document.createElement("TD");
                                dtb_row.appendChild(dtb_cell);
                                dtb_cell.attachEvent("onclick", eval(funname));
                            }
                            if (disptype != "self" && dtb_cell != null) {
                                dtb_cell.className = "dispcoldata";
                                dtb_cell.style.width = dha[j][4];
                                dtb_cell.style.textAlign = dha[j][5];
                                if (disptype == "string") {
                                    dtb_cell.innerText = dispvalue;
                                    dtb_cell.style.color = 'blue';
                                } else {
                                    if (disptype == "img")
                                        dtb_cell.innerHtml = "<img src='" + dispvalue + "'/>";
                                }
                            } else {
                                if (dha[j].length != 9) {
                                    dtb_cell.noWrap = true;
                                    dtb_cell.className = "dispcoldata";
                                    dtb_cell.style.width = dha[j][4];
                                    dtb_cell.style.textAlign = dha[j][5];
                                    if (dha[j][1].toLowerCase() == "field") {
                                        //数据显示域
                                        var disps = "";//最终显示值
                                        var tmpnode = node.selectSingleNode(dha[j][0]);
                                        if (tmpnode == null) {
                                            disps = "";
                                        } else {
                                            disps = tmpnode.text;
                                            if (dha[j][2].toLowerCase() == "boolean") {
                                                if (disps.toLowerCase() == "false")
                                                    disps = booleandispa[0];
                                                else
                                                    disps = booleandispa[1];
                                            } else {
                                                if (dha[j][2].toLowerCase() == "numeric" || dha[j][2].toLowerCase() == "int") {
                                                    disps = addCommaNumber(disps);
                                                }
                                            }
                                            if (dha[j][6].toLowerCase() != "") {
                                                if (dha[j][6].indexOf("|") == -1)
                                                    disps = transdisp(transxml, dha[j][6], disps);
                                                else
                                                    disps = transdisp(dha[j][6].substring(0, dha[j][6].indexOf("|")), dha[j][6].substr(dha[j][6].indexOf("|") + 1), disps);
                                            }
                                        }
                                        dtb_cell.innerText = disps;
                                        //逻辑判断
                                        if (dha[j][7] != "") {
                                            if (dha[j][7].toLowerCase() == "y" && disps == "") {
                                                //本格不允许空,故如行头
                                                if (dha[0][1].toLowerCase != "field")
                                                    dtb_row.cells[0].childNodes[0].disabled = true;
                                                dtb_row.style.color = "red";
                                            } else {
                                                if (dha[j][7].toLowerCase() != "y") {
                                                    var con = "";
                                                    try {
                                                        con = dha[j][7];
                                                        while (con.indexOf("#") != -1) {
                                                            var spos = con.indexOf("#");
                                                            var epos = con.indexOf("#", spos + 1);
                                                            if (epos == -1)
                                                                throw "不存在配对的#";
                                                            var s = con.substring(spos + 1, epos);
                                                            var nv = node.selectSingleNode(s);
                                                            if (nv != null) {
                                                                var tmpnvs = nv.text;
                                                                tmpnvs = tmpnvs.replace(/'/g, "");
                                                                con = con.replace("#" + s + "#", "'" + tmpnvs + "'");
                                                            } else {
                                                                con = con.replace("#" + s + "#", "'");
                                                            }
                                                        }
                                                        if (!eval(con)) {
                                                            //逻辑为否,表示本行数据不可修改或删除
                                                            if (dha[0][1].toLowerCase() != "field") {
                                                                dtb_row.cells[0].childNodes[0].disabled = true;
                                                                dtb_row.cells[0].childNodes[0].checked = false;
                                                                if (dha[0][1].toLowerCase() == "radio" && radioButtonSeclectedID == dtb_row.cells[0].childNodes[0].id)
                                                                    radioButtonSelectedID = "";
                                                            }
                                                            dtb_row.style.color = "red";
                                                        }
                                                    } catch (error) {
                                                        //出错不进行处理
                                                        alert(error.message);
                                                    }
                                                }
                                            }

                                        }
                                    } else {
                                        //checkbox radio
                                        if (dha[j][1].toLowerCase() == "checkbox") {
                                            var cb = document.createElement("input");
                                            cb.id = "id_checkbox";
                                            cb.type = "checkbox";
                                            cb.value = node.getAttribute("id");
                                            dtb_cell.appendChild(cb);
                                            //node.setAttribute("rowid",i);
                                        } else {
                                            if (dha[j][1].toLowerCase() == "radio") {
                                                var oRadio = document.createElement("input");
                                                oRadio.type = "radio";
                                                oRadio.id = "id_radio_" + i;
                                                oRadio.value = node.getAttribute("id");
                                                oRadio.onclick = radioButtonOnClick;
                                                dtb_cell.appendChild(oRadio);
                                                if (radioButtonSelectedID == "") {
                                                    document.all(oRadio.id).checked = true;
                                                    radioButtonSelectedID = oRadio.id;
                                                }
                                                //node.setAttribute("rowid",i);
                                            }
                                        }

                                    }
                                }
                            }
                        }
                        else {
                            var errorXdata = xdata.documentElement.selectSingleNode("//error");
                            if (errorXdata) {
                                alert(errorXdata.text);
                            }
                        }
                    }
                }
            }
        }}catch(x){
        alert("writebody中出错:"+x.message);
    }
}
/**
 * 功能:当tcola的第1组记录为checkbox或radio时,如选择本行,则返回一个被选择的主键记录xml串
 * 要求:页面需定义colkeya一位数组
 * 参数:xdata    包含数据的xml对象
 */
function getPostKey(xdata,tcola1){
    try{
        var dha=(tcola1==null?tcola:tcola1);
        xdata.setProperty("SelectionLanguage","XPath");
        if(dha[0][1].toLowerCase()=="checkbox"||dha[0][1].toLowerCase()=="radio"){
            var postxml = new ActiveXObject("Microsoft.XMLDOM");
            var root=postxml.createElement("root");
            var selectedCount=0;
            if(dha[0][1].toLowerCase()=="checkbox"){
                var clength=0;
                if(document.all("id_checkbox")&&typeof(document.all("id_checkbox").length)!="undefined"){
                    clength= document.all("id_checkbox").length;
                }else{
                    if(document.all("id_checkbox"))
                        clength=1;
                }
                for(var j=0;j<clength;j++){
                    var ischecked= false;
                    if(clength>1)
                        ischecked= document.all("id_checkbox")[j].checked;
                    else
                        ischecked= document.all("id_checkbox").checked;
                    if(ischecked==true){
                        var row= postxml.createElement("row");
                        for(var i=0;i<colkeya.length;i++){
                            var rootnode= xdata.documentElement;
                            var xpath= "//row[@id=";
                            if(clength>1){
                                xpath += document.all("id_checkbox")[j].value;
                            }else{
                                xpath += document.all("id_checkbox").value;
                            }
                            xpath += "]/"+colkeya[i];//一维数组
                            var node= rootnode.selectSingleNode(xpath);
                            row.appendChild(node.cloneNode(true));
                        }
                        root.appendChild(row);
                        selectedCount ++;
                    }
                }
            }else if(dha[0][1].toLowerCase()=="radio"&&radioButtonSelectedID!=""){
                var row= postxml.createElement("row");
                for(var i=0;i<colkeya.length;i++){
                    var rootnode= xdata.documentElement;
                    var node= rootnode.selectSingleNode("//row[@id="+document.all(radioButtonSelectedID).value+"]/"+colkeya[i]);
                    row.appendChild(node.cloneNode(true));
                }
                root.appendChild(row);
                selectedCount ++;
            }
            postxml.appendChild(root);
            postxml.loadXML("<?xml version='1.0' encoding='GB2312'?>"+postxml.xml);
            if(selectCount==0)
                return null;
            else
                return postxml;
        }
    }catch(x){
        alert(x.message);
    }
}
//通用查询翻页定义
function goFirst(){
    pageQuery(1);
}
function goPrev(){
    var currpage= eval(dtf_currpage.innerText);
    pageQuery(currpage -1);
}
function goNext(){
    var currpage= eval(dtf_currpage.innerText);
    pageQuery(currpage +1);
}
function goLast(){
    var totalpage= eval(dtf_pagetotal.innerText);
    pageQuery(totalpage);
}
/**
 * 功能:按页查询,约定在同一页面内只存在一个table
 * 要求:页面需定义一个查询参数xml对象id='xqp'
 * 参数:pagenum 将要查询的页码
 * */
function pageQuery(pagenum){
    var root= xqp.documentElement;
    if(!root){
        alert("未定义查询XML对象");
        return;
    }
    radioButtonSelectedID="";
    var pagenumNode= root.selectSingleNode("//pagenum");
    pagenumNode.text=""+pagenum;
    var beanNode= root.selectSingleNode("//bean");
    var targetbean= "ComQuery";
    if(beanNode!= null){
        targetbean= beanNode.text;
    }
    var querydata= ComApplet.send(targetbean,xqp.documentElement.xml);
    if(querydata!=""){
        if(querydata.indexOf("error|*|")!=-1){
            alert(querydata);
            return false;
        }
        if(!xtd.loadXML(querydata)){
            alert("传送数据有误:\r"+querydata);
            return false;
        }
        writeTBody(xtd);
        if(document.all("dtf")){
            var pageTotal= (xtd.selectSingleNode("//pageTotal")&&xtd.selectSingleNode("//pageTotal").text?xtd.selectSingleNode("//pageTotal").text:"0");
            var recordTotal= (xtd.selectSingleNode("//recordTotal")&&xtd.selectSingleNode("//recordTotal").text?xtd.selectSigleNode("//recordTotal").text:"0");
            if(eval(recordTotal)!=0){
                document.all("dtf").style.display="";
                document.all.dtf_recordtotal.innerText= recordTotal;
                document.all.dtf_pagetotal.innerText= pageTotal;
                document.all.dtf_currpage.innerText=""+(pagenum==0?1:pagenum);
                if(eval(pageTotal)==1){
                    document.all.dtf_go.style.display="none";
                }else{
                    document.all.dtf_go.style.display="";
                    //gopage初始化
                    if(document.all.dtf_gopage.options.length>=eval(pageTotal)-1){
                        while(document.all.dtf_gopage.options.length>eval(pageTotal)){
                            document.all.dtf_gopage.removeChild(document.all.dtf_gopage.options[document.all.dtf_gopage.options.length-1]);

                        }
                        document.all.dtf_gopage.value=""+pagenum;
                        document.all.dtf_gopage.options[eval(pagenum-1)].selected=true;
                    }else{
                        for(var i= document.all.dtf_gopage.options.length+1;i<=eval(pageTotal);i++){
                            var o= document.createElement("OPTION");
                            o.value=""+i;
                            o.text=""+i;
                            if(i==eval(pagenum)){
                                o.selected=true;
                            }
                            document.all.dtf_gopage.options.add(o);
                            document.all.dtf_gopage.value=""+pagenum;
                        }
                    }
                    if(eval(pageTotal)==eval(pagenum)){
                        //最后一页
                        dtf_gofirst.detachEvent("onclick",goFirst);
                        dtf_goprev.detachEvent("onclick",goPrev);
                        dtf_gonext.detachEvent("onclick",goNext);
                        dtf_golast.detachEvent("onclick",goLast);

                        dtf_gofirst.attachEvent("onclick",goFirst);
                        dtf_goprev.attachEvent("onclick",goPrev);

                        dth_gofirst.style.color="blue";
                        dth_goprev.style.color="blue";
                        dth_gonext.style.color="black";
                        dth_golast.style.color="black";
                    }else{
                        if(eval(pagenum)==1){
                            //第一页
                            dtf_gofirst.detachEvent("onclick",goFirst);
                            dtf_goprev.detachEvent("onclick",goPrev);
                            dtf_gonext.detachEvent("onclick",goNext);
                            dtf_golast.detachEvent("onclick",goLast);

                            dtf_gonext.attachEvent("onclick",goNext);
                            dtf_golast.attachEvent("onclick",goLast);

                            dth_gofirst.style.color="black";
                            dth_goprev.style.color="black";
                            dth_gonext.style.color="blue";
                            dth_golast.style.color="blue";
                        }else{
                            //当中(非首位页)
                            dtf_gofirst.detachEvent("onclick",goFirst);
                            dtf_goprev.detachEvent("onclick",goPrev);
                            dtf_gonext.detachEvent("onclick",goNext);
                            dtf_golast.detachEvent("onclick",goLast);

                            dtf_gofirst.atttachEvent("onclick",goFirst);
                            dtf_goprev.atttachEvent("onclick",goPrev);
                            dtf_gonext.attachEvent("onclick",goNext);
                            dtf_golast.attachEvent("onclick",goLast);

                            dth_gofirst.style.color="blue";
                            dth_goprev.style.color="blue";
                            dth_gonext.style.color="blue";
                            dth_golast.style.color="blue";
                        }
                    }
                }
            }else{
                //无查询数据
                document.all("dtf").style.display="none";
            }
        }
    }
}
//删除表单中的被选中的数据记录应用于checkbox和radio
function deleteRows(dtb,tcola1){
    var o= null;
    var dha=(tcola1==null?tcola:tcola1);
    if(tcola[0][1].toLowerCase()=="radio"&&radioButtonSelectedID!=""){
        var row= document.all(radioButtonSelectedID).parentElement.parentElement;
        o=row;
        radioButtonSelectedID="";
        if(o!=null&&dha!=null){
            //删除事件绑定
            for(var i=0;i<dha.length;i++){
                if(dha[i].length==9&&dha[i][8]!=""){
                    var pattern= dha[i][8].substring(0,dha[i][8].indexOf("|"));
                    var funname= "";
                    if(dha[i][8].indexOf("||")==-1){
                        funname= dha[i][8].substr(dha[i][8].indexOf("|")+1);
                    }else{
                        funname=dha[i][8].substring(dha[i][8].indexOf("|")+1,dha[i][8].indexOf("||"));
                    }
                    if(pattern=="row"){
                        o.detachEvent("onclick",eval(funname));
                        break;
                    }else{
                        o.cells[i].detachEvent("onclick",eval(funname));
                    }
                }
            }
            //删除行变化事件
            o.detachEvent("onmouseover",row_mouseover);
            o.detachEvnet("onmouseout",row_mouseout);
            dtb.removeChild(o);
        }
    }else if(tcola[0][1].toLowerCase()=="checkbox"){
        try{
            var clength=0;
            if(document.all("id_checkbox")&&typeof(document.all("id_checkbox").length)!="undefined"){
                clength=document.all("id_checkbox").length;
            }else{
                if(document.all("id_checkbox")){
                    clength=1;
                }
            }
            for(var j=clength-1;j>0;j--){
                o=null;
                var ischecked= false;
                if(clength>1){
                    if(typeof(document.all("id_checkbox")[j]!="undefined")){
                        ischecked= document.all("id_checkbox")[j].checked;
                    }else{
                        ischecked= document.all("id_checkbox").checked;
                    }
                }else{
                    ischecked= document.all("id_checkbox").checked;
                }
                if(ischecked==true){
                    var cbv= -1;
                    if(clength>1){
                        cbv= document.all("id_checkbox")[j];
                    }else{
                        cbv= document.all("id_checkbox");
                    }
                    o= cbv.parentElement.parentElement;
                }
                if(o!=null&&dha!=null){
                    //删除事件绑定
                    for(var i=0;i<dha.length;i++){
                        if(dha[i].length==9&&dha[i][8]!=""){
                            var pattern= dha[i][8].substring(0,dha[i][8].indexOf("|"));
                            var funname="";
                            if(dha[i][8].indexOf("||")==-1){
                                funname=dha[i][8].substr(dha[i][8].indexOf("|")+1);
                            }else{
                                funname=dha[i][8].substring(dha[i][8].indexOf("|")+1,dha[i][8].indexOf("||"));
                            }
                            if(pattern=="row"){
                                o.detachEvent("onclick",eval(funname));
                                break;
                            }else{
                                o.cells[i].detachEvent("onclick",eval(funname));
                            }
                        }
                    }
                    //删除行变化事件
                    o.detachEvent("onmouseover",row_mouseover);
                    o.detachEvent("onmouseout",row_mouseout);
                    dtb.removeChild(o);
                }
            }
        }catch(x){
            alert(x.message);
        }
    }
}
//替换页面中的一个XML对象的所有xml数据
function replaceXML(xmlid,xmlString){
    try{
        var tmpxml= new ActiveXObject("Microsoft.XMLDOM");
        tmpxml.loadXML(xmlstring);
        var pn= xmlid.documentElement.parentNode;
        var xd= xmlid.documentElement;
        pn.removeChild(xd);
        pn.appendChild(tmpxml.documentElement);
    }catch(x){
        alert(x.message);
    }
}
/***
 * 功能:选择所有的记录
 * 要求:页面需定义一个checkbox框,id为choiceAll,点击该框调用本函数
 */
function selectAll(){
    var clength= 0;
    if(document.all("id_checkbox")&&typeof(document.all("id_checkbox").length)!="undefined"){
        clength= document.all("id_checkbox").length;
    }else{
        if(document.all("id_checkbox")){
            clength=1;
        }
    }
    if(document.all('choiceAll').checked==true){
        if(clength== 1){
            if(document.all("id_checkbox").disabled==false){
                document.all("id_checkbox").checked=true;
            }
        }else{
            for(var j=0;j<clength;j++){
                if(document.all("id_checkbox")[j].disabled==false){
                    document.all("id_checkbox")[j].checked=true;
                }
            }
        }
    }else{
        if(clength== 1){
            document.all("id_checkbox").checked= false;
        }else{
            for(var j=0;j<clength;j++){
                document.all("id_checkbox")[j].checked= false;
            }
        }
    }
}