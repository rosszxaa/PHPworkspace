jQuery.extend({
    jqzoom:function(simg,bimg){
        $(bimg).hide();
//            var v1=$(".d1").get(0).offsetLeft;
        $(simg).hover(function(){
            //��ȡСͼ���
            $(bimg).show();
            var s_width= $(this).get(0).offsetWidth;
            var s_height= $(this).get(0).offsetHeight;
            //��ȡСͼ�ľ��븸���ƫ����
            var s_left= $(this).get(0).offsetLeft;
            var s_top= $(this).get(0).offsetTop;
            //���ô�ͼ��ƫ��λ��
            $(bimg).css({left:s_left+s_width+10,top:s_top});
            //����ƶ���ͼ�α仯
            $(this).mousemove(function(e){
//                    e.pageX;//��굱ǰ�������
//                    e.pageY;
                //��ȡ��ͼ�Ŀ��
                var b_width=$(bimg+" img").get(0).offsetWidth;
                var b_height=$(bimg+" img").get(0).offsetHeight;
                //��ȡ��ͼ��Сͼ�����ű�
                var scale_w=Math.round(b_width/s_width);
                var scale_h=Math.round(b_height/s_height);
                //�������λ��
                var scroll_y=(e.pageY-s_top)*scale_h+s_top;
                var scroll_x=(e.pageX-s_left)*scale_w+s_left;

                //������ָ��λ��
                $(bimg).get(0).scrollTop=scroll_y;
                $(bimg).get(0).scrollLeft=scroll_x;

            })

        },function(){
            $(bimg).hide();
        })
    }
});
