function rem (doc, win) {  
  let docEl = doc.documentElement; //html 考虑以及兼容了 屏幕旋转的事件
  //判断事件orientationchange 横屏 事件  或resize 
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';  
  
  		let recalc = function () {         
  			var clientWidth = docEl.clientWidth;   //获取屏幕大小
  			if (!clientWidth){ return };   //未获取屏幕尺寸        
  			//屏幕大于750
  			if (clientWidth >= 750) {
                 docEl.style.fontSize = '100px';
            } else {
//			            	html的font-size         100* 设备宽度 / 750
                 docEl.style.fontSize = 100*(clientWidth / 403)+ 'px';
            }
      };   
      if (!doc.addEventListener) {return ;}//addEventListener 兼容判断
  
			    win.addEventListener(resizeEvt, recalc, false);               // 屏幕大小以及旋转变化自适应
    doc.addEventListener('DOMContentLoaded', recalc, false);     // 页面初次打开自适应
    recalc();
}
rem(document,window);
//轮播				
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    autoplay:2500
})        
//渲染
$.ajax({
	type:"post",
	url:"https://api.ymduo.com/Interface/recommendlists",
	data:{"pf": 1,"p": 1},
	success:function(res){
//		console.log(res);
		var str='';
		var newstr='';
		$.each(res.result.data, function(index,ele) {
			console.log(ele)
			str='<li goodsId="'+ele.goods_id+'">'
					+'<div class="detail_img">'
						+'<img src="'+ele.image+'" />'
					+'</div>'
					+'<p class="detail_text">'+ele.goods_name+'</p>'
					+'<p class="new_price"><span class="price">￥'+ele.price+'</span></p>'
				    +'<p class="other"><span>月销：<span>'+ele.pay_num+'</span> 笔</span><span>免邮费</span></p>'
				+'</li>'
		$(".detail_ul").append(str);	
		 newstr='<li goodsId="'+ele.goods_id+'">'
						+'<div class="row_ul_img"><img src="'+ele.image+'"/></div>'
						+'<div class="row_ul_t">'
							+'<p class="text">'+ele.goods_name+'</p>'
							+'<p class="price">￥<span>'+ele.price+'</span></p>'
							+'<p class="others">月销<span class="puy_num">'+ele.pay_num+'</span>笔<span>免邮费</span></p>'
						+'</div>'
				+'</li>'
		$(".row_ul").append(newstr);
	});
	
	var flag=true;
		//点击切换
		$(".fei").click(function(){
			if(flag){
				$(".detail>.aa").hide()
				$(".detail>.bb").show()
				flag=false;
			}else{
				$(".detail>.aa").show()
				$(".detail>.bb").hide()
				flag=true;
			}
		})
		
		//点击跳转
		$(".detail_ul li").click(function(){
			var id=$(this).attr("goodsId");
			location.href="detail.html?goodsId="+id;
		})
		
		//点击跳转
		$(".row_ul li").click(function(){
			var id=$(this).attr("goodsId");
			location.href="detail.html?goodsId="+id;
		})
	}
		
});