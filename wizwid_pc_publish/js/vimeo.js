let vimeoAttr = [];
$(function(){
	const initvimeoArea = $('.vimeo_area'); 
	$('head').children('script').each(function(){vimeoAttr.push($(this).attr('src'));});
	if(!vimeoAttr.includes('https://player.vimeo.com/api/player.js')){
		const vimeoApi = `<div class='vimeo_api'><script type="text/javascript" src="https://player.vimeo.com/api/player.js">`;
		$('body').prepend(vimeoApi);
		console.log('vimeoApi add');
	}

	initvimeoArea.each(function(){
		let This = $(this);
		if(This.closest('.swiper-slide').length < 1){This.addClass('normal');}
	});
});

// vimeo Thumbnail
function get_vimeo_thumbnail(url, size, callback){
    let result;
    if(result = url.match(/vimeo\.com.*[\\\/](\d+)/)){
        let video_id = result.pop();
        if(size == 'small'){
            var video_link = encodeURIComponent("https://vimeo.com/" + video_id + "?width=480&height=360");
            $.getJSON('https://vimeo.com/api/oembed.json?url=' + video_link, function(data) {
                if(data && data.thumbnail_url){
                    if (typeof(callback) !== 'undefined') {
                        callback(data.thumbnail_url);
                    }
                }
            });
        }else{
            $.getJSON('http://vimeo.com/api/v2/video/' + video_id + '.json', function(data) {
                if(data){
                    if (typeof(callback) !== 'undefined') {
                        var thumbnail_src = data[0].thumbnail_large;
                        if(thumbnail_src){
                            callback(thumbnail_src);
                        }
                    }
                }
            });
        }
    }
}

//swiper Vimeo
function swiperVimeo(swiper){
	if(swiper.length != undefined){for(let i = 0; i < swiper.length; i++){chkVimeo(swiper[i]);}}else{chkVimeo(swiper);}
	function chkVimeo(swiper){
		if($(swiper.el).find(".swiper-slide").find('.vimeo_area').length > 0) {
			// 비메오 동영상 함수
			initVimeo(swiper);

			let vimeoArea = $(swiper.el).find('.vimeo_area'), timeOut = null, chkImgObj = null;
			resizeVimeo();

			let onImgLoad = function(el, callback){
				el.each(function(){
					(this.complete || $(this).height() > 0) ? callback.apply(this) : $(this).on('load', function(){callback.apply(this);});
				});
			};

			onImgLoad(chkImgObj, function(){
				//console.log('vimeo_img loaded');
				resizeVimeo();
				$(window).on('resize', function(){
					clearTimeout(timeOut);
					timeOut = setTimeout(resizeVimeo,100);
				});
			});

			
			function resizeVimeo(){
				$(swiper.el).find(".swiper-slide").each(function(){  
					let This = $(this);
					if(This.find('.vimeo_area').length < 1){
						chkImgObj = This.find('img:first-child');
						return false;
					}
				});
				if(!vimeoArea.parent().hasClass('vod01')){
					vimeoArea.css({'transition':'all 0s',height:chkImgObj.height()});
				}
			}

			//console.log('init swiper Vimeo !!');
		}
	}  
}

// initVimeo
function initVimeo(swiper){
	$(function(){
		setTimeout(function(){
			let vimeoArea = null, activeSwiper = null;
			if(swiper){
				vimeoArea = $(swiper.el).find('.vimeo_area');
				activeSwiper = $(swiper.el).find(".swiper-slide-active");
			}else{
				vimeoArea = $('.vimeo_area.normal');
			}

			if(vimeoArea.length){
				let vimeoPlayr = [];
				if(!vimeoArea.hasClass('loop')){
					vimeoArea.each(function(index){
						const This = $(this), thumb = This.find('.thumbnail_box'), pauseBtn = This.find('.pause_btn'), controls = This.find('iframe').attr('src').match('controls');
						This.attr('data-index', index);
	
						vimeoPlayr[index] = new Vimeo.Player(This.find('iframe'));
						vimeoPlayr[index].setAutopause(false);
						//vimeoPlayr[index].setMuted(true);
		
						vimeoPlayr[index].ready().then(function() {
							//console.log('video ready');
							
							if(thumb.length){
								thumb.find('.play_btn').off('click').on('click', function(){
									pauseBtn.show();
									thumb.css({'pointer-events':'none', opacity:0});
									if(swiper){$(swiper.el).find(".swiper-slide-active .vimeo_area iframe").css({opacity:1});}
									vimeoPlayr[index].play();
								});
							}

							if(pauseBtn.length){
								pauseBtn.off('click').on('click', function(){
									$(this).hide();
									thumb.css({'pointer-events':'auto', opacity:1});
									thumb.find('img').hide();
									vimeoPlayr[index].pause();
								});
							}
		
							if(controls && thumb.length){
								vimeoPlayr[index].on('ended', function() {
									thumb.css({'pointer-events':'auto', opacity:1});
									thumb.find('img').show();
									//console.log(`thumb show ended${index}`);
								});
							}
		
							vimeoPlayr[index].getDuration().then(function(duration) {
								//console.log(`video${index} getDuration = ${duration}`);
							});
							//vimeoPlayr[0].setCurrentTime(50.456);
						});
					});
		
					if(swiper){
						swiper.on('slideChangeTransitionStart', function(){
							vimeoArea.each(function(index){if(!$(this).hasClass('loop')){vimeoPlayr[index].pause();}});
						});
						swiper.on('slideChangeTransitionEnd', function(){
							activeSwiper = $(swiper.el).find(".swiper-slide-active");
							let activeVimeo = activeSwiper.find('.vimeo_area').attr('data-index');
							if(activeVimeo == undefined) return;
							if(activeSwiper.find('.vimeo_area').length > 0 && !activeSwiper.find('.vimeo_area').hasClass('loop') && activeSwiper.find(".play_btn").length < 1){vimeoPlayr[Number(activeVimeo)].play();}
						});
					}
				}
			}
		},500);
	});
}
