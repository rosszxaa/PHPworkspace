/**
 * Created by asus on 2016/4/11.
 */
/********************************
 * 功能:按页查询,约定在同一个页面内只存在一个table
 * 要求:页面需定义一个查询处理类beanname
 *       页面需定义一个查询参数xml对象id='xqp'
 * 参数:pagenum 将要查询的页码
 ***********************************/
function pageSearch(pagenum){
    if(!beanname){
       alert("未指定查询处理类");
        return;
    }
    var root= xqp.documentElement;
    if(!root){
        alert("未定义查询XML对象");
        return;
    }
    pagenum= (pagenum==null)?0:pagenum;
    var pagenumNode= root.selectSingleNode("//pagenum");
    pagenumNode.text= ""+pagenum;

    var querydata= ComApplet.send(beanname,xqp.documentElement.xml);
    pagenumNode.text= ""+pagenum;

    var querydata= ComApplet.send(beanname,xqp.documentElement.xml);
    if(querydata!=""){
        if(querydata.indexOf()("error|*|")!=-1){
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
            var recordTotal= (xtd.selectSingleNode("//recordTotal")&&xtd.selectSingleNode("//recordTotal").text?xtd.selectSingleNode("recordTotal").text:"0");
            if(eval(recordTotal)!=0){
                document.all("dtf").style.display = "block";
                document.all.dtf_recordtotal.innerText= recordTotal;
                document.all.dtf_pagetotal.innerText= pageTotal;
                document.all.dtf_currpage.innerText= ""+(pagenum==0?1:pagenum);
                if(eval(pageTotal)==1){
                    document.all.dtf_go.style.display= "none";
                }else{
                    document.all.dtf_go.style.display= "block";
                    //gopage初始化
                    if(document.all.dtf_gopage.options.length>=eval(pageTotal)-1){
                        while(document.all.dtf_gopage.options.length>eval(pageTotal)-1){
                            document.all.dtf_gopage.removeChild(document.all.dtf_gopage.options[document.all.dtf_gopage.options.length-1]);

                        }
                        document.all.dtf_gopage.value= ""+pagenum;
                        document.all.dtf_gopage.options[eval(pagenum)-1].selected= true;
                    }else{
                        for(var i= document.all.dtf_gopage.options.length+1;i<=eval(pageTotal);i++){
                            var o= document.createElement("OPTION");
                            o.value=""+i;
                            o.text=""+i;
                            if(i==eval(pagenum)){
                                o.selected= true;
                            }
                            document.all.dtf_gopage.options.add(o);
                            document.all.dtf_gopage.value= ""+pagenum;
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
                document.all("dtf").style.display= "none";
            }
        }
    }
}
//通用查询翻页定义
function goFirstPage(){
    pageSearch(1);
}
function goPrevPage(){
    var currpage= eval(dtf_currpage.innerText);
    pageSearch(currpage -1);
}
function goNextPage(){
    var currpage= eval(dtf_currpage.innerText);
    pageSearch(currpage +1);
}
function goLastPage(){
    var totalpage= eval(dtf_pagetotal.innerText);
    pageSearch(totalpage);
}
