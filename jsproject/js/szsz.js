/**
 * Created by asus on 2016/3/10.
 */
function a(s,lj){//替换图片 数字0-9 图片路径
    var pic= new Array("/c0.gif","/c1.gif","/c2.gif","/c3.gif",
        "/c4.gif","/c5.gif","/c6.gif",
        "/c7.gif","/c8.gif","/c9.gif");
    var ss="";
    for(i=0;i<10;i++){
        if(i== s){
            ss=pic[i];
        }
    }
    ss= lj+ss;
    return ss;

}
function b(s){//个位补位
    if(s<10){
        return s="0"+s;
    }else{
        return s;
    }
}
function adddiv(c1,num1,lj,flag){//毫秒数,显示时间位数,图片路径 是否显示毫秒 hh-mm-ss-'s''s'  8位
    var t=parseInt(c1/1000);//总秒数
    var h=(parseInt((t/3600))%24)||"0";//小时
    var m=(parseInt((t/60))%60)||"0";//分钟
    var s=(t%60)||"0";//秒



    var ms= ((c1%1000).toString());//毫秒
    var h=b(h);
    var m=b(m);
    var s=b(s);

    var sms1= ms.charAt(0);
    var sms2= ms.charAt(1);
    var sms3= ms.charAt(2);
    var s1= s.toString().charAt(0);
    var s2= s.toString().charAt(1);
    var m1= m.toString().charAt(0);
    var m2= m.toString().charAt(1);
    var h1= h.toString().charAt(0);
    var h2= h.toString().charAt(1);
    //时间图片数组
    var arrytime= new Array();
    if(flag){
        arrytime[3]=a(s1,lj);
        arrytime[2]=a(s2,lj);
        arrytime[5]=a(m1,lj);
        arrytime[4]=a(m2,lj);
        arrytime[7]=a(h1,lj);
        arrytime[6]=a(h2,lj);
        arrytime[1]=a(sms1,lj);
        arrytime[0]=a(sms2,lj);
        //var ms3=a(sms3);
    }else{
        arrytime[1]=a(s1,lj);
        arrytime[0]=a(s2,lj);
        arrytime[3]=a(m1,lj);
        arrytime[2]=a(m2,lj);
        arrytime[5]=a(h1,lj);
        arrytime[4]=a(h2,lj);
        num1=num1-2;
    }

    var vv="";
    var k=num1/2-1;
    var kk=new Array();
    for(i=1;i<=k;i++){
        kk[i-1]=2*i-1;
    }
    for(i=0;i<num1;i++){
        var flag=false;
        for(j in kk){
            if(i==kk[j]){
                flag= true;
            }
        }
        if(flag){
            vv+= "<div style='width: 16px;height: 21px;background-color: olive;float: left;background-image:url("+arrytime[num1-1-i]+");'>"+"</div>"+
            "<div style='width:9px;height: 21px;background-color: olive;float: left;background-image:url("+lj+"/colon.gif);'>"+"</div>";
        }else{
            vv+= "<div style='width: 16px;height: 21px;background-color: olive;float: left;background-image:url("+arrytime[num1-1-i]+");'>"+"</div>";
        }
    }
   return vv;
}