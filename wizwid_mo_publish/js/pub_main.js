
// 메인 페이지 스크립트 시작
let mainSwiper = false;
$(document).ready(function(){

	// 메인 페이지 노치 확인
	const locationHref = window.location.href.toString();
	if(locationHref.match('main')){
		$('body').addClass('main').append(`<div class="app_cover"></div>`);
	}

	// 메인 캡쳐
	const refreshBtn = $('.main_capture .capture_tit button');
	refreshBtn.on('click', function(){
	   for(let i=1; i<=2; i++){
		  $(`.main_capture .img_box0${i} li, .main_capture .vimeo_area`).css({opacity:0});
		  (i == 2) ? setTimeout(function(){showcaptureList($(`.main_capture .img_box0${i} li`))},600) : showcaptureList($(`.main_capture .img_box0${i} li`));
	   }
	   setTimeout(function(){showcaptureList($(`.main_capture .vimeo_area`))},300);
	   refreshBtn.css({'transition':'all 0s', 'transform':'rotate(0deg)'});
	   setTimeout(function(){refreshBtn.css({'transition':'all 1s', 'transform':'rotate(360deg)'})},100);
	});
 
	function showcaptureList(el){
	   let captureList = el, time = 100, captureId = [];
	   captureList.each(function(index){
		  let This = $(this);
		  clearTimeout(captureId[index]);
		  This.css({opacity:0});
		  captureId[index] = setTimeout(function(){This.stop().animate({opacity:1}, 300);}, index * time);
	   });
	}

	main_visual_fuction();
	brandSwiper();
	editorialSwiper();

	// main_product_list 이미지 정렬 적용
	// let onImgLoad = function(el, callback){
	// 	el.each(function(){
	// 		(this.complete || $(this).height() > 0) ? callback.apply(this) : $(this).on('load', function(){callback.apply(this);});
	// 	});
	// };

	// onImgLoad($('.main_product_list .img_box img, .product_list02 .img_box02 img'), function(){
	// 	const This = $(this), w = This.get(0).naturalWidth, h = This.get(0).naturalHeight;
	// 	(w == h || w > h ) ? This.css({width:'100%', height:'auto'}) : This.css({width:'auto', height:'100%'});
	// 	console.log(w, h);
	// });
});

$(window).resize(function(){
	mainSwiper = true;
	main_visual_fuction();
});

// 메인 탑 비쥬얼 함수
function main_visual_fuction() {
	// 비쥬얼 높이 구해서 여백주기
	var mv_height = 0;
	var main_header = $('.main_head').height();
	let win = $(window), appCover = $('.app_cover'), mainHead = $('.main_head'), fixMenu = $('.sub_menu01'), chkScroll = 0;

	if(mainSwiper == false){
		// 메인 비쥬얼 롤링배너
		var swiper = new Swiper(".visual_banner", {
			slidesPerView: 1,
			autoHeight: true,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			 },
			//autoHeight:true,
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
			},
		});
		swiperVimeo(swiper);
	}

	mv_height = $('#m_top_visual').height();
	$('#main_contents').css('margin-top', mv_height);
 
	// 스크롤 탑일때 해더 변경
	$(window).scroll(function(){ 
		let winTop = win.scrollTop(), mv = $('.visual_banner'), mvHeight = mv.height(), pos = 10; 

		if(winTop < (mvHeight - 150)){
			let mvOpacity = Math.round(pos - (winTop / mvHeight * pos)) / pos;
			mv.css({opacity:mvOpacity});
		}

		if(winTop > mvHeight){
			appCover.addClass('bg_change');
			setTimeout(function(){chkScroll = winTop},200);
			if(winTop > chkScroll){
				// console.log('down');
				mainHead.addClass('up');
				fixMenu.addClass('up');
			}else{
				// console.log('up');
				mainHead.removeClass('up');
				fixMenu.removeClass('up');
			}
		}else{
			appCover.removeClass('bg_change');
		}
		
		if($(window).scrollTop()){ 
			$('.sub_menu01').addClass('on'); 
		} else { 
			$('.sub_menu01').removeClass('on'); 
		}
		
		// 스크롤 올릴때 해더 로고 및 아이콘 변경
		var headerTop = mv_height * 0.5;
		if($(window).scrollTop() >= headerTop){
			$('.main_head').addClass('on'); 
		} else {
			$('.main_head').removeClass('on');
		}

		// 스크롤 탑에 붙을때 서브 메뉴 고정 & 해더 백그라운드 컬러 변경
		var sectionTop = mv_height - main_header - 40;
		if($(window).scrollTop() >= sectionTop){
			$('.sub_menu01').addClass('fix');
			$('.main_head').addClass('bg_change');
			$('.main_new_in').addClass('top_mg');
		} else {
			$(".sub_menu01").removeClass('fix'); 
			$('.main_head').removeClass('bg_change'); 
			$('.main_new_in').removeClass('top_mg'); 
		}


	});
	
	// 스크롤 매직
	// var controller = new ScrollMagic.Controller(); // 시작 컨트롤
	
	// var main_top_visual = new TimelineMax()
	// 	.from("#m_top_visual", 0, {opacity:1})
	// 	.to("#m_top_visual", 1, {opacity: 0})
		
	// new ScrollMagic.Scene({
	// 		triggerElement: "#wrap",
	// 		triggerHook: "0", // ScrollMagic 시작 시점
	// 		duration: mv_height, //"100%", 이 값이 클 수록 천천히 덮어씀
	// 		offset :0 // 시작 위치
	// 	})
	// .setTween(main_top_visual)
	// //.addIndicators() 
	// .addTo(controller);
};

// New in 슬라이드 배너
var swiper = new Swiper(".new_in_product", {
	slidesPerView: "auto",
	//autoHeight:true,
});
swiperVimeo(swiper);

//베네핏 배너
if($(".main_benefit .swiper-slide").length > 1){
	var swiper = new Swiper(".main_benefit", {
		slidesPerView: 1,
		//autoHeight:true,
		pagination: {
			el: ".swiper-pagination",
			type: "progressbar",
		},
	});
	swiperVimeo(swiper);
}

// 메인 상품 리스트
var swiper = new Swiper(".main_p_list", {
	slidesPerView: "auto",
	//autoHeight:true,
});
swiperVimeo(swiper);

// 메인 믹스매치 타이틀
$(window).scroll(function(){ 
	var mv_height = $(window).height() - 100;
	$('.main_product').each(function(){
		var sectionTop = $(this).offset().top - mv_height;
		if($(window).scrollTop() > sectionTop){
			$(this).find('h3').addClass('on'); 
		} else { 
			$(this).find('h3').removeClass('on'); 
		} 
	});
});

// 룩북  슬라이드 배너
var swiper = new Swiper(".main_lookbook", {
	slidesPerView: "auto",
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	 },
	//autoHeight:true,
	loop: true,
});
swiperVimeo(swiper);

// 펀딩 슬라이드 배너
var swiper = new Swiper(".main_fund_list", {
	slidesPerView: "auto",
	//autoHeight:true,
});
swiperVimeo(swiper);

// 스타일 키워드 배너
var swiper = new Swiper(".main_keyword_list", {
	slidesPerView: "auto",
	//autoHeight:true,
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
});
swiperVimeo(swiper);

// 세일 슬라이드 배너
var swiper = new Swiper(".main_sale_list", {
	slidesPerView: "auto",
	//autoHeight:true,
});
swiperVimeo(swiper);

// 브랜드 슬라이드 배너
// var swiper = new Swiper(".brand_tab", {
//  slidesPerView: "auto",
//  loop: true,
// });
// //브랜드 탭 클릭
// $(".brand_tab .swiper-slide").on("click", function(){
//  var index = $(this).data("swiper-slide-index");
    
//  $(".brand_tab .swiper-slide").removeClass("on");
//  $(this).addClass("on");
    
//  $(".product_list02").hide();
//  $(".product_list02").eq(index).show();
// });
var brandSwiper = function() {
    var swiper = new Swiper(".brand_tab", {
        slidesPerView: "auto",
        // observer: true,
        // observeParents: true,
		// autoplay: {
		// 	delay: 5000,
		//  },

    });
    var swiper02 = new Swiper(".brand_prd_list",{
        loop: true,
        // observer: true,
        // observeParents: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		//autoHeight:true,
    });
    $(".brand_tab .swiper-slide").on("click", function() {
        $(this).addClass("on");
        $(this).siblings().removeClass("on");
        swiper02.slideTo($(this).index()+1,500);
    });
    swiper02.on('slideChange',function(){
        activeTab(swiper02.realIndex)
    });
    function activeTab(index) {
        $(".brand_tab .swiper-slide").removeClass("on");
        $(".brand_tab .swiper-slide").eq(index).addClass("on");
        swiper.slideTo(index);
    }

	swiperVimeo(swiper02);
}



//  픽 슬라이드 배너
var swiper = new Swiper(".main_pick", {
    slidesPerView: "auto",
	//autoHeight:true,
});

swiperVimeo(swiper);

// 픽 맵 클릭 스크립트
$(".map_box").on("click", function(){
	// 픽 클릭시  위치값에따른 말풍선
	var pic_width = $(".main_pick").find(".swiper-slide").width();
	var pos_map = $(this).position().left
	var per_move = - (93 * (pos_map / pic_width) - 3) + "px";
	$(this).find(".notice").css("left", per_move);
	
	$(".map_box").find(".notice").hide();
	$(this).find(".notice").toggle();
	$(".map_box").find(".btn_plus").removeClass("on");
	$(this).find(".btn_plus").toggleClass("on");
});

// 에디토리얼 상품  슬라이드 배너
// var swiper = new Swiper(".editorial_product", {
//  slidesPerView: "auto",
// });
// // 에디토리얼 탭 클릭
// $(".editorial_tab li").on("click", function(){
//  var index = $(this).index();
    
//  $(".editorial_tab li").removeClass("on");
//  $(this).addClass("on");
    
//  $(".editorial_index").hide();
//  $(".editorial_index").eq(index).show();
// });

var editorialSwiper = function() {
    var swiper = new Swiper(".editorial_tab", {
        slidesPerView: "auto",
        spaceBetween: 30,
        observer: true,
        observeParents: true,
    });
    var swiper02 = new Swiper(".editorial_list",{
		slidesPerView: 1,
        loop: true,
        observer: true,
        observeParents: true,
		//autoHeight:true,
    });
    $(".editorial_tab .swiper-slide").on("click", function() {
        $(this).addClass("on");
        $(this).siblings().removeClass("on");
        swiper02.slideTo($(this).index()+1, 500);
    });
    swiper02.on('slideChange',function(){
        activeTab(swiper02.realIndex)
    });
    function activeTab(index) {
        $(".editorial_tab .swiper-slide").removeClass("on");
        $(".editorial_tab .swiper-slide").eq(index).addClass("on");
        swiper.slideTo(index);
    }

	swiperVimeo(swiper02);
}

$('.capture_tit button').on('click',function(){
	$(this).css({'transition':'all 1s', 'transform':'rotate(360deg)'});
});





