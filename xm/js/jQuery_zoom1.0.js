jQuery.extend({
    jqzoom:function(simg,bimg){
        $(bimg).hide();
//            var v1=$(".d1").get(0).offsetLeft;
        $(simg).hover(function(){
            //获取小图宽高
            $(bimg).show();
            var s_width= $(this).get(0).offsetWidth;
            var s_height= $(this).get(0).offsetHeight;
            //获取小图的距离父类的偏移量
            var s_left= $(this).get(0).offsetLeft;
            var s_top= $(this).get(0).offsetTop;
            //设置大图的偏移位置
            $(bimg).css({left:s_left+s_width+10,top:s_top});
            //鼠标移动，图形变化
            $(this).mousemove(function(e){
//                    e.pageX;//鼠标当前落点坐标
//                    e.pageY;
                //获取大图的宽高
                var b_width=$(bimg+" img").get(0).offsetWidth;
                var b_height=$(bimg+" img").get(0).offsetHeight;
                //获取大图与小图的缩放比
                var scale_w=Math.round(b_width/s_width);
                var scale_h=Math.round(b_height/s_height);
                //计算滚动位置
                var scroll_y=(e.pageY-s_top)*scale_h+s_top;
                var scroll_x=(e.pageX-s_left)*scale_w+s_left;

                //滚动到指定位置
                $(bimg).get(0).scrollTop=scroll_y;
                $(bimg).get(0).scrollLeft=scroll_x;

            })

        },function(){
            $(bimg).hide();
        })
    }
});
