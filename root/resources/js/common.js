$(document).ready(function(){
    $('#boxlist').masonry({
        itemSelector:'.item',
        // columnWidth: 317,
        columnWidth: 44,
		percentPosition: true,
        isAnimated: true
    }); 

	$(".item").hover(function(){
		// 로고
		$(this).find(".p_logo img").eq(0).hide();
		$(this).find(".p_logo img").eq(1).show();

		//텍스트-제목
		$(this).find(".box_title p.b_tit").css("color","#c6c6c6")
		// #303030
		//텍스트
		$(this).find(".box_title p.b_txt").css("color","#303030")

		// 박스배경
		 $(this).find(".p_img").eq(0).hide();
		 $(this).find(".p_img").eq(1).show();
		//$(this).find(".p_logo img").attr("src", $(this).find(".p_logo img").attr("src").replace("0.png","1.png"));		
	},function(){
		// 로고
		$(this).find(".p_logo img").eq(1).hide();
		$(this).find(".p_logo img").eq(0).show();
		//텍스트
		$(this).find(".box_title p").css("color","#858585");
		// 박스배경
		$(this).find(".p_img").eq(1).fadeOut(120);
		$(this).find(".p_img").eq(0).fadeIn(10);

	});
	

});