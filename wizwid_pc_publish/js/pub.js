// 시작

//### 220615 S ################################################################################################################################################################################################## //

// editorial list event handle 220615 add
function editoriallistEventHandle(){
	const win = $(window), doc = $(document),
	editorialList = $('.editorial_list'),
	editorialView = $('.editorial_view .view_box');
	
	let chkMt = Number(editorialList.find('li').eq(1).css('margin-top').replace('px','')),
	top_bar_height = $("header .head_banner").height() + 70,
	boxHeight = 1020;
	//scrollHeight();

	editorialList.find('li').off('click').on('click',function(){
		let This = $(this), chkHeight = 0;
		// for(let i=0; i < This.index(); i++){chkHeight += Number(editorialList.find('li').eq(i).height() + chkMt);}
		// This.siblings().removeClass('on');
		// This.addClass('on');
		// editorialList.stop().animate({scrollTop:chkHeight},200);
		// editorialView.stop().animate({scrollTop:0},200);
		// $('html, body').stop().animate({scrollTop:top_bar_height + chkMt},200);
		
		This.siblings().removeClass('on');
		This.addClass('on');
		$('html, body').stop().animate({scrollTop:0},200);
	});
	
	// doc.off('scroll').on('scroll', function(){
	// 	if(win.scrollTop() < top_bar_height){scrollHeight();}
	// });

	// function scrollHeight(){
	// 	let chkHeight, winHeight = win.height() - ($('header').outerHeight(true) + $('footer').outerHeight(true)) + win.scrollTop();
	// 	(win.scrollTop() > top_bar_height) ? chkHeight = boxHeight : chkHeight = winHeight;
	// 	editorialList.find('ul').css({paddingBottom:chkHeight - editorialList.find('li:last-child').innerHeight()});
	// 	editorialList.css({height:chkHeight});
	// 	editorialView.css({height:chkHeight});
	// }
}

// brand event handle
function brandEventHandle(){
	const win = $(document), scrollContent = $('html, body'), 
	sortBox = $('.brand_sort_wrap .sort_box'),
	sortChange = sortBox.find('.change_btn'),
	sortList = sortBox.find('.list01 li'),
	brandList = $('.filter_brand_list'),
	listBox = brandList.find('.list_box');

	let currentList = null, topHeight = Number($('.sticky_wrap').outerHeight(true) + $('.gnb_section').outerHeight(true)), gab = 100;
	brandList.css({paddingBottom:300});
	currentSort();

	function currentSort(){currentList = $('.sort_box.on .list01 li');}
	
	sortChange.off('click').on('click', function(){
		let This = $(this),
		listScroll = $('.filter_brand_list').offset().top - topHeight;
		sortBox.addClass('on');
		sortChange.addClass('on');
		if(This.parent().hasClass('on')) {
			This.parent().removeClass('on');
			This.removeClass('on');
			sortList.removeClass('on');
			currentSort();
			currentList.eq(0).addClass('on');
			scrollContent.stop().animate({scrollTop: listScroll}, 300);
		}
	});

	sortList.off('click').on('click', function(){
		let This = $(this), listScroll = null;
		if(listBox.eq(This.index()).length > 0){
			listScroll = listBox.eq(This.index()).offset().top - topHeight;
			scrollContent.stop().animate({scrollTop: listScroll}, 300);
		}
	});

	win.off('scroll').on('scroll', function(){
		let scrollPos = win.scrollTop();
		listBox.each(function(){
			let This = $(this), thisPos = This.offset().top - (topHeight + gab), thisHeight = This.outerHeight(true);
			if (scrollPos >= thisPos && scrollPos < thisPos + thisHeight) {
				sortList.removeClass('on');
				currentList.eq(This.index()).addClass('on');
			}
		});
	});
}

// promotion event handle
function promotionEventHandle(){
	const win = $(document);
	promotionEvent();
	function promotionEvent(){
		const scrollContent = $('html, body'),
		header = $('.header_box'), el = $('#wrap'),
		selectWrap = el.find('.anchor_section'),
		editorWrap = selectWrap.prev(),
		selectBox = selectWrap.find('ul'),
		commentWrap = el.find(".comment_section"),
		relativeRrd = el.find('.relative_prd_list .relative_prd');
	
		let topHeight = 75, depth1 = selectWrap.find('.depth01'),
		depth2 = selectWrap.find('.depth02'), topMargin = Number(editorWrap.css('margin-bottom').replace('px', '')),
		selectTop = (selectWrap.offset().top - topHeight) - topMargin, indexNum = 0, chkPos = indexNum, gabNum = 40, gab = indexNum,
		selectHeight =  depth1.outerHeight(true) + depth2.outerHeight(true) + topHeight, chkClick = false, scrollId;
		
		if(selectBox.length == 1) {selectHeight = selectWrap.outerHeight(true) + topHeight;}
		chkIndex(0, 0);

		selectBox.find('li').off('click').on('click',function(){
			let This = $(this), chkDepth2 = This.closest('.depth02');
			chkClick = true;
			This.siblings().removeClass('on');
			This.addClass('on');
			(chkDepth2.length > 0) ? chkIndex(chkDepth2.index(), This.index()) : chkIndex(This.index(), 0);
			scrollMove(This.data('scrollid'));
		});
	
		win.off('scroll').on('scroll', function(){
			let scrollPos = win.scrollTop();
			setTimeout(function(){chkPos = scrollPos},250);
			
			clearTimeout(scrollId);
			scrollId = setTimeout(scrollEnd, 200);
			
			if(scrollPos >= selectTop ){
				selectWrap.addClass('fixed');
				editorWrap.css({marginBottom:selectHeight});
				gab = gabNum;
			}else{
				selectWrap.removeClass('fixed slide_up');
				editorWrap.css({marginBottom:topMargin});
				(topMargin > 20) ? gab = -(gabNum - 5) : gab = 0;
			}

			if(commentWrap.length > 0) {
				commentTop = commentWrap.offset().top - ((topHeight + selectHeight + topMargin * 2) - 100);
				if (scrollPos > commentTop && !selectWrap.hasClass("del_motion")) {
					selectWrap.addClass("del_motion");
				} else if(scrollPos < commentTop && selectWrap.hasClass("del_motion")){
					selectWrap.removeClass("del_motion");
				}
			}
	
			if(chkClick == true) return;
			relativeRrd.each(function(){
				let This = $(this), thisPos = This.offset().top - (topHeight + selectHeight + topMargin * 2), thisHeight = This.outerHeight(true);
				if (scrollPos >= thisPos && scrollPos < thisPos + thisHeight) {
					chkIndex(This.parent().index(), This.index());
				}
			});
		});

		function scrollEnd(){chkClick = false;}

		function chkIndex(index1, index2){
			depth1.find('li').removeClass('on');
			depth2.find('li').removeClass('on');
			depth2.removeClass('on');
			depth1.find('li').eq(index1).addClass('on');
			depth2.eq(index1).addClass('on');
			depth2.eq(index1).find('li').eq(index2).addClass('on');
		}
	
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
	let jakpotObj = '', item = null;
	if(jackpotItem.length < 1){return}
	jackpotItem.closest('#contents').css({paddingBottom:0});
	jackpotItem.append('<ul></ul>');
	for(let i = 0; i < jackpotArr.length; i++){
		let chkItem = '<img'
		if(jackpotArr[i] == 1){chkItem = '<img class="small"'}
		jakpotObj += `<p class="item">${chkItem} src="/resources/images/promotion/event_jackpot_obj${jackpotArr[i]}.png" alt="" /></p>`;
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

// //### 220615 E ##################################################################################################################################################################################################### //

// 입력폼 영역 벗어날시
function bodyClick() {
	$('html, body').click(function() {
		let intervalId = null;
		$("input").removeClass("on");
		// $(".input_text_del").removeClass("on");
		// $(".input_pw_view01").removeClass('move');

		if($("input.search_input02").val() < 1) {
			$(".rolling_list").removeClass("hide");
		}
	});
};


$(function(){
	// 입력폼 공통
	inputInit();
	bodyClick();
	initJackpot();
		
	// 팝업 클릭 이벤트
	$('button, a, div').on("click", function(){
		var targetName = $(this).data("target");
		if(targetName) popup.openPopup(targetName);
	});

	//textarea
	$("textarea").on("focusin focusout", function(event){
		const This = $(this);
		(event.type == 'focusin') ? This.parent().css("border", "solid 1px #000000") : This.parent().css("border", "none");
	});

	// GNB 더보기 
	$(".gnb_section").find(".more").click(function(){
		$(this).toggleClass("on");
		$(this).siblings("ul").toggleClass("open");
	});

	$(".gnb_section .more").next("ul").on("mouseleave", function(){
		if(!$(this).hasClass("open")) return;

		$(this).removeClass("open");
		$(this).prev(".more").removeClass("on");
	})

	// GNB 서브메뉴 보기
	let topGnb = "#gnbCtgryList > li", gnblayer = ".sub_menu_layer", gnbInterval, gnbActive = null;
		$(gnblayer).wrapAll('<div></div>');
	$(`${topGnb},${gnblayer}`).on('mouseenter',function() {
		var index = $(this).index();
		clearTimeout(gnbInterval);
		if(gnbActive != index){
			$(gnblayer).hide();
			$(gnblayer).eq(index).stop().slideDown(0, function(){
				$(gnblayer).eq(index).css("display","flex");
			});
		}
		gnbActive = index;
	});

	$(`${topGnb},${gnblayer}`).on('mouseleave',function() {
		gnbInterval = setTimeout(function(){gnbActive = null;$(gnblayer).stop().slideUp(0);},200);
	});

	///탑 버튼 클릭 이벤트
	$(".btn_top").find("button").on("click", function(){
		$("html, body").stop().animate({scrollTop:0} , 300)
	});
})


// 스크롤 액션
$(window).scroll(function(){ 
	// GNB TOP 고정 호출
	header_fixed();
	btnTop();
	
	// 무빙 타이틀
	var mv_height = $(window).height() - 100;
	$('.product_section02').each(function(){
		var sectionTop = $(this).offset().top - mv_height;
		if($(window).scrollTop() > sectionTop){
			$(this).find('h3').addClass('on'); 
		} else { 
			$(this).find('h3').removeClass('on'); 
		} 
	});
});

// GNB TOP 고정
function header_fixed() {
	var top_bar_height = $("header .head_banner").height() + 70;
	if($(window).scrollTop() > top_bar_height){
	   $("header .header_box").addClass('fixed'); 
	   $("header").css("padding-bottom","100px");
	} else { 
	   $("header .header_box").removeClass('fixed'); 
	   $("header").css("padding-bottom","0px");
	}
};

 //탑 버튼
function btnTop() {
	// var btnTopHeight = $(".main_benefit").offset().top; 
	// console.log(btnTopHeight);
	if($(window).scrollTop() >= 1500){
		$('.btn_top').fadeIn('1000');
	}else{
		$('.btn_top').fadeOut('1000');
	}
};

function inputInit() {
	$('input').not(".search_input02").on('click focus propertychange change keyup paste input', function() {
		const passwordInput = $(this).siblings().is(".input_pw_view01");
		passwordInput ? $(this).siblings(".input_text_del").addClass('type02') : '';
		passwordInput ? $(this).addClass('password') : '';

		$("input").removeClass("on");
		event.stopPropagation();
		$(this).addClass('on');
		if($(this).val().length < 1){ // 입력 여부 체크
			$(this).parent().find('.input_text_del').removeClass("on");
		} else {
			$(this).parent().find('.input_text_del').addClass("on"); 
		}
	});
	
	// 입력폼 내용 삭제시
	$('.input_text_del').not(".search_del").click(function() {
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

//검색 인퓻 이벤트
var search = {
	input_event: function() {
		$('input').on('click focus propertychange change keyup paste input', function() {
			event.stopPropagation();

			$(this).siblings(".rolling_list").addClass("hide");
			$(this).addClass('on');

			if($(this).val().length < 1){
				$(this).parent().find('.input_text_del').removeClass("on");
			} else {
				$(this).parent().find('.input_text_del').addClass("on");
			}
		});

		$('.input_text_del').click(function() {
			event.stopPropagation();
			$(this).parent().find('input').val('');
			$(this).parent().find('input').focus();
			$(this).removeClass("on");
			// $(this).siblings(".rolling_list").removeClass("hide");
			sub.rolling_list();
			$("#autoKeywordList").hide();
		});
	},
}

//팝업 이벤트
var popup = {
	openPopup: function(targetName) {
		var layerName = "#" + targetName;

		$("body").find(layerName).addClass("on");
		
		if($(layerName).hasClass("layer_pop_today") && !$("html").hasClass("pop_open")) {
			$("html").removeClass("pop_open");
		} else {
			$("html").addClass("pop_open");
		}

		//닫기버튼
		$(layerName).find("div").click(function(){
			if($(this).hasClass("close") || $(this).hasClass("close_pop")) {
				$("body").find(layerName).removeClass("on");
				$("html").removeClass("pop_open");
			}
		})

		$(layerName).find("button").click(function(){ 
			event.stopPropagation();
			if(($(this).hasClass("btn_gray01") || $(this).hasClass("btn_black01")) && $(this).prop("id") == '') {
				$("body").find(layerName).removeClass("on");
				$("html").removeClass("pop_open");
			}
		})

		// 220524추가 || 프로모션 팝업 닫기 기능
		$(layerName).find("div > span").click(function(){
			event.stopPropagation();
			if(($(this).hasClass("today") || $(this).hasClass("close01"))) {
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
	},
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
			} else {
				$(".agree_check").find("input").prop("checked", false);
				$(".member .btn_area").find("button").removeClass("on");
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
				}
			} else {
				$("#chack_all").prop("checked", true);
				$(".member .btn_area").find("button").addClass("on");
			}
		});
	},

	// 토글 이벤트 start ---------------------------------------------------------------------	
	toggle_list: function() {
		$(".toggle_list h4").click(function() {
			$(".toggle_list h4").not($(this)).parent().removeClass("view");
			$(this).parent().toggleClass("view");
		});

		$(".new_table tbody").find("tr").not(".notice_box, .no_data").on("click", function(){
			const noticeBox = $(this).next(".notice_box");

			noticeBox.siblings().find("td").attr("style","");
			noticeBox.siblings().removeClass("open");
			noticeBox.toggleClass("open");

			if(noticeBox.hasClass("open")) {
				$(this).find("td").css("padding-bottom","30px");
				noticeBox.next().find("td").css("padding-top","30px");
			} else return;
		})
	},
	// 토글 이벤트 start ---------------------------------------------------------------------	
	
	// 테이블  rowspan || 220520 추가
	table_display: function() {
		const tableItem = $(".order_table, .order_table_gray");
		
		tableItem.find("tbody td").each(function(){
			let This = $(this), 
				rowSpan = This.attr('rowspan') - 1;
				
			if(rowSpan){
				let indexTr = This.parent().index();
				This.parent().addClass('rowspan_current');

				for(let i = 1; i <= rowSpan; i++){
					This.closest('tbody').find('tr').eq(indexTr + i).addClass('rowspan_children');
				}
			}	
		});

		$('.rowspan_children td').each(function(){
			let This = $(this);
			if(This.children().length == 0 ){
				This.remove();
			}
		});
	},

	// 롤링 배너 영역 start ---------------------------------------------------------------------	
	swiper_connect: function(el, connect_title){
		$(".clubG_brand_box").each(function () {
			if($(this).children().is(".hot_brands_box")) {
				$(this).find("h3.small").addClass("title");
			}
		})

		$('h3.title').each(function(){
			let This = $(this);
			This.parent().find('.swiper-wrapper').parent().removeClass('swiper_normal01 .swiper_normal02 .swiper_normal03 .swiper_normal04 .swiper_normal05');
			for(let i=0; i < 2; i++){
				let swiperItem = This.parent().find('.swiper-wrapper').eq(i).parent();
				if(i == 0) {
				var swiper1 = new Swiper(swiperItem,  {
					slidesPerView: "auto",
					// spaceBetween: 40,
				});
				swiperVimeo(swiper1);
				}else{
				var swiper2 = new Swiper(swiperItem,  {
					slidesPerView: "auto",
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
				});
				swiperVimeo(swiper2);   
				}               
			}
			
			// swiper1.on('slideChange',function(){
			// 	activeClass(swiper1);
			// 	swiper2.slideTo(swiper1.realIndex);
			// 	this.snapGrid = this.slidesGrid.slice(0);
			// });

			// swiper2.on('slideChange',function(){
			// 	activeClass(swiper1);
			// 	swiper1.slideTo(swiper2.realIndex);
			// });

			// $(swiper1.el).find('.swiper-slide').on('click',function(){
			// 	let This = $(this);
			// 	This.siblings().removeClass('on');
			// 	This.addClass('on');
			// 	swiper2.slideTo($(this).index());
			// });

			// function activeClass(item){
			// 	let slideItem = $(item.el).find('.swiper-slide');
			// 	slideItem.removeClass('on');
			// 	slideItem.eq(item.realIndex).addClass('on');
			// }

			$(swiper1.el).find('.swiper-slide').on("click", function() {
				$(this).addClass("on");
				$(this).siblings().removeClass("on");
				swiper2.slideTo($(this).index(),500);
			});
			swiper1.on('slideChange',function(){
				activeTab(swiper2,swiper1.realIndex)
				// this.snapGrid = this.slidesGrid.slice(0);
			});
			swiper2.on('slideChange',function(){
				activeTab(swiper1,swiper2.realIndex)
			});
			function activeTab(slide,index) {
				$(swiper1.el).find('.swiper-slide').removeClass("on");
				$(swiper1.el).find('.swiper-slide').eq(index).addClass("on");
				slide.slideTo(index);
			}
		});
	},
	
	swiper_normal01: function(){
		// 상품 롤링
		
		//상품상세 하단 슬라이더 갯수 5개 이상 슬라이더 실행 
		const detailMore =  $('.detail_more_recommended');
		if(detailMore.length > 0 && detailMore.find('.swiper-slide').length < 6){
			detailMore.find('.swiper_normal01').addClass('detail_more_swiper');
			detailMore.find('.swiper-button-next, .swiper-button-prev').addClass('swiper-button-disabled');
		}

		var swiper = new Swiper(".swiper_normal01:not(.detail_more_swiper)",  {
			slidesPerView: "auto",
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
		
		if($(".main_sale_list").length > 0 || $(".event_top_visual").length > 0) {
			var swiper02 = new Swiper(".main_sale_list, .event_top_visual", {
				slidesPerView: 'auto',
				loop: true,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});
			swiperVimeo(swiper02);
		} 

		if($(".deca_visual").length > 0 || $(".s_project_visual").length > 0 || $(".swiper_brand").length > 0) {
			var swiper03 = new Swiper(".deca_visual, .s_project_visual, .swiper_brand",  {
				slidesPerView: "auto",
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				loop: true,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});
			swiperVimeo(swiper03);
		} 

		if($(".brand_promo").length > 0) {
			if($(".brand_promo").find(".swiper-slide").length > 1) {
				var swiper04 = new Swiper(".brand_promo", {
					slidesPerView: "auto",
					loop: true,
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
				});
			} else {
				$(".brand_promo").find(".swiper-button-next").css("display","none");
				$(".brand_promo").find(".swiper-button-prev").css("display","none");
			}
		}

		var swiperElement = $(swiper.el);

		if(swiperElement.parents(".contents_promo") && swiperElement.find(".swiper-slide").length < 2) {
			swiperElement.find(".swiper-wrapper").css("justify-content","center");
		} else return;
	},

	swiper_normal02: function(){
		$(".swiper_normal02").each(function(index){
			if($(`.swiper_normal02`).find(".swiper-slide").length > 1) {
				swiper = new Swiper(".swiper_normal02", {
					slidesPerView: 1,
					spaceBetween: 0,
					loop: true,
					loopedSlides: 1,
					speed : 600,
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
					pagination: {
						el: ".swiper-pagination",
						type: "fraction",
					},
				});
				swiperVimeo(swiper);
			}  else {
				$('.swiper_normal02').find(".swiper-button-next").css("display","none");
				$('.swiper_normal02').find(".swiper-button-prev").css("display","none");
			}
		})
	},
	
	swiper_normal03: function(){
		// 상단 비쥬얼 롤링
		var swiper = new Swiper(".swiper_normal03", {
			slidesPerView: 1,
			spaceBetween: 0,
			pagination: {
				el: ".swiper-pagination",
			},
		});
		swiperVimeo(swiper);
	},

	swiper_normal04: function(){
		// 상단 비쥬얼 롤링 || 22.05.10 추가
		var swiper = new Swiper(".swiper_normal04", {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			autoplay: {
				delay: 5000,
			 },
			 pagination: {
				el: ".swiper-pagination",
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					// return '<span class="' + className + '">' + (index + 1) + "</span>";
					// return ('0' + current).slice(-2) + ' / ' + ('0' + total).slice(-2);
					return `
						<span class="current">${('0' + current).slice(-2)}</span> /
						<span class="total">${('0' + total).slice(-2)}</span>
					`
				},
			},
		});
		swiperVimeo(swiper);
	},

	swiper_normal05: function(){
		// 상단 비쥬얼 롤링 || 22.05.11 추가
		var swiper = new Swiper(".swiper_normal05", {
			slidesPerView: "auto",
			pagination: {
				el: ".swiper-pagination",
				type: "progressbar",
			},
		});
		swiperVimeo(swiper);
	},

	swiper_normal06: function(){
		// 상단 비쥬얼 롤링 || 22.05.11 추가
		var swiper = new Swiper(".brands_prd_box", {
			slidesPerView: "auto",
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				renderBullet: function (index, className) {
				//   return '<span class="' + className + '">' + (index + 1) + "</span>";
				  return `<span class="slide_num ${className}">${index+1}</span>`;
				},
			  },
		});
		swiperVimeo(swiper);
	},

	top_global_visual01: function(){
		// 상단 비쥬얼 롤링
		var swiper = new Swiper(".top_global_visual01", {
			slidesPerView: "auto",
			spaceBetween: -440,
			centeredSlides: true,
			speed : 600,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
			// pagination: {
			// 	el: ".swiper-pagination",
			// 	type: "fraction",
			// },
		});
		swiperVimeo(swiper);

		swiper.on('slideChangeTransitionStart', function () {
			// var activeSlide = $(".top_global_visual01").find(".swiper-slide-next");
			// var index = activeSlide.data("swiper-slide-index");
			var index = swiper.realIndex;
			var colorBG = $(".top_global_visual01").find(".swiper_mach li");

			colorBG.removeClass("on")
			colorBG.eq(index).addClass("on")
		});
	},

	// swiper_editorial: function(){
	// 	 // 에디토리얼 탭
	// 	var swiper = new Swiper(".tag_list_wrap > .tag_list",  {
	// 		slidesPerView: "auto",
	// 		spaceBetween: 6,
	// 	});

	// 	// 에디토리얼 상품 롤링
	// 	if($(".swiper_editorial .swiper-slide").length > 3){
	// 		var swiper = new Swiper(".swiper_editorial",  {
	// 			slidesPerView: 2,
	// 			spaceBetween: 0,
	// 			//loop: true,
	// 			breakpoints: {
	// 			1750: {
	// 				slidesPerView: 4,
	// 			},
	// 			1550: {
	// 				slidesPerView: 3,
	// 			},
	// 			1400: {
	// 				slidesPerView: 2,
	// 			}
	// 			},
	// 			navigation: {
	// 			nextEl: ".swiper-button-next",
	// 			prevEl: ".swiper-button-prev",
	// 			},
	// 		});
	// 		swiperVimeo(swiper);
	// 		}
	// },

	swiper_special: function(){
        // special 상품 롤링
			var swiper = new Swiper( ".swiper_special",  {
            slidesPerView: "auto",
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
		swiperVimeo(swiper);
    },

    swiper_s_project : function(){
		// special 상품 롤링
		$(".best_brand_wrap .swiper_s_project").each(function(index){
			var swiperArr=[];
			var swiperName, firstImg;
			swiperArr.push(swiperName);

			$(this).addClass(`swiper_s_project${index}`);
			firstImg = $(`.swiper_s_project${index} .swiper-slide`).eq(0).find("img").attr("src");
			$(`.swiper_s_project${index}`).parent().siblings(".img_big01").find("img").attr("src",firstImg);

			swiperArr[index] = new Swiper(".swiper_s_project" + index,  {
				slidesPerView: 4.8,
				spaceBetween: 20,
				loop: true,
				loopAdditionalSlides : 1,
				// autoplay: {
				// 	delay: 3000,
				//  },
				pagination: {
					el: ".swiper-pagination",
					type: "progressbar",
				},
			});

			swiperVimeo(swiperArr[index]);

			swiperArr[index].on('transitionEnd', function(){
				// const swiperIndex =  swiperArr[index].realIndex;
				// const targetImg = $(`.swiper_s_project${index} .img_box`).find("img").eq(swiperIndex+5).attr("src");
				// const targetParent = this.$el.parent();
				// $(targetParent).siblings(".img_big01").find("img").attr("src",targetImg);

				// const activeSlide =  this.$el.find(".swiper-slide-active");
				// const slideIndex =  activeSlide.data("swiper-slide-index");
				const targetImg = $(`.swiper_s_project${index} .swiper-slide.swiper-slide-active`).find("img").attr("src");
				const targetParent = this.$el.parent();
				$(targetParent).siblings(".img_big01").find("img").attr("src",targetImg);
			});

			$(`.swiper_s_project${index}`).find(".swiper-slide").on("click", function(){
				const swiperIndex =  $(this).data("swiper-slide-index");
				if($(this).hasClass('swiper-slide-active')) {
					const linkSrc = $(this).data('src');
					$(location).attr('href', linkSrc);
				}
				swiperArr[index].slideToLoop(swiperIndex,500);
			});

		})
	},

	// 셀럽 스와이프 이벤트
	celeb_pick_event: function() {
		var swiper = new Swiper(".swiper_celeb",  {
			slidesPerView: "auto",
			speed : 600,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
		});
		swiperVimeo(swiper);

		swiper.on('transitionEnd', function () {
			var index =  swiper.realIndex;
			var targetPrd = $(".celeb_section .celeb_prd").find(".product_list01");

			targetPrd.removeClass("on")
			targetPrd.eq(index).addClass("on")
		});
	},

	pop_today: function(){
		//프로모션 팝업 함수
		var swiper = new Swiper(".pop_visual", {
			slidesPerView: 1,
			spaceBetween: 0,
			pagination: {
				el: ".swiper-pagination02",
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					return `
						<span class="current">${current}</span> /
						<span class="total">${total}</span>
					`
				},
			},
		});
		swiperVimeo(swiper);
	},

	rolling_list: function() {
		var swiper = new Swiper(".rolling_list", {
			direction: "vertical",
			autoplay: {
				delay: 3000,
			 },
			loop: true,
			touchRatio: 0,
			observer: true,
  			observeParents: true,
		});
		swiperVimeo(swiper);
	},

	rolling_list02: function() {
		var swiper = new Swiper(".rolling_list02", {
			direction: "vertical",
			autoplay: {
				delay: 3000,
			 },
			loop: true,
			touchRatio: 0,
			observer: true,
  			observeParents: true,
		});
		swiperVimeo(swiper);
	},

	exclusive_slide: function(){
        // exclusive 리스트 롤링
        var swiper = new Swiper(".exclusive_slide", {
            slidesPerView: 4,
            spaceBetween: 0,
			speed : 600,
            centeredSlides: true,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                1500: {
                    slidesPerView: 6,
                }
            },
        });
		
		// 220627 edd
		let resizeTime, swiperEl = $(swiper.el);
		// swiperEl.find('.img_box').wrapAll(`<div class='item'></div>`);
		$(window).on('load resize',function(){
			swiperEl.css({height:'auto'});
			clearTimeout(resizeTime);
			resizeTime = setTimeout(resizeEnd,800);
		});

		function resizeEnd(){
			swiperEl.css({height:swiperEl.outerHeight(true)});
			// console.log(Math.round(swiperEl.outerHeight(true)));
		}
    },
	// 롤링 배너 영역 end ---------------------------------------------------------------------
	
	// 장바구니 이벤트 start ---------------------------------------------------------------------
	order_page_event: function() {
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
		
		// 알림 레이어 팝업 
		$(".order_bill").find(".info01").on("click", function(){
			$(this).parent().parent().find(".info01_text").show();
		});
		$(".info01_text").find(".close01").on("click", function(){
			event.stopPropagation();
			$(this).parent().hide();
		});
		
		//사은품 혜택 팝업
		$(".promo_box").find("li").on("click", function(){
			$(this).parent().parent().toggleClass("open");
			$(".promo_box").find("li").removeClass("on");
			$(this).addClass("on");
		});

		//주문 약관 토글
		$(".order_terms_toggle h4").click(function(){
			const parentEl = $(this).parent();

			parentEl.siblings().removeClass("on");
			parentEl.toggleClass('on');
		});
	},
	// 장바구니 이벤트 end ---------------------------------------------------------------------

	// 프로모션 이벤트 start ---------------------------------------------------------------------
	promo_page_event: function() {
		
		//공유하기 클릭 이벤트
		// $(".promo_header").find(".btn_share").on("click",function() {
		// 	$(this).siblings(".share_box").toggleClass("open");
		// });
		// $(".promo_header .share_box").find(".btn_close").on("click",function() {
		// 	$(this).parent().removeClass("open")
		// });

		// 이벤트 공지 이벤트
		$(".notice_section").find("h4").unbind("click").bind("click",function(){
			$(this).parent().toggleClass("on");
		});

		//댓글 이벤트
		$(".comment_box").each(function(){
			var clientHeight = $(this).find(".comment_text").prop("clientHeight");
			var scrollHeight = $(this).find(".comment_text").prop("scrollHeight");
			var clientHeight02 = $(this).find(".admin_comment .text01").prop("clientHeight");
			var scrollHeight02 = $(this).find(".admin_comment .text01").prop("scrollHeight");

			if(clientHeight < scrollHeight || clientHeight02 < scrollHeight02) {
				$(this).find('.more').css('display','inline-block');
			}
		});

		//댓글 상세보기
		$(".comment_box").not(".edit_comment").unbind("click").bind("click", function(){
			var clientHeight = $(this).find(".comment_text").prop("clientHeight");
			var scrollHeight = $(this).find(".comment_text").prop("scrollHeight");
			var clientHeight02 = $(this).find(".admin_comment .text01").prop("clientHeight");
			var scrollHeight02 = $(this).find(".admin_comment .text01").prop("scrollHeight");
			
			$(".comment_box").not($(this)).removeClass("open");
	
			if(clientHeight < scrollHeight || clientHeight02 < scrollHeight02) {
				$(this).addClass("open");
				$(this).find('.more').text("댓글접기");
			}
			else if(clientHeight == scrollHeight || clientHeight02 == scrollHeight02) {
				$(this).removeClass("open");
				$(this).find('.more').text("댓글더보기");
			}
		});

		//댓글 수정/삭제 클릭
		$(".comment_box").not(".edit_comment").find(".edit button").unbind("click").bind("click",function(){
			event.stopPropagation();
		});

		$(".comment_box").not(".edit_comment").find(".like").unbind("click").bind("click",function(){
			event.stopPropagation();
		});


		// 테스트
		$(".sort_head_box.type_search .search_wrap").find(".btn_search").on("click",function(){
			$(this).parent().addClass("open");
		})
	},
	// 프로모션 이벤트 end ---------------------------------------------------------------------

	// 마이페이지 이벤트 start ---------------------------------------------------------------------
	mypage_event: function() {
		const tableItem = $(".order_table , .order_table_gray");
		tableItem.find(".custom_order span").on("click",function() {
			$(this).siblings(".custom_order_term").show();
		})
		tableItem.find(".custom_order_term .btn_close").on("click",function() {
			$(this).parent(".custom_order_term").hide();
		})

		//리뷰 오픈 이벤트
		$(".order_table_wrap").find(".review_btn").on("click",function(){
			const _this  =$(this);
			const reviewBox = $(this).parents("tr").next();
			const noticeComment = $(this).parents("td").siblings().find(".review_bubble");
				
			$(".order_table_wrap .review_btn").not(_this).removeClass("on");
			$(".order_table_wrap .review_layer").not(reviewBox).removeClass("open");
			$(".order_table_wrap .review_bubble").not(noticeComment).show();

			$(this).toggleClass("on");
			reviewBox.toggleClass("open");

			if(reviewBox.hasClass("open")) {
				noticeComment.hide();
			} else noticeComment.show();
		});

		 //상품Q&A, 1:1문의
		const tableList = $(".service_table, .request_table_box, .faq_table");

		tableList.find("tr").not(".answer_layer").click(function(){
			if($(this).hasClass("lock")){
				$(this).off("click");
			}else{
				$(this).next(".answer_layer").toggle();
				$("tr").not($(this)).next(".answer_layer").hide();
			}
        });

		
		// $(".request_table_box table, .faq_table table").find("tr").not(".answer_layer").click(function(){
        //     $(this).next(".answer_layer").toggle();
        //     $("tr").not($(this)).next(".answer_layer").hide();
        // });
	},
	// 마이페이지 이벤트 end ---------------------------------------------------------------------

	// 상품상세  이벤트 start ---------------------------------------------------------------------
	prd_page_event: function() {
		//상품상세 상단 nav 노출
		$(".product_nav").find("li span").click(function(){

			$(this).parents("li").siblings().find(".sub_layer").removeClass("on");
			$(this).parents("li").siblings().find("span").removeClass("on");

			$(this).toggleClass("on");
			$(this).siblings(".sub_layer").toggleClass("on");
		});

		//옵션선택 
		let scrollId;
		$(window).scroll(function(){ 
			clearTimeout(scrollId);
			scrollId = setTimeout(scrollEnd,200);
		});

		function scrollEnd() {
			if($(window).scrollTop() <= 100){
				$('.setitem_layout').find(".setitem_wrap").slideUp(200);
				$(".setitem_layout").removeClass("open");
			}
		}

		$(".setitem_layout").find(".setitem_btn button").on("click", function(){
			$(".setitem_layout").find(".setitem_wrap").slideToggle(300);
			$(".setitem_layout").toggleClass("open");
		});
		
		$(".product_info_guide .btn_area").find("button#selectPckageGodButton").off("click").on("click",function(){
			$(".setitem_layout").find(".setitem_wrap").slideDown(300);
			$(".setitem_layout").addClass("open");
		})

		$(".review_box .img_list").find(".vimeo_area").on('click',function(){
			event.stopPropagation();
		})

		$(".review_box").not(".blind").off("click").on("click",function(){
			$(".review_box").not($(this)).removeClass("open");
			$(".review_box").not($(this)).find('.btn_review_more').text("리뷰더보기");
			
			$(this).toggleClass("open");

			if($(this).hasClass("open")){
				$(this).find('.btn_review_more').text("리뷰접기");
			} else $(this).find('.btn_review_more').text("리뷰더보기"); 
		});
		
		// $(".review_box .info02").find(".like").on("click",function(){
		// 	event.stopPropagation();
		// 	$(this).toggleClass("on");
		// })

		$(".question_list_wrap").find(".question_box").on("click",function(){
			if($(this).attr("lock") == 'Y'){
				alert("비밀글 입니다.");
			} else {
				$(this).siblings().removeClass("open");
			   	$(this).toggleClass("open");
			}
		 });

		//상품상세 tab || test중
		const win = $(document), scrollContent = $('html, body'), 
		tabBox = $('.contents_product .product_info_tab'),
		tabList = tabBox.find('li'),
		sectionList = $('.prd_scroll_top');
		sectionList.wrapAll("<div></div>");

		let currentList = null, 
			topHeight = Number($('.product_info_tap').outerHeight(true) + $('.gnb_section').outerHeight(true)), 
			gab = 100;
		currentSort();

		function currentSort(){currentList = $('.product_info_tab li');}

		tabList.off('click').on('click', function(){
			let This = $(this), listScroll = null;
			if(sectionList.eq(This.index()).length > 0){
				listScroll = sectionList.eq(This.index()).offset().top - (topHeight + gab - 1);
				scrollContent.stop().animate({scrollTop: listScroll}, 300);
			}
		});

		win.off('scroll').on('scroll', function(){
			let scrollPos = win.scrollTop();
			sectionList.each(function(){
				let This = $(this), 
					thisPos = This.offset().top - (topHeight + gab), 
					thisHeight = This.outerHeight(true);
				if (scrollPos >= thisPos && scrollPos < thisPos + thisHeight) {
					tabList.removeClass('on');
					currentList.eq(This.index()).addClass('on');
				}
			});
		});

		//상품상세 상단 리뷰 클릭시 스크롤
		$(".prd_detail_section01 .review_info").find(".num").on("click",function() {
			var section = $(".prd_detail_section03");
			var offset;

			offset = section.offset();
			$('html, body').animate({scrollTop : offset.top - '190'}, 800);
		});

		//알림 툴팁
		$(".price_info").find(".coupon_notice").on("click", function(){
			$(this).parent().parent().find(".notice_pop").show();
		});
		$(".notice_pop").find(".close01").on("click", function(){
			$(this).parent().hide();
		});

	},
	// 상품상세  이벤트 end ---------------------------------------------------------------------
};
