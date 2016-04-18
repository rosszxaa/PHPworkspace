/**
 * Created by asus on 2016/3/8.
 */
//原型封装
//        var arr1=[1,2,3,4,5];
//        function mydel(n){
//             arr1.splice(n,1);
//        }
//        mydel(3);
//        alert(arr1);
//       arr1.mydel(3);
Array.prototype.mydel=function(n){
    if(n<this.length){
        this.splice(n,1);
    }else{
        alert("不存在此元素");
    }
}
//原型封装"截取追加"数组方法
Array.prototype.myzj= function(arr1,m,n){
    if(m<arr1.length&&n<arr1.length-m){
        var v0= arr1.splice(m,n);
        this.push(v0);
    }else{
        alert("大娃");
    }

}

