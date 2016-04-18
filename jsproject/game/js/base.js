/**
 * Created by asus on 2016/3/17.
 */
function fun1(){//推进器回复
    if(progress00.value<1){
    progress00.value+=0.1;}
}
function rod(k){
    var ran= parseInt(Math.random()*k);
    return ran;
}
function isRepeat(arr){
    var hash= {};
    for(var i in arr){
        if(hash[arr[i]]){
            return true;
        }
        //不存在该元素,赋值为true
        hash[arr[i]]= true;
    }
    return false;
}
function fun2(){
    d0="d"+parseInt(rod(5)+1);
    clearTimeout(timer);
    clearTimeout(timer2);
    fun3();
    timer2= setTimeout(fun2,4000);
}
function fun3(){
    if(document.getElementById(d0).offsetTop>-100){
        document.getElementById(d0).style.top = document.getElementById(d0).offsetTop - 50 +"px";
    }else{
        document.getElementById(d0).style.top = 850 +"px";
    }
    timer= setTimeout(fun3,100);
}
function fun4(){
    var v_left = v_div.offsetLeft;//左上+130
    var v_top = v_div.offsetTop;//左上+150

    //document.getElementById("div03").innerText= v_left+" "+v_top;
    for(var i=0;i<arr2.length;i++){
        var dd_left=arr2[i].offsetLeft;//左上+30
        var dd_top= arr2[i].offsetTop;//左上+150
        //document.getElementById("div02").innerText= dd_top+" "+dd_left;
        if((dd_left>v_left-15)&&(dd_left<v_left+165)&&(dd_top>0)&&(dd_top<150)){
            v_div.style.backgroundImage = "url(image/" + v2 + ")";//替换爆炸图片
            k++;
            document.getElementById("div03").innerText=k;
            setTimeout(function(){
                v_div.style.backgroundImage = "url(image/" + v0 + ")";
            },500);
            //arr2[i].style.visibility= "hidden";
            //setTimeout(function(){
            //    arr2[i].style.visibility= "inherit";
            //},500);
        }
    }

}
