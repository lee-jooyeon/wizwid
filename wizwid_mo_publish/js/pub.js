// 시작

// brand event handle
function brandEventHandle(){
	const win = $(document);
	//win.on('load resize', function(){brandEvent();});
	brandEvent();
	function brandEvent(){
		let layerContent = $('html, body'),
		searchArea = $('.search_area'),
		openTab = $('.brand_tab02'),
		brandWrap = $('.filter_brand'),
		brandList = $('.filter_brand_list'),
		sortChange = brandWrap.find('.sort_box .change_btn'),
		btnsearchDel = searchArea.find('.input_text_del');
	
		if(brandWrap.length > 0){
			$('.fix_title_chk').remove();
			layerContent.append(`<div class="fix_title_chk"> <style>.filter_section .filter_brand .filter_brand_list .list_box .fix_title.on {top:35.5%;}</style></div>`);
			brandScroll();
		
			// btnsearchDel.off('click touchstart').on('click touchstart', function(){
			// 	searchArea.find('input[type="text"]').val('');
			// 	searchArea.focus();
			// 	btnsearchDel.removeClass('on');
			// 	return false;
			// });
		
			sortChange.off('click').on('click',function(){
				let sortBox = $(this).closest('.sort_box');
				sortBox.removeClass('on');
				sortBox.siblings().addClass('on');
				brandScroll();
			});
			
			function brandScroll(){
				let currentSort = brandWrap.find('.sort_box.on'), sortBtn = currentSort.find('li'),
				layerHeight = layerContent.find('header').innerHeight(), itemPt = 40, aniSpeed = 300,
				gab = layerContent.find('.filter_brand').css('padding-top').replace('px', '') / 3, 
				topHeight = (openTab.innerHeight() + layerContent.find('.filter_fix_box').innerHeight() + layerHeight + gab), scrollPos;
				brandList.css({paddingBottom:layerHeight*2});
				brandList.find('h4').wrap(`<div class="fix_title"></div>`);
				win.scrollTop(0);

				sortBtn.off('click').on('click',function(){
					let This = $(this), listItem = brandList.find('.list_box').eq(This.index()), listPos;
					if(listItem.length > 0){
						listItem.siblings().find('.fix_title').removeClass('on');
						listItem.find('.fix_title').addClass('on');
						listItem.find('.fix_title.on').css({top: Math.round(topHeight) - (itemPt + 11)});
						listItem.siblings().css({paddingTop:0});
						listItem.css({paddingTop:itemPt});
						listPos = listItem.offset().top - topHeight;
						layerContent.stop().animate({scrollTop:listPos + (itemPt - 14)}, aniSpeed);
					}
				});
		
				win.off('scroll').on('scroll', function(){
					scrollPos = win.scrollTop();
					brandList.find('.list_box').each(function(){
						let This = $(this), thisPos = This.offset().top - topHeight, thisHeight = This.innerHeight(), 
						sortList = currentSort.find('.list01'), sortWidth = sortBtn.width()*2;
						if (scrollPos > (thisPos - gab) && scrollPos < thisPos + thisHeight) {
							This.siblings().find('.fix_title').removeClass('on');
							This.find('.fix_title').addClass('on');
							This.find('.fix_title.on').css({top: Math.round(topHeight) - (itemPt + 11)});
							This.siblings().css({paddingTop:0});
							This.css({paddingTop:itemPt});
							sortList.stop().animate({scrollLeft:sortWidth*This.index()}, aniSpeed);
						}
					});
				});
			}
		}
	}
}

// promotion event handle
function promotionEventHandle(){
	const win = $(document);
	//win.on('load resize', function(){promotionEvent();});
	promotionEvent();
	function promotionEvent(){
	   const scrollContent = $('html, body'),
	   header = $('header'), el = $('#wrap'),
	   selectWrap = el.find('.select_wrap'),
	   editorWrap = selectWrap.prev(),
	   selectBox = el.find('.select_box'),
	   relativeRrd = el.find('.relative_prd'),
	   commentWrap = el.find('.comment_section');
	
	   let topHeight = header.outerHeight(true), selectHeight = 135,
	   topMargin = Number(editorWrap.css('margin-bottom').replace('px', '')),
	   selectTop = (selectWrap.offset().top - topHeight) - topMargin, 
	   indexNum = 0, chkPos = indexNum, gabNum = 40, gab = indexNum,
	   titleArr = [],
	   commentTop = 0;

 	   if(selectBox.length == 1) {selectHeight = 85;}
	   

	   selectBox.each(function(index){
		  let This = $(this), title = This.find('.option_list li').eq(0).text();
		  This.find('.select_option').text(title);
		  (index == 0) ? This.addClass('depth1') : This.addClass('depth2');
	   });

	   relativeRrd.each(function(){
			let This = $(this), title = This.find('.title'), subTitle = This.find('.sub_title'), selectTitle = This.find('.select_title');
			if(title.length < 1 && selectTitle.length > 0) {title = selectTitle;}
			if(title.length > 0){
				indexNum ++;
				titleArr.push(title.text());
			} 
			This.attr('data-index', indexNum-1);
		});
	
	   selectBox.find('.select_option').off('click').on('click',function(){
		  let This = $(this);
		  This.parent().siblings().removeClass('active');
		  This.parent().toggleClass('active');
	   });
	
	   selectBox.find('.option_list li').off('click').on('click',function(){
		  let This = $(this);
		  This.closest('.select_box').removeClass('active');
		  This.closest('.select_box').find('.select_option').text(This.text());
		  if(This.data('scrollid')){scrollMove(This.data('scrollid').toString());}
	   });
	
	   win.off('scroll').on('scroll', function(){
			let scrollPos = win.scrollTop();
			setTimeout(function(){chkPos = scrollPos},250);
			
			if(scrollPos >= selectTop){
				selectWrap.addClass('fixed');
				(scrollPos < chkPos) ? (header.removeClass('slide_up'), selectWrap.removeClass('slide_up')) : (header.addClass('slide_up'), selectWrap.addClass('slide_up'));
				editorWrap.css({marginBottom:selectHeight});
				gab = gabNum;
			}else{
				selectWrap.removeClass('fixed slide_up');
				editorWrap.css({marginBottom:topMargin});
				(topMargin > 20) ? gab = -(gabNum - 5) : gab = 0;
			}
			
			if(commentWrap.length > 0) {
				commentTop = commentWrap.offset().top - ((topHeight + selectHeight + topMargin * 2) - 45);
				if (scrollPos > commentTop && !selectWrap.hasClass("del_motion")) {
					selectWrap.addClass("del_motion");
				} else if(scrollPos < commentTop && selectWrap.hasClass("del_motion")){
					selectWrap.removeClass("del_motion");
				}
			}
			
		  relativeRrd.each(function(){
			 let This = $(this), thisPos = This.offset().top - (topHeight + selectHeight + topMargin * 2), thisHeight = This.outerHeight(true);
			 if (scrollPos >= thisPos && scrollPos < thisPos + thisHeight) {
				let depth1 = el.find('.select_box.depth1'), 
				depth2 = el.find('.select_box.depth2'), 
				subTitle = This.find('.sub_title'),
				thisIndex = This.attr('data-index');

				depth1.find('.select_option').text(titleArr[thisIndex]);				
				if(depth2.length > 0) {
				   depth2.removeClass('on');
				   depth2.eq(thisIndex).addClass('on');
				   el.find('.select_box.depth2.on').find('.select_option').text(subTitle.text());
				}
			 
				if(depth1.length < 1 && depth2.length > 0) {
				   depth1.find('.select_option').text(subTitle.text());
				}
			 }
		  });
	   });

	   function scrollMove(id){
		  if(!id){return}
		  let scrollPos = win.scrollTop(), idPos = $(`#${id}`).offset().top + gab, chkHeight;
		  (scrollPos > idPos) ? chkHeight = idPos - selectHeight - topHeight - (gab - 5) : chkHeight = idPos - selectHeight - topHeight;
		  scrollContent.stop().animate({scrollTop: chkHeight}, 300);
	   }
	}
 }

//  event Jackpot
function initJackpot(){
	const jackpotBtn = $('.jackpot_btn'), jackpotItem = $('.jackpot_content'), jackpotArr = [1,2,3, 2,3,1, 3,1,2, 2,1,3], max = 3;
	let jakpotObj = '', item = null, srcUrl ='/resources/';
	if(jackpotItem.length < 1){return}
	if(jackpotItem.hasClass('test')){srcUrl ='../../'}
	jackpotItem.closest('#contents').css({paddingBottom:0});
	jackpotItem.append('<ul></ul>');
	for(let i = 0; i < jackpotArr.length; i++){
		let chkItem = '<img'
		if(jackpotArr[i] == 1){chkItem = '<img class="small"'}
		jakpotObj += `<p class="item">${chkItem} src="${srcUrl}images/promotion/event_jackpot_obj${jackpotArr[i]}.png" alt="" /></p>`;
	}

	for(let i = 0; i < max; i++){
		jackpotItem.find('ul').append('<li></li>');
	}

	for(let i = 0; i < max*2; i++){
		item = jackpotItem.find('ul > li');
		item.append(jakpotObj);
		item.eq(i).css({top:`-${2100 - (i*100)}%`});
	}
}

function eventJackpot(){
	const item = $('.jackpot_content ul > li'), chkTtop = [200, 300, 200];
	let jackpotId = null;
	clearTimeout(jackpotId);
	item.each(function(index){$(this).css({'transition': 'top 0s', top:`-${2100 - (index*100)}%`});});
	setTimeout(function(){jackpotRoll();},100);

	function jackpotRoll(){
		item.each(function(index){
			const This = $(this);
			jackpotId = setTimeout(function(){
				This.css({'transition': 'top 3s cubic-bezier(0.8, 0, 0.67, 1.1)', top:`-${chkTtop[index]}%`});
			}, index * 400);
		});
	}
 }

$(document).ready(function(){
	// 입력폼 공통
	inputInit();
	bodyClick();
	initJackpot();
	
	// NEW, SALE, BEST, REVIEW, EVENT 페이지 해더모션 적용
	const locationHref = window.location.href.toString();
	if(locationHref.match('new') || locationHref.match('sale') || locationHref.match('best') || locationHref.match('review') || locationHref.match('event')){
		// console.log('체크탑!!!!!');
		
		let win = $(document), mainHead = $('header.mhead_01, header.mhead_02, header.mhead_03, header.mhead_04'), fixMenu = $('.sub_menu01, .sub_menu02'), chkScroll = 0;

		if(fixMenu.length > 0){mainHead.css({'border-bottom':'none'});}
		win.on('scroll',function(){ 
			let winTop = win.scrollTop(); 

			if(winTop > 0){
				setTimeout(function(){chkScroll = winTop},200);
				if($('.prd_detail_tab').length > 0){return}
				if(winTop > chkScroll){
					// console.log('down');
					mainHead.css({'transition':'margin-top .3s', marginTop:`calc(-45px - env(safe-area-inset-top))`});
					fixMenu.css({'transition':'margin-top .3s', marginTop:`calc(-45px - env(safe-area-inset-top))`});
				}else{
					// console.log('up');
					mainHead.css({'transition':'margin-top .3s', marginTop:`env(safe-area-inset-top)`});
					fixMenu.css({'transition':'margin-top .3s', marginTop:`env(safe-area-inset-top)`});
				}
			}
		});
	}
	
	//컨텐츠 높이 여백 계산
	var header_height = $("header").height();
	var sub_menu_height = $(".sub_menu01").height();
	var total = header_height + sub_menu_height + 40;
	$('#contents').css("margin-top",total);
	
	//푸터 토글
	$("footer .company_box h3").click(function(){
		$(this).parent().toggleClass("on");	
	});
	
	// 팝업 클릭 이벤트
	$('button, a, div').click(function(){
		var targetName = $(this).data("target");
		if(targetName) popup.openPopup(targetName);
	});

	//textarea
	$("textarea").on("focusin focusout", function(event){
		const This = $(this);
		(event.type == 'focusin') ? This.parent().css("border", "solid 1px #000000") : This.parent().css("border", "none");
	});

	$(".btn_top").find("button").on("click", function(){
		$("html, body").stop().animate({scrollTop:0} , 800)
	});

	// 전체 메뉴 -----------------------------------------------------------------------------------------------------
	$("#all_menu .depth_02").find("h3").on("click",function() {
		$(this).parent().siblings().find(".depth_03").slideUp(400);
		$(this).toggleClass("on");
		$(this).parent().find(".depth_03").slideToggle(400);
	});

	// 22.04.29 추가 || if문 추가 > 스크립트를 읽으면서 롤링이 없는 페이지(카테고리 레이어 팝업)에서 스크립트 오류
	if($("#all_menu .brand_tab .swiper-slide").length > 0 || $("#all_menu .item_list .swiper-slide").length > 0) {
		// all_menu brand
		var swiper = new Swiper(".menu_brand .brand_tab", {
			slidesPerView: "auto",
			spaceBetween: 10,
		});
		swiperVimeo(swiper);

		// MOST  POPULAR  ITEMS
		var swiper = new Swiper(".popular_item .item_list", {
			slidesPerView: "auto",
		});
		swiperVimeo(swiper);
	}
	// 전체 메뉴 end -----------------------------------------------------------------------------------------------------
});

// 무빙 타이틀 및 nav 스크롤
let lastScrollPos = 0;
$(window).scroll(function(){ 
	var mv_height = $(window).height() - 100;
	$('.product_section02').each(function(){
		var sectionTop = $(this).offset().top - mv_height;
		if($(window).scrollTop() > sectionTop){
			$(this).find('h3').addClass('on'); 
		} else { 
			$(this).find('h3').removeClass('on'); 
		} 
	});

	//nav 스크롤 추가
	// var	fixNav = $('.fix_navigation').not(".prd_detail_nav"), 
	// 	fixTopBtn = $('.btn_top'),
	var	currentScrollPos = $(window).scrollTop();

	let scrollId;
	clearTimeout(scrollId)
	setTimeout(function(){lastScrollPos = currentScrollPos},200);
	scrollId = setTimeout(scrollEnd(currentScrollPos),200);

	// if (currentScrollPos < 1 || lastScrollPos > currentScrollPos) {
	// 	fixNav.addClass("fix"); fixTopBtn.addClass("fix");}
	// else {fixNav.removeClass("fix"); fixTopBtn.removeClass("fix");}
	// lastScrollPos = currentScrollPos;
});

function scrollEnd(currentScrollPos) {
	const fixNav = $('.fix_navigation').not(".prd_detail_nav"), fixTopBtn = $('.btn_top');

	if($(".fix_navigation.prd_detail_nav").length > 0) {fixTopBtn.addClass("fix");}

	if($(window).scrollTop() >= 600) {
		fixTopBtn.fadeIn('2000');
	} else {fixTopBtn.fadeOut('2000');}

	if (currentScrollPos < 1 || lastScrollPos > currentScrollPos) {
		fixNav.addClass("fix"); fixTopBtn.addClass("fix");}
	else if(!$(".fix_navigation.prd_detail_nav").length) {fixNav.removeClass("fix"); fixTopBtn.removeClass("fix");}
}

function inputInit() {
	$('input').on('click focus propertychange change keyup paste input', function() {
		event.stopPropagation();
		const passwordInput = $(this).siblings().is(".input_pw_view01");
		passwordInput ? $(this).siblings(".input_text_del").addClass('type02') : '';
		passwordInput ? $(this).addClass('password') : '';
		
		$("input").removeClass("on");
		$(this).addClass('on');	
		if($(this).val().length < 1){ // 입력 여부 체크
			$(this).parent().find('.input_text_del').removeClass("on");
		} else {
			$(this).parent().find('.input_text_del').addClass("on");
		}		
	});
	
	// 입력폼 내용 삭제시
	$('.input_text_del').click(function() {
		event.stopPropagation();
		$(this).parent().find('input').val('');
		$(this).parent().find('input').focus();
		$(this).removeClass("on");
	});
	
	// 입력폼 비밀번호 보기&안보기
	$('.input_pw_view01').click(function() {
		event.stopPropagation();
		$(this).toggleClass('view');
		if( $(this).hasClass('view') == true ){
			$(this).parent().find('input').prop("type", "text");
		} else {
			$(this).parent().find('input').prop("type", "password");
		}
	});
}

// 입력폼 영역 벗어날시
function bodyClick() {
	$('body').click(function() {
		$("input").removeClass("on");
		// $(".input_text_del").removeClass("on");
		// $(".input_pw_view01").removeClass('move');

		var option_layer = $(".option_area").find(".option_layer");
		option_layer.hide();
	});
};

//팝업 함수 || 22.04.14 추가
var popup = {
	openPopup: function(targetName) {
		var layerName = "#" + targetName;
		$("body").find(layerName).addClass("on");
		$("html").addClass("pop_open");

		//닫기버튼
		$(layerName).find("div").click(function(){
			event.stopPropagation();

			if($(this).hasClass("close") || $(this).hasClass("close_pop")) {
				$("body").find(layerName).removeClass("on");
				$("html").removeClass("pop_open");
			}

			let changeOption = $('.change_option');
			if(changeOption.length > 0){
				changeOption.find(".select_box").removeClass('on');
				changeOption.find(".select_box").off('click').on("click", function(){
					const This = $(this);
					This.toggleClass("on");
					This.parent().find(".sub_option_box").toggle();
				});
				changeOption.find(".sub_option_box button").off('click').on("click", function(){
					$(this).closest(".select_box").removeClass("on");
					$(this).closest(".sub_option_box").hide();
				});
			}
		})

		$(layerName).find("button").click(function(){
			event.stopPropagation();
			if(($(this).hasClass("btn_gray01") && !$(this).hasClass("reset") || $(this).hasClass("btn_black01")) && $(this).prop("id") == '') {
				$("body").find(layerName).removeClass("on");
				$("html").removeClass("pop_open");
			}
		})

		bodyClick();
		inputInit();
	},

	closePopup: function(targetName) {
		var layerName = "#" + targetName;
		
		$("body").find(layerName).removeClass("on");
		$("html").removeClass("pop_open");
	},

	callBackPop: function(targetBtn,targetName,callback) {
		var layerName = "#" + targetName;

		$(`${layerName} #${targetBtn}`).unbind();

		$(`${layerName} #${targetBtn}`).click(function() {

			if(callback) {
				callback();
			}
		});
	}
}

// 페이지 스크립트
var sub = {
	// 전체 동의하기
	agree_check_all: function(){
		// 전체 선택일때
		$(".agree_check .all input").click(function() {
			if($(this).is(":checked")){
				$(".agree_check").find("input").prop("checked", true);
				$(".member .btn_area").find("button").addClass("on");
				$(".member .btn_area").find("button").removeClass("dim");
			} else {
				$(".agree_check").find("input").prop("checked", false);
				$(".member .btn_area").find("button").removeClass("on");
				$(".member .btn_area").find("button").addClass("dim");
			}
		});
		
		// 마케팅 선택일때
		$(".marketing > span > input").click(function() {
			if($(this).is(":checked")){
				 $(".marketing .sub_list").find("input").prop("checked", true);
			} else {
				 $(".marketing .sub_list").find("input").prop("checked", false);
			}
		});
		
		// 마케팅 개별 선택일때
		$(".marketing .sub_list").find("input").click(function() {
			var total2 = $(".marketing .sub_list").find("input").length;
			var checked2 = $(".marketing .sub_list").find("input:checked").length;
			
			if(total2 != checked2) {
				$(".marketing > span > input").prop("checked", false);
			} else {
				$(".marketing > span > input").prop("checked", true);
			}
		});
		
		// 개별 선택일때
		$(".agree_check ul").find("input").click(function() {
			var total = $(".agree_check ul").find("input").length;
			var checked = $(".agree_check ul").find("input:checked").length;
			var not_marketing1 = $(".required").length;
			var not_marketing2 = $(".required").find("input:checked").length;
			
			if(total != checked) {
				$("#chack_all").prop("checked", false);
				if(not_marketing1 != not_marketing2) {
					$(".member .btn_area").find("button").removeClass("on");
				} else {
					$(".member .btn_area").find("button").addClass("on");
					$(".member .btn_area").find("button").removeClass("dim");
				}
			} else {
				$("#chack_all").prop("checked", true);
				$(".member .btn_area").find("button").addClass("on");
				$(".member .btn_area").find("button").removeClass("dim");
			}
		});
	},
	
	// 토글 이벤트 start ---------------------------------------------------------------------	
	toggle_list: function( ) {
		$(".toggle_list h4").click(function() {
			$(".toggle_list h4").not($(this)).parent().removeClass("view");
			$(this).parent().toggleClass("view");
		});
	},
	// 토글 이벤트 start ---------------------------------------------------------------------	
	
	
	// 롤링 배너 영역 start ---------------------------------------------------------------------   
	rolling_event: function(){
		// 상품 롤링
		// 22.04.18 (img_rolling_tab03) 추가
		// 22.04.28 (main_sale_list) 추가
		var swiper = new Swiper(".section_p_list, .section_p_list2, .img_rolling_tab03, .date_deal_section, .main_sale_list",  {
		   slidesPerView: "auto",
		});
		swiperVimeo(swiper);
	 },
	
	img_rolling_tab: function(){
		// 이미지 탭 롤링
	// 	var swiper = new Swiper(".img_rolling_tab01", {
	// 	  	slidesPerView: "auto",
	// 		// loop: true,
	// 	});

	// 	var swiper02 = new Swiper(".img_rolling_tab01", {
	// 		slidesPerView: "auto",
	// 	  // loop: true,
	//   });

		var swiper = new Swiper(".img_rolling_tab01", {
			slidesPerView: "auto",
			observer: true,
			observeParents: true,
		});
		var swiper02 = new Swiper(".product_list02",{
			loop: true,
			observer: true,
			observeParents: true,
		});
		$(".img_rolling_tab01 .swiper-slide").on("click", function() {
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			swiper02.slideTo($(this).index()+1,500);
		});
		swiper02.on('slideChange',function(){
			activeTab(swiper02.realIndex)
		});
		function activeTab(index) {
			$(".img_rolling_tab01 .swiper-slide").removeClass("on");
			$(".img_rolling_tab01 .swiper-slide").eq(index).addClass("on");
			swiper.slideTo(index);
		}

		swiperVimeo(swiper02);
	},
	
	img_rolling_tab02: function(){
		// 이미지 탭 롤링
		var swiper = new Swiper(".img_rolling_tab02", {
			slidesPerView: "auto",
		});
		swiperVimeo(swiper);
	},
	
	rolling_rank: function(){
		// 랭크 롤링
		var swiper = new Swiper(".product_rank", {
			slidesPerView: "auto",
			spaceBetween: 0,
		});
		swiperVimeo(swiper);
	},
	
	rolling_top_visual: function(){
		// // 상단 비쥬얼 롤링
		if($(".swiper_num").not(".pop_visual").length > 0 || $(".editorial_visual01").length > 0) {
			var swiper = new Swiper(".swiper_num, .editorial_visual01", {
				slidesPerView: 1,
				spaceBetween: 0,
				pagination: {
					el: ".swiper-pagination",
					type: "fraction",
				},
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				loop: true,
			});
			swiperVimeo(swiper);
		}

		if($(".brand_lookbook").length > 0 || $(".promo_visual").length > 0) {
			var swiper02 = new Swiper(".brand_lookbook, .promo_visual", {
				slidesPerView: 1,
				spaceBetween: 0,
				pagination: {
					el: ".swiper-pagination",
					type: "fraction",
				},
				loop: true,
			});
			swiperVimeo(swiper02);
		} 

		if($(".swiper_num.pop_visual").length > 0 && $(".swiper_num.pop_visual").find(".swiper-slide").length > 1) {
			var swiper03 = new Swiper(".swiper_num.pop_visual", {
				slidesPerView: 1,
				spaceBetween: 0,
				pagination: {
					el: ".swiper-pagination",
					type: "fraction",
				},
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				loop: true,
			});
		}
	},
	
	swiper_normal: function(){
		// 랭크 롤링
		var swiper = new Swiper(".swiper_normal01", {
		  	slidesPerView: "auto",
		  	spaceBetween: 5,
		});
		swiperVimeo(swiper);
	},

	swiper_arrow: function(){
		// 화살표 롤링 || 22.04.18 추가
		var swiper = new Swiper(".swiper_arrow", {
			slidesPerView: "auto",
			spaceBetween: 15,
			autoHeight: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			observer: true,
  			observeParents: true,
		});
		swiperVimeo(swiper);
	},

	swiper_loop: function() {
		// 루프 롤링 || 22.04.18 추가
		if($(".swiper_loop .swiper-slide").length > 1){//슬라이드의 개수가 1개일 경우
			var swiper = new Swiper(".swiper_loop", {
				slidesPerView: "auto",
				loop: true,
			});
			swiperVimeo(swiper);
		}
	},

	swiper_pagenation: function() {
		// 페이징 롤링 || 22.04.19 추가
		var swiper = new Swiper(".swiper_pagenation", {
			slidesPerView: "auto",
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
			},
		});
		swiperVimeo(swiper);
	},

	swiper_banner: function() {
		//배너 롤링
		if($(".banner_section .swiper-slide").length > 1){
			var swiper = new Swiper(".banner_section", {
				slidesPerView: 1,
				pagination: {
					el: ".swiper-pagination",
					type: "progressbar",
				},
			});
			swiperVimeo(swiper);
		}
	},

	swiper_pop_banner: function() {
		//배너 롤링
		var swiper = new Swiper(".pop_top_visual", {
			slidesPerView: 1,
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
			},
		});
		swiperVimeo(swiper);
	},

	swiper_auto: function() {
		//자동 롤링
		var swiper = new Swiper(".swiper_auto", {
		   slidesPerView: 1,
		   spaceBetween: 0,
		   loop: true,
		   pagination: {
			  el: ".swiper-pagination",
			  type: "fraction",
		   },
		   autoplay: {
			  delay: 5000,
		   },
		});
		swiperVimeo(swiper);
	 },

	top_global_visual01: function(){
	// 상단 비쥬얼 롤링
		var swiper = new Swiper(".top_global_visual01", {
			slidesPerView: "auto",
			//centeredSlides: true,
			spaceBetween: -50,
			speed : 1000,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			pagination: {
				el: ".swiper-pagination",
				type: "fraction",
			},
			observer: true,
			observeParents: true,
		});
		swiperVimeo(swiper);

		swiper.on('slideChangeTransitionStart', function () {
			var activeSlide = $(".top_global_visual01").find(".swiper-slide-next");
			// var index = activeSlide.data("swiper-slide-index");
			var index = swiper.realIndex;
			var colorBG = $(".top_global_visual01").find(".swiper_mach li");

			// console.log(index);

			colorBG.removeClass("on")
			colorBG.eq(index).addClass("on")
		});
	},


	// 롤링 배너 영역 end ---------------------------------------------------------------------
	
	// 탭 클릭 영역 start ---------------------------------------------------------------------
	// img_tab_click: function(){
	// 	// 이미지 탭 클릭
	// 	$(".img_rolling_tab01 .swiper-slide").on("click", function(){
	// 		var index = $(this).data("swiper-slide-index");
			
	// 		$(".img_rolling_tab01 .swiper-slide").removeClass("on");
	// 		$(this).addClass("on");
			
	// 		$(".product_list02").hide();
	// 		$(".product_list02").eq(index).show();
	// 	});
	// },
	
	text_tab_click01: function(){
		// 텍스트 탭 클릭01
		$(".text_rolling_tab01 li").on("click", function(){
			var index = $(this).index();
			
			$(".text_rolling_tab01  li").removeClass("on");
			$(this).addClass("on");
			
			$(".text_rolling_tab01").parent().find(".product_list01").hide();
			$(".text_rolling_tab01").parent().find(".product_list01").eq(index).show();
		});
	},
	
	text_tab_click02: function(){
		// 텍스트 탭 클릭02
		$(".text_rolling_tab02 li").on("click", function(){
			$(".text_rolling_tab02 li").removeClass("on");
			$(this).addClass("on");
		});
	},
	
	sub_menu_click: function() {
		// 서브 메뉴 클릭
		$(".sub_menu02 li").on("click", function(){
			$(".sub_menu02 li").removeClass("on");
			$(this).addClass("on");
		});
	},
	// 탭 클릭 영역 end ---------------------------------------------------------------------
	
	// 상품 상세 start ---------------------------------------------------------------------	
	prd_detail_function: function(){

		$(function(){

			let detailVisual;
			$('.prd_detail_visual .swiper-slide').each(function(){  
				let This = $(this);
				if(This.find('>.img_box img').length > 0){
					detailVisual = This.find('img:first-child');
					return false;
				}
			});

			let onImgLoad = function(el, callback){
				el.each(function(){
					(this.complete || $(this).height() > 0) ? callback.apply(this) : $(this).on('load', function(){callback.apply(this);});
				});
			};

			onImgLoad(detailVisual, function(){
				console.log('vimeo_img loaded');
				prd_detail_visual_fuction();
				$(window).scrollTop(0);
			});

			sub.prd_review_event();
			
			$("header.mhead_01").addClass("header_scroll");
			//상세,리뷰,문의 탭 상단 고정
			$(window).scroll(function(){ 
				var currentScrollTop = 0,
					nextScrollTop = 0,
					headerWrap = $('header.mhead_01'),
				currentScrollTop = $(window).scrollTop();
					
				if (currentScrollTop == 0) headerWrap.addClass('header_scroll');
				else {headerWrap.removeClass('header_scroll');}
				nextScrollTop = currentScrollTop;
	
				// 상세 상단 고정
				var prd_sectionTop1 = $(".prd_detail_section02").offset().top - 85; 
				if($(window).scrollTop() > prd_sectionTop1){
					$(".prd_detail_tab").addClass('fix');
					$(".prd_detail_tab").find("li:eq(0)").addClass("on");
				} else { 
					$(".prd_detail_tab").removeClass('fix'); 
					$(".prd_detail_tab").find("li:eq(0)").removeClass("on");
				} 
				
				// 리뷰일때 on 변경
				var prd_sectionTop2 = $(".prd_detail_section03").offset().top - 55; 
				if($(window).scrollTop() > prd_sectionTop2){
					$(".prd_detail_tab").find("li").removeClass("on");
					$(".prd_detail_tab").find("li:eq(1)").addClass("on"); 
				} else { 
					$(".prd_detail_tab").find("li:eq(1)").removeClass("on");
				} 
				
				// 문의일때 on 변경
				var prd_sectionTop3 = $(".prd_detail_section04").offset().top - 55; 
				if($(window).scrollTop() > prd_sectionTop3){
					$(".prd_detail_tab").find("li").removeClass("on");
					$(".prd_detail_tab").find("li:eq(2)").addClass("on"); 
				} else { 
					$(".prd_detail_tab").find("li:eq(2)").removeClass("on");
				}
			});
			
			//상세,리뷰,문의 탭 상단 클릭 위치 이동
			$('.prd_detail_tab li').click(function(){
				var index01 = $(this).index() + 1;
				var offset = $(".prd_detail_section0" + (index01 + 1)).offset();
				
				
				for(var i = 1; i < 4; i++) {
					if(index01 == i ){
						$('html, body').animate({scrollTop : offset.top - 53}, 200);
					} 
				}
			});
			
			$(window).resize(function(){
				prd_detail_visual_fuction();
			});
			
			// 상품 메인 탑 비쥬얼 함수
			function prd_detail_visual_fuction() {
				const win = $(window);
				var mv_height = 0;
		
				// 메인 비쥬얼 롤링배너
				if($(".prd_detail_visual").find(".swiper-slide").length > 1) {
					var swiper = new Swiper(".prd_detail_visual", {
						slidesPerView: 1,
						//autoHeight:true,
						loop: true,
						pagination: {
							el: ".swiper-pagination",
							type: "progressbar",
						},
					});
					swiperVimeo(swiper);
				}
				
				// 비쥬얼 높이 구해서 여백주기
				mv_height = $('.prd_detail_visual').height();
				$('#contents_detail').css('margin-top', mv_height);
				
				// 스크롤 탑일때 해더 변경
				win.scroll(function(){ 
					let winTop = win.scrollTop(), mv = $('.prd_detail_visual'), mvHeight = mv.height(), pos = 10; 
	
					if(winTop < (mvHeight - 150)){
						let mvOpacity = Math.round(pos - (winTop / mvHeight * pos)) / pos;
						mv.css({opacity:mvOpacity});
					}
					
					if(win.scrollTop()){ 
						$('.main_head').addClass('on'); 
						$('.sub_menu01').addClass('on'); 
					} else { 
						$('.main_head').removeClass('on'); 
						$('.sub_menu01').removeClass('on'); 
					}
					
					// 스크롤 탑에 붙을때 서브 메뉴 고정
					var sectionTop = mv_height - 45;
					if(win.scrollTop() >= sectionTop){
						$('.sub_menu01').addClass('fix'); 
					} else {
						$(".sub_menu01").removeClass('fix'); 
					}
				});
				
				// // 스크롤 매직
				// var controller = new ScrollMagic.Controller(); // 시작 컨트롤
				
				// var main_top_visual = new TimelineMax()
				// 	.from(".prd_detail_visual", 0, {opacity:1})
				// 	.to(".prd_detail_visual", 1, {opacity: 0.5})
					
				// new ScrollMagic.Scene({
				// 	triggerElement: "#wrap",
				// 	triggerHook: "0", // ScrollMagic 시작 시점
				// 	duration: mv_height, //"100%", 이 값이 클 수록 천천히 덮어씀
				// 	offset :0 // 시작 위치
				// })
				// .setTween(main_top_visual)
				// //.addIndicators() 
				// .addTo(controller);
				
			};
		});

		//알림 툴팁
		$(".price_info").find(".coupon_notice").on("click", function(){
			$(this).parent().parent().find(".notice_pop").show();
		});
		$(".notice_pop").find(".close01").on("click", function(){
			$(this).parent().hide();
		});

	},

	//상품 리뷰 이벤트
	prd_review_event: function () {

		//리뷰상세보기 22.04.13 수정
		$(".review_box").find('.vod01').append('<div class="cover" style="width:100%; height:100%; left:0; top:0; background:transparent; position:absolute; z-index:50;"></div>');
		$(".review_box").not(".blind").off('click').on("click", function(){
			$(this).siblings().removeClass("open");
			$(this).toggleClass("open");
			($(this).hasClass('open')) ? $(this).find('.cover').hide() : $(this).find('.cover').show();
		});
		$(".review_box .img_list").find(".vimeo_area").on('click',function(){
			event.stopPropagation();
		})

		// 문의 상세보기
		$(".question_list_wrap").find(".question_box").on("click", function(){
			if($(this).attr("lock") == 'Y'){
				alert("비밀글 입니다.");
			} else {
				$(this).siblings().removeClass("open");
			   	$(this).toggleClass("open");
			}
		});
		
		// 리뷰 사진 개수 3개 이상일때
		$('.review_box').each(function(){
			var review_img_count = $(this).find(".img_list li").length;
			
			if(review_img_count > 3){
				$(this).find(".img_list li:eq(2)").addClass("on");
			} else {
				$(this).find(".img_list li").removeClass("on");
			};
		});

	},
	
	// 장바구니 이벤트 start ---------------------------------------------------------------------
	order_page_event: function() {
		
		// 알림 레이어 팝업 
		$(".order_table").find(".ico_notice").on("click", function(){
			$(this).parent().parent().find(".info01_text").show();
		});
		$(".custom_code").find(".info01").on("click", function(){
			$(this).parent().parent().find(".info01_text").show();
		});
		$(".info01_text").find(".close01").on("click", function(){
			$(this).parent().hide();
		});
		$(".payment_info").find(".info01").on("click", function(){
			$(this).parent().parent().find(".info01_text").show();
		});
		$(".info01_text").find(".close01").on("click", function(){
			$(this).parent().hide();
		});
		$(".coupon_box").find(".info01").on("click", function(){
			$(this).parent().parent().find(".info01_text").show();
		});
		$(".info01_text").find(".close01").on("click", function(){
			$(this).parent().hide();
		});

		// 장바구니 옵션변경 클릭
		$(".order_product .option_select").not(".select_list .option_select").on("click", function(){
			var setOption = $(this).parent().siblings(".set_option");

			$(this).parent().toggleClass("on");
			if($(this).parent().hasClass("on")) {
				setOption.hide();
			} else setOption.show();
		});

		$(".change_box .btn_3ea").find("button").on("click", function(){
			event.stopPropagation();
			var optionChange = $(this).parents(".option_change, .option_change02");

			optionChange.removeClass("on");
			optionChange.siblings(".set_option").show();
		});

		//배송비 및 이용안내 토글
		$(".delivery_info01 h4").on("click", function(){
			$(this).parent().toggleClass("on");
		});
		$(".use_info01 h4").on("click", function(){
			$(this).parent().toggleClass("on");
		});
		
		//주문상품 더보기
		$(".order_bill .order_box").find(".view").on("click", function(){
			$(this).parent().addClass("on");
		})
		$(".order_bill .order_box").find(".close").on("click", function(){
			$(this).parent().removeClass("on");
		})

		// 결제수단 탭
		$(".payment_list li").on("click", function(){
			var index = $(this).index();
			
			$(".payment_list  li").removeClass("on");
			$(this).addClass("on");
			
			$(".pay_box").find(".payment_info").hide();
			$(".pay_box").find(".payment_info").eq(index).show();
			
			$(".payment_toggle").removeClass("on");
		});
		
		// 결제 안내 토글
		$(".payment_toggle h4").on("click", function(){
			$(this).parent().toggleClass("on");
		});

		//총 결제금액
		$(".total_price02 .view").on("click", function(){
			$(this).parent().toggleClass("on");
		});

		//사은품 혜택 팝업
		$(".promo_box").find("li").on("click", function(){
			$(this).parent().parent().toggleClass("open");
			$(".promo_box").find("li").removeClass("on");
			$(this).addClass("on");
		});

		//주문/배송 안내
		$(".my_toggle_info h4").on("click", function(){
			$(this).parent().toggleClass("on");
		});
		// 묶음할인 레이어 팝업 
		$(".set_discount").find(".btn01").on("click", function(){
			$(this).parent().find(".view_discount").show();
		});
		$(".view_discount").find(".close01").on("click", function(){
			$(this).parent().hide();
		});
		
		// 교환신청 옵션변경 
		$(".change_option .select01 .select_box").off('click').on("click", function(){
			$(this).toggleClass("on");
			$(this).parent().find(".sub_option_box").toggle();
		});
		$(".sub_option_box").find("button").off('click').on("click", function(){
			$(this).parent().parent().parent().find(".select_box").removeClass("on");
			$(this).parent().parent(".sub_option_box").hide();
		});

		// 환불 계좌 정보 인포 레이어팝업
		$(".my_price_section h3").find(".info01").on("click", function(){
			$(this).parent().parent().find(".refund_info_layer").show();
		});
		$(".refund_info_layer").find(".close01").on("click", function(){
			$(this).parent().hide();
		});
	},
	// 장바구니 이벤트 end ---------------------------------------------------------------------

	//프로모션 이벤트  ---------------------------------------------------------------------
	promotion_page_event: function() {
		$(".promo_notice h4").unbind("click").bind("click",function(){
			$(this).parent().toggleClass('on');
		});

		//리뷰 상세보기
		$(".review_box").not(".edit_review").unbind("click").bind("click", function(){
			var clientHeight = $(this).find(".review_text").prop("clientHeight");
			var scrollHeight = $(this).find(".review_text").prop("scrollHeight");
			var clientHeight02 = $(this).find(".comment .text01").prop("clientHeight");
			var scrollHeight02 = $(this).find(".comment .text01").prop("scrollHeight");
			
			$(".review_box").not($(this)).removeClass("open");
	
			if(clientHeight < scrollHeight || clientHeight02 < scrollHeight02) {
				$(this).addClass("open");
			}
			else if(clientHeight == scrollHeight || clientHeight02 == scrollHeight02) {
				$(this).removeClass("open");
			} 
		});

		//리뷰 수정/삭제 박스 || 22.04.13 추가
		$(".review_box").not(".edit_review").find(".btn_setting").unbind("click").bind("click",function(){
			event.stopPropagation();
			$(this).siblings(".setting_box").toggle();
		});

		$(".setting_box > span").unbind("click").bind("click",function(){
			event.stopPropagation();
			$(this).parent().hide();
		});
	
		// 기획전 검색input 노출
		$(".promotion_wrap .search_option").find(".btn_search").unbind("click").bind("click",function(){
			var searchBox = $(this).parents(".option_box").siblings(".promo_search_box");
			$(this).toggleClass("on");
			searchBox.toggleClass("on");
		})
	},
	//프로모션 이벤트 end ---------------------------------------------------------------------

	//리뷰 화살표 위치 함수 || 22.04.18 추가 
	popup_review_arrow: function() {
		var device_height = $(window).height();
		var arrowPos = device_height * 0.5 - 25;

		$(".normal_popup").find(".swiper-button-next").css("top",`${arrowPos}px`);
		$(".normal_popup").find(".swiper-button-prev").css("top",`${arrowPos}px`);
	},

	// 팝업 스크롤 높이 계산(우편번호)
	address_height_fun: function() {
		address_height();
		$(window).resize(function(){
			address_height();
		});
		function address_height() {
			var device_height = $(window).height();
			var cont_top = $('.table_body.scroll_box').offset().top;
			var cont_height = device_height - (cont_top + 101);
			$('.table_body.scroll_box').css("max-height",cont_height);
		};
	},

	// 팝업 스크롤 높이 계산(사은품혜택)
	benefit_height_fun: function() {
		benefit_height();
		$(window).resize(function(){
			benefit_height();
		});
		function benefit_height() {
			var device_height = $(window).height();
			var cont_top = $('.gift_list .scroll_box').offset().top;
			var promo_height = $(".promo_notice").height();
			var cont_height = device_height - (cont_top + promo_height + 125);
			$('.gift_list .scroll_box').css("max-height",cont_height);
		};
	},

	// 팝업 스크롤 높이 계산 및 다중 옵션 
	option_height_fun: function() {
		option_height();
		$(window).resize(function(){
			option_height();
		});
		function option_height() {
			var device_height = $(window).height();
			var cont_height = device_height - 331; // 기본 및 멀티 옵션
			var cont_height2 = device_height - 278; // 옵션 상품 리스트
			var cont_height3 = device_height - 273; // 옵션 상품 개수
			$('.option_pop_list').css("max-height",cont_height); // 기본 및 멀티 옵션
			$('.set_opt_list').css("max-height",cont_height2); // 옵션 상품 리스트
			$('.set_price_list').css("max-height",cont_height2); // 옵션 상품 개수
		};

		const layerPopup = $('.layer_b_popup'), btnEl = $('.option_pop_list .item'), listEl = $('.option_pop_list .bg_list');

        listEl.find('input').on('change keyup', function(){
            let This = $(this),
            parBglist = This.closest('.bg_list'), parItem = This.closest('.item'), parPoplist = This.closest('.option_pop_list'),
            index = parItem.index();
            if(This.is(':checked')){
                btnEl.each(function(i){
                    if(i > index){parPoplist.find('.item').eq(i).find('input').prop('checked', false);}
                });
                if(index != btnEl.length-1){
                    parBglist.removeClass('on');
                    parBglist.prev().removeClass('on');
                }
                if(index < btnEl.length-1){
                    parItem.next().find('> h4').addClass('on');
                    parItem.next().find('.bg_list').addClass('on');
                }
                if(index == btnEl.length-1){
                    layerPopup.removeClass('on');
                }
            }
        });

        btnEl.find('> h4').on('click', function(){
            let This = $(this), parItem = This.closest('.item');
            if(parItem.find('input').is(':checked') || parItem.prev().find('input').is(':checked')){
                btnEl.find('> h4').removeClass('on');
                listEl.removeClass('on');
                This.addClass('on');
                This.next().addClass('on');
            }
        });
	},

	//필터  페이지 관련 스크립트
	filter_page_event: function() {
		$( "#price_slide" ).slider({
			range: true,
			min: 2800,
			max: 2345800,
			values: [ 2800, 2345800 ],
			slide: function( event, ui) {
				$( "#price_data01" ).val(ui.values[0]);
				$( "#price_data02" ).val(ui.values[1]);
			}
		});
		$( "#price_data01" ).val($( "#price_slide" ).slider( "values", 0 ));
		$( "#price_data02" ).val($( "#price_slide" ).slider( "values", 1 ));
	},

	// 마이 페이지 관련 스크립트
	mypage_event: function() {
		// 배송지 정보 옵션(수정, 삭제)
		$(".my_address_list").find(".option01").on("click",function(){
			event.stopPropagation();
			if($(this).parent().find(".option_layer").css("display") == "block") {
				$(this).parent().find(".option_layer").hide();
				return;
			}
		
			$(".my_address_list").find(".option_layer").hide();
			$(this).parent().find(".option_layer").show();
		});

		//등급별 혜택 안내  || 22.05.24 추가
		$(".ranking_benefit_list").find(".btn_list_more").on("click", function(){
			$(this).parent().addClass("on");
		});
		$(".ranking_benefit_list").find(".btn_list_close").on("click", function(){
			$(this).parent().removeClass("on");
		});
		
		$(".my_benefit .view_benefit").find("a").on("click",function(){
			var section = $(this).data("rank")
			var offset;

			if(section !== 'black' &&  section !== 'vip') {
				$(this).parents(".member_benefit").siblings(".ranking_benefit_list").addClass("on");
			}

			offset = $(`#${section}`).offset();
			$('html, body').animate({scrollTop : offset.top - '85'}, 800);
		});

		//상품Q&A || 22.06.10 추가
		$(".question_list_wrap").find(".question_box").on("click", function(){
			$(this).toggleClass("open");
			$(".question_box").not($(this)).removeClass("open");
		});

		$(".question_box").find(".option_area").on("click", function(){
			event.stopPropagation();
			if($(this).find(".option_layer").css("display") == "block"){
				$(this).parent().find(".option_layer").hide();
				return;
			}
			$(this).parents().find(".option_layer").hide();
			$(this).find(".option_layer").toggle();
		});

		//리뷰
		$(".review_box").find('.vod01').append('<div class="cover" style="width:100%; height:100%; left:0; top:0; background:transparent; position:absolute; z-index:50;"></div>');
		$(".review_list_wrap").find(".review_box").on("click", function(){
			$(this).toggleClass("open");
			$(".review_box").not($(this)).removeClass("open");
			($(this).hasClass('open')) ? $(this).find('.cover').hide() : $(this).find('.cover').show();
		});
		$(".review_box .img_list").find(".vimeo_area").on('click',function(){
			event.stopPropagation();
		})

		$(".review_box").find(".option_area").on("click", function(){
			event.stopPropagation();
			if($(this).find(".option_layer").css("display") == "block"){
				$(this).parent().find(".option_layer").hide();
				return;
			}
			$(this).parents().find(".option_layer").hide();
			$(this).find(".option_layer").toggle();
		});

		//FAQ
		$(".faq_list_wrap").find(".faq_box").on("click", function(){
			$(this).toggleClass("open");
			$(".faq_box").not($(this)).removeClass("open");
		});
	},

    // 스크롤 탭메뉴 좌측 이동(파라미터값 )
    scroll_tab_event: function() {
		// 05-03 탭온 및 자동 에니메이션 이동
		$(".text_rolling_tab01").find("li").on("click",function() {
			var index = $(this).index();
			var menu_left = $(".text_rolling_tab01").find("li").eq(index).position().left;
        	$(".text_rolling_tab01").animate({scrollLeft: menu_left - 15}, 200);;
        	$(".text_rolling_tab01").find("li").removeClass("on");
        	$(this).addClass("on");
		});

		// 파라미터로 받아오기 05-03 주석처리
        // function getParameterByName(name) {
        //     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        //     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        //         results = regex.exec(location.search);
        //     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        // }
        // var tab_num = getParameterByName('scroll_tab');
        // var menu_left = $(".text_rolling_tab01").find("li").eq(tab_num).position().left;
        // $(".text_rolling_tab01").scrollLeft(menu_left - 15);
        // $(".text_rolling_tab01").find("li").removeClass("on");
        // $(".text_rolling_tab01").find("li").eq(tab_num).addClass("on");
    },

	//카테고리 레이어 팝업 클릭 이벤트 || 22.05.02 추가
	category_click_event: function() {
		$(".category_wrap .depth_02").find("h4").on("click",function() {
			$(this).parent().siblings().find(".depth_03").slideUp(400);
			$(this).toggleClass("on");
			$(this).parent().find(".depth_03").slideToggle(400);
		});
	},
	
	//팝업 스크롤 높이-상품상세 쿠폰 || 220516 추가
	dialog_height_func: function() {
		$(function(){
			setTimeout(function(){
				list_height();
				$(window).resize(function(){
					list_height();
				});
				function list_height() {
					var device_height = $(window).height();
					var cont_top = $('.layer_md_popup .scroll_box').position().top;
					var btn_height = $(".btn_bottom").height();
					var cont_height = device_height - (cont_top + btn_height + 125); 
					$('.layer_md_popup .scroll_box').css("max-height",cont_height);
				};
			},500);
		});
	},

	//토글클래스 함수
	toggle_class_func: function(el, obj){
		el.off('click').on('click', function(){
		   (obj.length > 0) ? el.closest(obj).toggleClass('on') : el.toggleClass('on');
		});
	 },

	//클래스 추가 삭제 함수
	add_class_func: function(el){
		el.off('click').on('click', function(){
			el.removeClass('on');
			$(this).addClass('on');
		});
	},

	//룩북 함수
	touchLookBook: function() {
		const lookbookLayer = $(".lookbook_list_layer"), initPos = lookbookLayer.position().top;
		let posStart = 0;
		lookbookLayer.find('.tuch_handle').on('touchstart touchmove touchend',function(event){
			let This =$(this).parent(), eventPos = event.originalEvent.changedTouches[0].clientY - 10;
			if(event.type == 'touchstart'){
				posStart = eventPos;
			}else if(event.type == 'touchmove'){
				if(eventPos > 0 && eventPos < initPos){This.removeClass('up down').css({top:eventPos});}
			}else {
				(eventPos < posStart) ? This.removeClass('down').addClass('up') : This.removeClass('up').addClass('down');
			}
		});
	},

	tabMoving: function(){
		var tabX = $(".pop_cont .text_rolling_tab01");
		var activeTab = $(".pop_cont .text_rolling_tab01").find("li.on");
		if(activeTab.hasClass("on") === true){
			tabX.scrollLeft(activeTab.width() + 15);
		}	
	}

};


