// 메인 페이지 스크립트 시작
var swiper01, swiper02, swiper03, swiper04, swiper05, swiper06, swiper07, swiper08, swiper09, swiper10, swiper11, swiper12, swiper13;

$(function(){
	brandSwiper();
	swiperEditorial();

	// 메인 비쥬얼 롤링배너
	swiper01 = new Swiper(".visual_banner", {
		slidesPerView: "auto",
		spaceBetween: 12,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		speed: 600,
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			type: "progressbar",
		},
		breakpoints: {
			
			1680: {
			spaceBetween: 16,
			},
			1920: {
			spaceBetween: 20,
			},
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	swiperVimeo(swiper01);

	// New in 슬라이드 배너
	swiper02 = new Swiper(".new_in_product", {
		slidesPerView: 6,
		spaceBetween: 2,
	});
	swiperVimeo(swiper02);

	//베네핏 배너
	swiper03 = new Swiper(".main_benefit", {
		slidesPerView: "auto",
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	swiperVimeo(swiper03);

	// 메인 상품 리스트
	swiper04 = new Swiper(".main_p_list", {
		slidesPerView: "auto",
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	swiperVimeo(swiper04);

	// 메인 믹스매치 슬라이드
	swiper05 = new Swiper(".main_mix_list", {
		slidesPerView: "auto",
		// loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	swiperVimeo(swiper05);

	// 룩북  슬라이드 배너
	swiper06 = new Swiper(".lookbook_img", {
		slidesPerView: 2.5,
		spaceBetween: 60,
		speed : 600,
		centeredSlides: true,
		//autoHeight: true,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	swiperVimeo(swiper06);

	// swiper06.on('slideChange', function () {
	// 	var activeSlide = $(".lookbook_img").find(".swiper-slide-next");
	// 	var index = activeSlide.data("swiper-slide-index");
		
	// 	$(".lookbook_sub_list").hide();
	// 	$(".lookbook_sub_list").eq(index).fadeIn(800);
	// });

	swiper06.on('slideChangeTransitionStart', function () {
		$(".lookbook_sub_list").hide();
		$(".lookbook_sub_list").eq(swiper06.realIndex).fadeIn(800);
		// console.log(swiper06.realIndex);
	 });

	swiper07 = new Swiper(".lookbook_sub_list", {
		slidesPerView: "auto",
		pagination: {
			el: ".swiper-pagination",
			type: "progressbar",
		},
		observer: true,
		observeParents: true,
	});
	swiperVimeo(swiper07);

	// 펀딩 슬라이드 배너
	swiper08 = new Swiper(".main_fund_list", {
		slidesPerView: "auto",
		// loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	swiperVimeo(swiper08);

	// 스타일 키워드 배너
	swiper09 = new Swiper(".keyword_slide", {
		slidesPerView: "auto",
		loop: true,
		speed : 600,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	swiperVimeo(swiper09);

	// 세일 슬라이드 배너
	swiper10 = new Swiper(".main_sale_list", {
		slidesPerView: "auto",
		// loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	swiperVimeo(swiper10);

	//  픽 슬라이드 배너
	swiper11 = new Swiper(".main_pick_list", {
		slidesPerView: 3,
		spaceBetween: 10,
		speed: 600,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	swiperVimeo(swiper11);

	// 브랜드 슬라이드 배너
	function brandSwiper() {
		$(".brand_tab li").eq(0).addClass("on");

		swiper12 = new Swiper(".main_brand_list", {
			slidesPerView: 1,
			spaceBetween: 140,
			speed: 1000,
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			// observer: true,
			// observeParents: true,
		});
		swiperVimeo(swiper12);
		
		$(".brand_tab li").on("click", function(){
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			swiper12.slideTo($(this).index()+1);
		});

		swiper12.on('slideChange',function(){
			activeTab(swiper12.realIndex)
		});

		function activeTab(index) {
			var tabIndex = $(".brand_tab li").eq(index);
			tabIndex.addClass("on");
			tabIndex.siblings().removeClass("on");
		}
	}

	// 에디토리얼
	function swiperEditorial() {
		$(".editorial_tab li").eq(0).addClass("on");
		swiper13 = new Swiper(".main_editorial_slide", {
			slidesPerView: 1,
			//autoHeight:true,
			speed: 1000,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			observer: true,
			observeParents: true,
		});

		swiperVimeo(swiper13);
		
		$(".editorial_tab li").on("click", function(){
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			console.log($(this).index())
			swiper13.slideTo($(this).index()+1);
		});


		swiper13.on('slideChange',function(){
			activeTab(swiper13.realIndex)
		});

		function activeTab(index) {
			var tabIndex = $(".editorial_tab li").eq(index);
			tabIndex.addClass("on");
			tabIndex.siblings().removeClass("on");
		}
	}

	// ------------------------------------------------------------------------------------------- //

	// 메인 캡쳐
	const refreshBtn = $('.main_capture .refresh');
	let captureId = [];
	refreshBtn.on('click', function(){
		let captureList = $('.main_capture .img_box01 li'), time = 100;
		captureList.each(function(index){
			let This = $(this);
			clearTimeout(captureId[index]);
			This.css({opacity:0});
			captureId[index] = setTimeout(function(){This.stop().animate({opacity:1}, 300);}, index * time);
		});
		refreshBtn.removeClass('on');
		setTimeout(function(){refreshBtn.addClass('on')},100);
	});

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

	// 픽 맵 클릭 스크립트
	$(".map_box").on("click", function(){
		// 픽 클릭시  위치값에따른 말풍선
		var pic_width = $(".main_pick").find(".swiper-slide").width();
		var pos_map = $(this).position().left
		var per_move = - (120 * (pos_map / pic_width) - 3) + "px";
		$(this).find(".notice").css("left", per_move);
		
		$(".map_box").find(".notice").hide();
		$(this).find(".notice").toggle();
		$(".map_box").find(".btn_plus").removeClass("on");
		$(this).find(".btn_plus").toggleClass("on");
	});
});



