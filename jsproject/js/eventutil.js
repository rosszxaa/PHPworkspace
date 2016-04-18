/**
 * Created by asus on 2016/3/9.
 */
var EventUtil= {
    //事件对象
    getEvent:function(event){return event || window.event;},
    //事件源
    getSrc:function(event){ return  event.srcElement || event.target;},
    //阻止事件传播
    getStop:function(event){
        if( event.stopPropagation()){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    },
    //阻止默认行为
    getDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            return false;//event.returnvalue=false;
        }
    },
    //element元素,type事件类型,handler执行函数
    addHandle:function(element,type,handler){
        if(element.addEventListener){//支持DOM2事件模型
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){//支持ie事件模型
            element.attachEvent("on"+type,handler);
        }else{
            element['on'+type]= handler;//既可以用.调用也可以用[]
        }
    },
    //移除事件
    removeHandle:function(element,type,handler){
        if(element.removeEventListener){//支持DOM2事件模型
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){//支持ie事件模型
            element.detachEvent("on"+type,handler);
        }else{
            element['on'+type]= null;//既可以用.调用也可以用[]
        }
    }
};