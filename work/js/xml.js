/**
 * Created by asus on 2016/4/11.
 */
/**
 * 约定:
 *    页面Form中所有需要提交的元素需要以下属性
 *      id、name、type
 *      如不属于input类型的对象,需加上type属性
 *      textarea对象的type="textarea"
 *      select对象的type="select"
 * ***********/
/*
   功能:根据Form中各元素及值生成xml文件
   参数:form对象,可以这样写document.getElementById('formId')
   返回:xml的String串
 */
function genXML(form){
    if(form== null)
    return "";
    else{
        var tmpxml= new ActiveXObject("Microsoft.XMLDOM");
        var root= tmpxml.createElement("root");
        tmpxml.appendChild(root);
        //表单元素数组
        var elem= form.elements;
        var kind;
        for(var i=0;i<elem.length;i++){
            //获取类型
            kind= (elem[i].type!=null)?(elem[i].type):(elem[i][0].type);
            var val= trim(elem[i].value);
            if(elem[i].dataType!=null&&(elem[i].dataType.toLowerCase()=="numeric"||elem[i].dataType.toLowerCase()=="plusnumeric"||elem[i].datatype.toLowerCase()=="negativenumeric"||elem[i].dataType.toLowerCase()=="plusinteger")){
                //将数字类型的值去逗号处理
                val= unCommaNumber(val);
            }
            switch (kind){
                case 'checkbox':
                case 'radio':
                    if(elem[i].checked){
                        var node= tmpxml.createElement(elem[i].name);
                        node.text= val;
                        root.appendChild(node);
                    }
                    break;
                case 'select':
                    if(elem[i].multiple){
                        //下拉框多选择
                        for(var j=0;j<elem[i].options.length;j++){
                            if(elem[i].options[j].selected==true){
                                var node= tmpxml.createElement(elem[i].name);
                                var soval= elem[i].options[j].value;
                                node.text= soval;
                                root.appendChild(node);
                            }
                        }
                    }else{
                        //下拉框单选择
                        varnode= tmpxml.createElement(elem[i].name);
                        node.text= val;
                        root.appendChild(node);
                    }
                    break;
                case 'text':
                case 'password':
                case 'hidden':
                    val= val.replace(/'/gm,"''");
                    var node= tmpxml.createElement(elem[i].name);
                    node.text= val;
                    root.appendChild(node);
                    break;
                case 'textarea':
                    val= val.replace(/'/gm,"''");
                    var node= tmpxml.createElement(elem[i].name);
                    node.text= val.replace(/\r\n/gm,'$^p$');//徐江换行符统一替换成另一形式,在Applet中会自动替换回换行
                    root.appendChild(node);
                    break;
                default :
                    break;
            }
        }
        return "<?xml version=\"1.0\" encoding=\"GB2312\"?>"+tmpxml.xml;
    }
}
/**
 *作废
 * 功能:发送消息到后台bean进行处理
 * 参数:bean处理相关事务的bean名字,按约定不在规定包下的需加上包名
 *      form 要提交数据所在的表单
 *      xtd 用来加载返回值的xml对象id
 * 返回:false;
 */
function sendMessage(bean,form,xtd){
    try{
        if(form.sub_flag.value==0){
            var message= genXML(form);
            form.sub_flag.value= 1;
            var rs= ComApplet.send(bean,message);
            //加载到本页面用来显示数据
            if(xtd!= null){
                xtd.loadXML(rs);
                form.sub_flag.value= 0;

            }else{
                if(rs.indexOf("error|*|"!=-1)){
                    rs= rs.substring(8);
                    result_hint(false,rs);
                    form.sub_flag.value= "-1";
                }else{
                    result_hint(true,rs);
                    form.sub_flag.value= 0;
                }
            }
        }
    }catch(x){
        return false;
    }
}
/**
 *范围:回车响应
 * 注意:如果输入框名不是实际查询变量名$name,添加属性transinput="$name"
 * 功能:发送消息到后台(翻译)
 * 参数:bean处理相关事务的bean
 *      s_ref 请求对象(如果由多个条件组成,将输入框的id以&相连成字符串传入即可)
 *      sqlid sql语句的编号
 *      a_ref 被翻译对象的id
 *      reminder 错误提示信息
 * 返回:false;
 */
function translate(bean,s_ref,sqlid,reminder,a_ref){
    if(window.event&&window.event.keyCode==13){
        return translateNew(bean,s_ref,sqlid,reminder,a_ref);
    }
}
function translateNew(bean,s_ref,sqlid,reminder,a_ref){
    try{
        var i_arr;
        var message= "";
        if(!reminder){
            reminder= "";
        }
        if(s_ref.indexOf("|")!=-1){
            var i=0;
            i_arr= new Array();
            //解析输入条件,包括或\与的关系
            var begin= 0;
            var end= 0;
            var pos= 0;
            var i_obj;
            while(pos< s_ref.length){
                if(s_ref.charAt(pos)=='('){
                    message+= " (";
                    end= pos+1;
                    begin= pos +1;
                }else if(s_ref.charAt(pos)==")"){
                    end= pos;
                    var objName= s_ref.subString(begin,end);
                    i_obj= document.all(objName);
                    i_obj.value= i_boj.value.toUpperCase();
                    i_arr[i]= ((i_obj.transinput==null)?objName:(i_obj.transinput));
                    i= i+1;
                    message += ((i_obj.transinput==null)?(i_obj.id):(i_obj.transinput))+"='"+i_obj.value+"'";
                    message+= ")";
                    pos= pos+1;
                    if(pos<s_ref.length){
                        if(s_ref.charAt(pos)=="&")
                        message+= " and ";
                        else if(s_ref.charAt(pos)=='|')
                        message+= " or ";
                    }
                    begin= pos+1;
                }
                else if(s_ref.charAt(pos)=='&'||s_ref.charAt(pos)=='|'){
                    end= pos;
                    var objName= s_ref.substring(begin,end);
                    begin= end + 1;
                    i_obj= document.all(objName);
                    i_obj.value= i_obj.value.toUpperCase();
                    i_arr[i]= ((i_obj.transinput== null)?objName:(i_obj.transinput));
                    i= i+1;
                    message += ((i_obj.transinput== null)?(i_obj.id):(i_obj.transinput))+"='"+i_obj.value+"'";
                    if(s_ref.charAt(pos)=='|'){
                        message+= " and ";
                    }else if(s_ref.charAt(pos)=='|'){
                        message += " or ";
                    }
                }
                pos = pos+1;
            }
            if(begin < s_ref.length){
                var objName= s_ref.substr(begin);
                i_obj= document.all(objName);
                i_obj.value= i_obj.value.toUpperCase();
                i_arr[i]= ((i_obj.transinput== null)?objName:(i_obj.transinput));
                i = i+1;
                message += ((i_obj.transinput== null)?(i_obj.id):(i_obj.transinput))+"="+i_obj.value+"'";
            }
        }else {
            //解析输入条件,全部以&分隔
            i_arr= s_ref.split("&");
            var i_obj;
            for(var i=0;i<i_arr.length;i++){
                i_obj= document.all(i_arr[i]);
                i_obj.value= i_obj.value.toUpperCase();
                i_arr[i]= ((i_obj.transinput== null)?i_arr[i]:(i_obj.transinput));
                message += ((i_obj.transinput== null)?(i_obj.id):(i_obj.transinput))+ "='"+i_obj.value+"' and ";
            }
            message = message.substring(0,message.length-5);//去最后的and
        }
        //输出至applet对象,参数为sqlid+$$+where条件
        var rs= ComApplet.send(bean,sqlid+"$$"+message);
        //加载到本页面用来显示数据
        var tmpxml= new ActiveXObject("Microsoft.XMLDOM");
        tmpxml.async= false;
        tmpxml.loadXML(rs);
        var root= tmpxml.documentElement;
        var elem;
        if(root){
            var node= root.selectSingleNode("//row[@id=1]");
            if(node!=null){
                var floor= node.childNodes;
                for(var i=0;i<floor.length;i++){
                    //根据变量id获取对象
                    elem= eval("document.all."+floor.item(i).nodeName);
                    if(elem){
                        var inflag= flase;
                        for(var j=0;j<i_arr.length;j++){
                            if(elem.id== i_arr[j]){
                                inflag= true;
                                break;
                            }
                        }
                        if(!inflag)
                        elem.value= floor.item(i).text;
                    }
                }
              return "ok";
            }
        }else{
            if(a_ref){
                var a_arr= a_ref.split("&");
                var a_obj;
                for(var j=0;j<a_arr.length;j++){
                    a_obj= document.all(a_arr[j]);
                    a_obj.value= "";
                }
            }
        }
    }catch(x) {
           return reminder;
    }
    return reminder;
}
/**
 *范围:select元素onchange事件响应
 * 注意:如果输入框名不是实际产讯变量名$name,添加属性transinput="$name"
 * 功能:发送消息到后台(翻译)
 * 参数:bean 处理相关事务的bean
 *       s_ref 请求对象(如果由多个条件组成,将输入框的id以&相连成字符串传入即可)
 *       sqlid sql语句的编号
 *       a_ref 被翻译对象的id
 *       reminder 错误提示信息
 * 返回:false
 */
function chg_translate(bean,s_ref,sqlid,reminder,a_ref){
    try{
        //解析输入条件,以&分隔
        var i_arr= s_ref.split("&");
        var message= "";
        var i_obj;
        if(!reminder)
            reminder= "";
        for(var i=0;i<i_arr.length;i++){
            i_obj= document.all(i_arr[i]);
            i_obj.value= i_obj.value.toUpperCase();
            message += ((i_obj.transinput== null)?(i_obj.id):(i_obj.transinput))+"='"+i_obj.value+"' and ";

        }
        message= message.substring(0,message.length-5);
        var rs= ComApplet.send(bean,sqlid+"$$"+message);
        //加载到本页面用来显示数据
        var tmpxml= new ActiveXObject("Microsoft.XMLDOM");
        tmpxml.async= false;
        tmpxml.loadXML(rs);
        var root= tmpxml.documentElement;
        var elem;
        if(root){
            var node= root.selectSingleNode("//row[@id=1]");
            if(node!=null){
                result_hint(true,"");
                var floor= node.childNodes;
                for(var i=0;i<floor.length;i++){
                    //根据变量id获取对象
                    elem= eval("document.all."+floor.item(i).nodeName);
                    if(elem)
                    elem.value= floor.item(i).text;
                }
            }else{
                if(a_ref){
                    var a_arr= a_ref.split("&");
                    var a_obj;
                    for(var j=0;j<a_arr.length;j++){
                        a_obj= document.all(a_arr[j]);
                        a_obj.value= "";
                    }
                }
                result_hint(false,reminder);
            }
        }else{
            result_hint(false,reminder);
        }
    }catch (x){
        result_hint(false,reminder);
    }
}
/**
 * 功能:发送消息到后台(查询,添加,复核)
 * 参数:bean处理相关事务的bean
 *        form 要提交数据所在的表单
 *        xmlmessage 向后台发送消息的xml字符串
 * 返回:false;
 */
function sendOP(bean,form,xmlmessage){
    try{
        if(form.sub_flag.value==0){
            form.sub_flag.value= 1;
            var rs= ComApplet.send(bean,xmlmessage);
            if(rs.indexof("error|*|")!=-1){
                rs= rs.substring(8);
                result_hint(false,rs);
            }else{
                result_hint(true,rs);
            }
            form.sub_flag.value= 0;
        }
    }catch(x){

    }
    return false;
}
/***
 * 功能:根据后台创建的xml文件初始化页面信息
 * 参数:XMLDOM文件页面上的xml对象id
 *      xmlrs 从数据库中获取的xml结果集文件
 * 返回:false;
 */
 function evaluate(XMLDOM){
    XMLDOM.async= false;
    var root= XMLDOM.documentElement;
    if(root!=null){
        //获取变量对象数组中row=1
        var node= root.selectSingleNode("//row[@id=1]");
        if(node!=null){
            //根据变量id获取对象
            elem= eval("document.all."+floor.item(i).nodeName);
            if(elem!= null){
                //判断类型
                kind= (elem.type!= null)?(elem.type):(elem[0].type);
                switch(kind){
                    case 'checkbox':
                    case 'radio':
                        for(var j=0;j<elem.length;j++){
                            if(elem[j].name== floor.item(i).nodeName && elem[j].value== floor.item(i).text)
                               elem[j].checked= "true";
                        }
                        break;
                    case 'select':
                    case 'text':
                    case 'password':
                    case 'textarea':
                    case 'hidden':
                        elem.value= floor.item(i).text;
                        break;
                    default :
                        break;
                }
            }

        }
    }
    return false;
}
//返回合法日期date2与date1之间相隔的天数
function getDayBetweenTwoDate(date1,date2){
    //输出至applet对象,参数为sqlid+$$+where条件
    var rs= ComApplet.send("ComQuery","days_between_twodate$$'"+date1+"'&&'"+date2+"'");
    //加载到本页面用来显示数据
    var tmpxml= new ActiveXObject("Microsoft.XMLDOM");
    tmpxml.async= false;
    tmpxml.loadXML(rs);
    var root= tmpxml.documentElement;
    if(root){
        var node= root.selectSingleNode("//resultday");
        if(node!= null){
            return parseInt(node.text,10);
        }else{
            return 0;
        }
    }else{
        return 0;
    }
}