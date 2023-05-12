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




/** 
* @param	$motion_items        : 모션 들어갈 아이템 선택자
* @param	$add_class           : 추가 삭제될 클래스 
* @param	$show_per            : 시작위치  (0: 보일때, .2: 20% 올라왔을때)
* @param	$pass_b              : 지나갔을때 초기화 여부 (default:false)
* @param	$under_b             : 못미쳤을때 초기화 여부 (default:false)
* @method setTarModi($tarModi) : 가감수치 변경
*/
jQuery.fn.trpScrollActive = function( $add_class, $show_per, $pass_b, $under_b ){
  var _tarGet   = this;
  var _addClass = $add_class;
  var _show_per = $show_per;
  var _scrollTarModi = 0;
  var _pass_b  = ($pass_b)?  $pass_b  : false;
  var _under_b = ($under_b)? $under_b : false;
  function trpScrollActiveFn() { 
    var _wH  = window.innerHeight; 
    var _wS  = $(window).scrollTop();
    var _wHS = (_wH + _wS);
    $(_tarGet).each(function($i) { 			
      var _t  = ($(this).offset().top + _scrollTarModi) +  (_wH * _show_per); 
      var _th = ($(this).offset().top + _scrollTarModi) + $(this).innerHeight(); 
      if (_wS > _th) { 
        if(_pass_b){
          $(this).removeClass(_addClass); 
        }else{
          $(this).addClass(_addClass);
        }      // pass
      } else if (_wHS > _t) { 
        $(this).addClass(_addClass);                       // over
      } else {
        if(_under_b){ $(this).removeClass(_addClass); }    // under
      } 	
    }); 
  }
  $(window).on('scroll resize', trpScrollActiveFn);
  $(window).trigger('scroll resize');
  
  return {
    /* 기준 타겟 위치 가감 수치 변경 */
    setTarModi : function($tarModi){
      _scrollTarModi = $tarModi;
    },
		getStart : function(){
			trpScrollActiveFn();
		}
  }
}