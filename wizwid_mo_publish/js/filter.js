let tagArr = [], categoryArr = [], brandArr = [], colorArr = [], idArr = [], priceMinmax = [], priceValues = [], discountMinmax = [], discountValues = [],
rootWrap, filterWrap, closeFilter, layerPopup, searchArea, checkList, noSearch,
tagList, btnReset, btnApply, btnClear, openTab, categoryWrap, categoryList, brandWrap,
brandList, colorList, initPage, chkPrice, chkDiscount, scrollId, aniId;

$(function(){
    initEl();
    swapPage(initPage);
    filterEventHandle();
    chkTag(checkList);
});

function initEl(){
    body = $('body'),
    rootWrap = $('#wrap'),
    filterWrap = $('.filter_wrap'),
    closeFilter = $('.close.filter'),
    layerPopup = $('.normal_popup.on'),
    searchArea = $('.search_area'),
    checkList = $('.filter_box input[type="checkbox"]'),
    tagList = $('.filter_tag_list ul'),
    btnReset = $('.btn_area .reset'),
    btnApply = $('.btn_area .apply'),
    btnClear = $('.all_clear'),
    openTab = $('.open_tab'),
    categoryWrap = $('.filter_category_wrap'),
    categoryList = $('.category_list'),
    brandWrap = $('.filter_brand_wrap'),
    brandList = $('.filter_brand_list'),
    colorList = $('.color_list'),
    initPage = $('.filter_main_wrap'),
    noSearch = $('.no_search_list'),
    chkTitle='', chkPrice = '', chkDiscount ='';
    categoryList.find('.title_btn').remove();
    categoryList.find('h4, h5').append(`<button class="title_btn" style="left:0; top:0; width:calc(100% - 25px); height:100%; background: transparent; position:absolute; z-index:5;"></button>`);
    // body.off('click');
    // body.find('input').off('click focus propertychange change keyup paste input');
}

function nosearchList(){
    let searchVal  = searchArea.find('input[type="text"]').val();
    if(searchVal.length > 0){
        noSearch.addClass('on');
        noSearch.find('h4 span').text(`"${searchVal}"`);
        brandList.removeClass('on');
        brandWrap.find('.sort_wrap').removeClass('on');
        brandWrap.find('.search_list, .search_total').removeClass('on');
    }
    return false;
}

function filterEventHandle(){
    //open Page
    openTab.off('click').on('click', function() {
        var This = $(this);
        if(This.hasClass('on')){swapPage(initPage);}
        
        if(This.hasClass('category_tab') && !This.hasClass('on')){
            swapPage($('.filter_category_wrap'));
        }
        if(This.hasClass('brand_tab') && !This.hasClass('on')){
            swapPage($('.filter_brand_wrap'));
        }
        if(This.hasClass('color_tab') && !This.hasClass('on')){
            swapPage($('.filter_color_wrap'));
        }
    });

    // color list
    colorList.find('li').css({'overflow':'visible'}).off('click').on('click', function(){
        let This = $(this), value = `color_tag:${This.find('span').attr('style').replace('background:','').replace(';','').replace('background-color:','').replace(';','').trim()}`;
        //This.siblings().find('.color01').removeClass('on');
        if(!This.find('.color01').hasClass('on')){
            This.find('.color01').addClass('on');
            This.find('input').prop('checked', true);
            addArr(This, value);
            appendEl(value);
        }else{
            This.find('.color01').removeClass('on');
            This.find('input').prop('checked', false);
            removeArr(colorList, value);
            appendEl(null, 'delete');
        }
        chkCount();
    });

    // check list
    checkList.off('click').on('click', function() {
        chkTag($(this));
    });

    //category list
    categoryList.find('.title_btn').off('click').on('click', function() {
        let This = $(this), parentList = This.closest('.category_list'), value;
        (This.closest('.depth3').length > 0) ? (This.closest('.depth3').prev().find('.title_text').addClass('title_on'), value = `title_tag:${This.closest('.depth3').prev().find('.title_text').text()} > ${This.parent().find('.title_text').text()}`) : value = `title_tag:${This.parent().find('.title_text').text()}`;
        parentList.siblings().find('.title_text').removeClass('title_on');
        parentList.siblings().find('.all_clear').removeClass('on');
        parentList.siblings().find('.depth3').removeClass('on');
        parentList.siblings().find('ul').removeClass('on');
        This.parent().siblings().find('.title_text').removeClass('title_on');
        This.parent().siblings().find('.all_clear').removeClass('on');
        This.parent().siblings().next('ul').removeClass('on');
        This.parent().next('.depth3').addClass('on');
        This.parent().find('.title_text').addClass('title_on');
        This.parent().find('.all_clear').addClass('on');
        This.parent().next('ul').addClass('on');
        categoryList.each(function(){
            let This = $(this);
            removeArr(categoryList, chkTitle);
            clearTag(This.find('input[type="checkbox"]'));
        });
        This.parent().find('.title_text input').prop('checked', true);
        addArr(This, value);
        appendEl(value);
        chkCount();
        chkTitle = value;
    });

    // check depth clear
    btnClear.off('click').on('click', function() {
        let This = $(this), chkInput = This.parent().parent().find('input[type="checkbox"]'), 
        parentList = This.closest('.category_list'), titltOn = $('.title_on'), depth3 = This.closest('.depth3');
        This.removeClass('on');        
        titltOn.find('input').prop('checked', false);
        titltOn.removeClass('title_on');

        clearTag(chkInput);
        
        if(depth3.length > 0) {
            let title = This.closest('.category_list').find('h4 .title_text'), value = `title_tag:${title.text()}`;
            title.addClass('title_on').find('input').prop('checked', true);
            parentList.find('ul').removeClass('on');
            addArr(This, value);
            appendEl(value);
            chkCount();
            chkTitle = value;
        }else{
            parentList.find('.depth3').removeClass('on');
        }
    });

    // tag reset
    btnReset.on('click', function() {
        resetTag();
    });

    // close filter
    // closeFilter.off('click').on('click', function() {
    //     layerPopup.removeClass('on');
    // });

    // brand event
    if(brandWrap.hasClass('on')){
        let sortChange = brandWrap.find('.sort_box .change_btn'),
        btnsearchDel = searchArea.find('.input_text_del');
        brandOff();
        brandScroll();

        btnsearchDel.off('click touchstart').on('click touchstart', function(){
            brandOff();
            searchArea.focus();
            return false;
        });

        // searchArea.find('input').off('click focus propertychange change keyup paste input').on('propertychange change keyup paste input', function(){
        //     brandOn();
        // });

        sortChange.off('click').on('click',function(){
            let sortBox = $(this).closest('.sort_box');
            sortBox.removeClass('on');
            sortBox.siblings().addClass('on');
            brandScroll();
        });

        function brandOn(){
            btnsearchDel.addClass('on');
            brandList.removeClass('on');
            noSearch.removeClass('on');
            brandWrap.find('.sort_wrap').removeClass('on');
            brandWrap.find('.search_list, .search_total').addClass('on');
        }

        function brandOff(){
            searchArea.find('input[type="text"]').val('');
            btnsearchDel.removeClass('on');
            brandList.addClass('on');
            noSearch.removeClass('on');
            brandWrap.find('.sort_wrap').addClass('on');
            brandWrap.find('.search_list, .search_total').removeClass('on');
        }
        
        function brandScroll(){
            let currentSort = brandWrap.find('.sort_box.on'), sortBtn = currentSort.find('li'),
            layerHeight = layerPopup.find('.head_box').innerHeight(), itemPt = 40, aniSpeed = 300,
            gab = layerPopup.find('.filter_brand').css('padding-top').replace('px', '') / 3, 
            topHeight = (openTab.innerHeight() + layerPopup.find('.filter_fix_box').innerHeight() + layerHeight + gab), scrollPos;
            brandList.css({paddingBottom:layerHeight*9});
            brandList.find('h4').wrap(`<div class="fix_title"></div>`);
            layerPopup.scrollTop(0);

            sortBtn.off('click').on('click',function(){ 
                let This = $(this), listItem = brandList.find('.list_box').eq(This.index()),
                scrollPos = layerPopup.scrollTop(), listPos;
                if(listItem.length > 0){
                    listItem.siblings().find('.fix_title').removeClass('on');
                    listItem.find('.fix_title').addClass('on');
                    listItem.find('.fix_title.on').css({top: Math.round(topHeight) + 7});
                    listItem.siblings().css({paddingTop:0});
                    listItem.css({paddingTop:itemPt});
                    listPos = (scrollPos + listItem.offset().top) - topHeight;
                    layerPopup.stop().animate({scrollTop:listPos - (itemPt - 14)}, aniSpeed);
                }
            });

            layerPopup.off('scroll').on('scroll', function(){
                scrollPos = layerPopup.scrollTop();
                brandList.find('.list_box').each(function(index){
                    let This = $(this), thisPos = (scrollPos + This.offset().top) - topHeight, thisHeight = This.innerHeight(), 
                    sortList = currentSort.find('.list01'), sortWidth = (sortBtn.width()*2) - 5;
                    if (scrollPos > (thisPos - gab) && scrollPos < thisPos + thisHeight) {
                        This.siblings().find('.fix_title').removeClass('on');
                        This.find('.fix_title').addClass('on');
                        This.find('.fix_title.on').css({top: Math.round(topHeight) + 7});
                        This.siblings().css({paddingTop:0});
                        This.css({paddingTop:itemPt});
                        sortList.stop().animate({scrollLeft:sortWidth*This.index()}, aniSpeed);
                    }
                });
            });
        }
    }
}

//swap page
function swapPage(el){
    filterWrap.removeClass('on');
    el.addClass('on');
    layerPopup.scrollTop(0);
    filterEventHandle();
}

// append element
function appendEl(chk, del){
    tagList.find('li').remove();
    tagArr.forEach((arr) => {
        let chkClass = 'check_tag', arrSplit;
        if(arr.match('title_tag:')){chkClass = 'title_tag';}
        if(arr.match('color_tag:')){chkClass = 'color_tag';}
        if(!arr.match('color_tag:') && !arr.match('title_tag:') && arr == chk || arr == chkPrice && chkPrice.length > 0 || arr == chkDiscount && chkDiscount.length > 0){
            chkClass = 'price_tag';
            (arr.match('%')) ? (arrSplit = arr.split('%'), $('#discount_min').val(arrSplit[0].trim()), $('#discount_max').val(arrSplit[1].replace('~', '').trim()), $('#discount_val').val(arr)) : 
            (arrSplit = arr.split('원'), $('#price_min').val(arrSplit[0].trim()), $('#price_max').val(arrSplit[1].replace('~', '').trim()), $('#price_val').val(arr));
        }
        tagList.append(`<li class="${chkClass}"> ${arr.replace('title_tag:','').replace('color_tag:','')} <span class="del01">삭제</span></li>`);
    });

    let tagDelete = tagList.find('.del01');     
    tagDelete.off('click').on('click', function() {
        let This = $(this), value = This.parent().text().replace('삭제', '').trim();
        //console.log(tagArr);
        tagArr.forEach((arr) => {if(arr.includes(value)){value = arr;}});

        if(This.parent().hasClass('price_tag')){
            removeArr(null, value);
            if(value == chkPrice){chkPrice = '';}
            if(value == chkDiscount){chkDiscount = '';}
            appendEl(null, 'delete');
        }
        if(This.parent().hasClass('title_tag')){
            removeChktitle();
            removeArr(categoryList, value);
            appendEl(null, 'delete');
            chkCount();
        }
        if(This.parent().hasClass('color_tag')){
            removeArr(colorList, value);
            appendEl(null, 'delete');
            chkCount();
            colorList.find('li').each(function(){
                let This = $(this),
                chkVal = `color_tag:${This.find('span').attr('style').replace('background:','').replace(';','').replace('background-color:','').replace(';','').trim()}`;
                if(chkVal == value){
                    This.find('.color01').removeClass('on');
                    This.find('input').prop('checked', false);
                }
            }); 
        }
        if(This.parent().hasClass('check_tag')){
            removeChktitle();
            chkTag(checkList, value, 'delete');
        }
    });

    if(!del && tagArr.length > 0){
        let tagEl = tagList.parent(), tagItem = tagList.find('li'), tagScroll = tagEl.scrollLeft() + tagItem.eq(tagArr.length-1).offset().left;
        tagEl.stop().animate({scrollLeft:tagScroll}, 300);
    }
}

// remove checkbox title
function removeChktitle(){
    if(categoryWrap.hasClass('on')){
        let titltOn = $('.title_on');
        titltOn.find('input').prop('checked', false);
        titltOn.removeClass('title_on');
    }
}

// add array
function addArr(el, chkVal, idVal){
    if(!tagArr.includes(chkVal)){tagArr.push(chkVal)};
    if(!idArr.includes(idVal)){idArr.push(idVal)};
    if(el){
        let chkEl = el.closest('.filter_wrap');
        if(chkEl.hasClass('filter_category_wrap')){if(!categoryArr.includes(chkVal)){categoryArr.push(chkVal)}}
        if(chkEl.hasClass('filter_brand_wrap')){if(!brandArr.includes(chkVal)){brandArr.push(chkVal)}}
        if(chkEl.hasClass('filter_color_wrap')){if(!colorArr.includes(chkVal)){colorArr.push(chkVal)}}
    }
}

// remove Array
function removeArr(el, chkVal, idVal){
    tagArr = tagArr.filter((arr) => arr != chkVal);
    if(idVal){idArr = idArr.filter((arr) => arr != idVal);}
    if(el){
        let chkEl = el.closest('.filter_wrap');
        if(chkEl.hasClass('filter_category_wrap')){categoryArr = categoryArr.filter((arr) => arr != chkVal)}
        if(chkEl.hasClass('filter_brand_wrap')){brandArr = brandArr.filter((arr) => arr != chkVal)}
        if(chkEl.hasClass('filter_color_wrap')){colorArr = colorArr.filter((arr) => arr != chkVal)}
    }
}

// check count
function chkCount(){
    openTab.each(function(){
        let This = $(this);
        if(This.hasClass('category_tab')){This.find('.count').text(categoryArr.length)}
        if(This.hasClass('brand_tab')){This.find('.count').text(brandArr.length)}
        if(This.hasClass('color_tab')){This.find('.count').text(colorArr.length)}
    });
}

// chk tag
function chkTag(el, value, del){
    el.each(function(){
        let This = $(this), title = This.closest('ul').prev().find('.title_text'), depth3 = This.closest('.depth3'),
        textVal = This.next('label').text().replace(/[0-9|()|,|a-zA-Z|.|\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,'').trim(), chkVal = textVal, idVal = This.attr('id');

        // let textEng = textVal.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');
        // if(textEng.length > 10){
        //     textVal = textVal.replace(textEng, textEng.substring(0,10)+'... ');
        //     chkVal = textVal;
        // }
        
        if(title.length > 0) {chkVal = `${title.text()} > ${textVal}`; removeArr(This, chkTitle);}
        if(depth3.length > 0) {chkVal = `${depth3.prev().find('.title_text').text()} > ${title.text()} > ${textVal}`; removeArr(This, chkTitle)}
        if(value && chkVal == value){This.prop('checked', false);}
        if(This.is(':checked')) {
            if(!idArr.includes(idVal) && chkVal != ''){
                addArr(This, chkVal, idVal);
                if(title.length > 0) {title.addClass('title_on');}
                if(depth3.length > 0) {depth3.prev().find('.title_text').addClass('title_on'); }
                //console.log('체크됨 / '+ idArr);
            }
        }else{
            if(idArr.includes(idVal)){
                removeArr(This, chkVal, idVal);
            }
        }
        $('.title_text').find('input').prop('checked', false);
    });
    (del) ? appendEl(null, 'delete') : appendEl();
    chkCount();
}

// clear tag
function clearTag(el){
    el.each(function(){
        let This = $(this), title = This.closest('ul').prev().find('.title_text'), depth3 = This.closest('.depth3'),
        textVal = This.next('label').text().replace(/[0-9|()|,|a-zA-Z|.|\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,'').trim(), chkVal = textVal, idVal = This.attr('id');

        // let textEng = textVal.replace(/[ㄱ-ㅎ|ㅏ-ㅣ| 가-힣]/g,'');
        // if(textEng.length > 10){
        //     textVal = textVal.replace(textEng, textEng.substring(0,10)+'... ');
        //     chkVal = textVal;
        // }

        if(title.length > 0) {chkVal = `${title.text()} > ${textVal}`; removeArr(This, chkTitle);}
        if(depth3.length > 0) {chkVal = `${depth3.prev().find('.title_text').text()} > ${title.text()} > ${textVal}`; removeArr(This, chkTitle); }
        if(title.length == 0 && depth3.length == 0){removeArr(This, chkTitle);}
        This.prop('checked', false);
        if(idArr.includes(idVal)){
            removeArr(This, chkVal, idVal);
        }
    });
    appendEl(null, 'delete');
    chkCount();
}

// reset tag
function resetTag(){
    if(tagArr.length < 1){console.log(tagArr.length); return}
    tagArr = []; 
    categoryArr = []; 
    brandArr = []; 
    colorArr = [];
    idArr = [];
    chkPrice = '';
    chkDiscount = '';
    tagList.find('li').remove();
    checkList.each(function(){$(this).prop('checked', false);});
    colorList.find('li .color01').removeClass('on');
    categoryList.find('.title_text').removeClass('title_on');
    categoryList.find('.all_clear, .depth3, .depth3 ul').removeClass('on');
    chkCount();
    swapPage(initPage);

    const priceWrap = $('.drag-wrap.n1'), discountWrap = $('.drag-wrap.n2');
    $('#price_val, #price_min, #price_max, #discount_val, #discount_min, #discount_max').val('');
    priceWrap.children().remove();
    discountWrap.children().remove();

    priceWrap.append(
        `<h3 class="drag-text"><strong>PRICE</strong></h3>
        <div class="drag-box">
            <div class="thumb"></div>
            <div class="thumb"></div>
        </div>
        <div class="drag-val"></div>`
    );

    discountWrap.append(
        `<h3 class="drag-text"><strong>DISCOUNT</strong></h3>
        <div class="drag-box">
            <div class="thumb"></div>
            <div class="thumb"></div>
        </div>
        <div class="drag-val"></div>`
    );

    dragEl(el='.drag-wrap.n1', minMax=[priceMinmax[0], priceMinmax[1]], values = [priceMinmax[0], priceMinmax[1]], type='원');
	dragEl(el='.drag-wrap.n2', minMax=[discountMinmax[0], discountMinmax[1]], values = [discountMinmax[0], discountMinmax[1]], type='%');
}

// drag El 
function dragEl(el, minMax, values, type){
    let dragWrap = document.querySelectorAll(el), nums = [{num:0},{num:0}], id=[], coverObj, chkTouchPos = true;
    dragWrap.forEach((wrapEl)=>{
        let thumb = wrapEl.querySelectorAll('.thumb'),
        textArea = wrapEl.querySelector('.drag-text'),
        valArea = wrapEl.querySelector('.drag-val');
        boxArea = wrapEl.querySelector('.drag-box');
        
        (wrapEl.classList.contains('n1')) ? (priceMinmax = minMax, priceValues = values) : (discountMinmax = minMax, discountValues = values);
        
        if(thumb.length > 1){ 
            let cover = document.createElement('div');
            cover.classList.add('cover');
            boxArea.append(cover);
        }

        thumb.forEach((el, index) => {
            let textVal = document.createElement('em'), dragVal = document.createElement('span');
            textVal.classList.add('text-val');
            dragVal.classList.add('text-val');
            (index == 0) ? (textArea.append(textVal)) : (textArea.append(' ~ ') + textArea.append(textVal));
            valArea.append(dragVal);
            
            // window.addEventListener('resize', initPos, false);
            el.addEventListener('mousedown', eventHandle, false);
            el.addEventListener('touchstart', eventHandle, false);
            el.ondragstart = function(){return false;};
            wrapEl.addEventListener('touchstart', touchPos, false);
            
            function touchPos(event){
                if(chkTouchPos && event.type == "touchstart") {
                    let typeX = event.touches[0].clientX - el.offsetWidth - 5, 
                    pos0 = thumb[0].offsetLeft, pos1 = thumb[1].offsetLeft,
                    chkPos = ((coverObj.offsetLeft + coverObj.offsetWidth) / 2) + (el.offsetWidth * 2);
                    if(typeX < pos0){thumb[0].style.left = `${typeX}px`;}
                    if(typeX > pos1){thumb[1].style.left = `${typeX}px`;}
                    if(typeX > chkPos){thumb[1].style.left = `${typeX}px`;}
                    if(typeX < chkPos){thumb[0].style.left = `${typeX}px`;}
                    currentNum();
                }
            }

            function initPos(){
                let setLeft = 0;
                if(index > 0){setLeft = 100}
                thumb[1].style.left = `calc(100% - ${el.offsetWidth}px)`;
                clearInterval(id[index]);
                currentNum();
                if(values.length > 0){
                    id[index] = setInterval(()=>{
                        (index > 0) ? setLeft -- : setLeft ++;
                        el.style.left = `${setLeft}%`;
                        currentNum();
                        if(type == '%'){
                            if(textVal.innerText == `${values[index]}${type}`) {clearInterval(id[index]);}
                        }else{
                            let patch = textVal.innerText.replace(/[원 | ,]/g,'').trim(), chk = null;
                            (index > 0) ? chk = patch < values[index] : chk = patch > values[index];
                            if(chk) {
                                clearInterval(id[index]);
                                textVal.innerText = `${values[index].toLocaleString()}${type}`;
                            }
                        }
                    },5);
                    if(values[0] <= minMax[0]) {clearInterval(id[0]);}
                    if(values[1] >= minMax[1]) {clearInterval(id[1]);}
                }
            }
            initPos();

            function eventHandle(event){
                let typeX, shiftX;
                event.preventDefault();
                removeEvent();
                (event.type == "touchstart") ? typeX = event.touches[0].clientX : typeX = event.clientX;
                shiftX = typeX - el.getBoundingClientRect().left;

                document.addEventListener('mousemove', addEvent, false);
                document.addEventListener('touchmove', addEvent, false);
                document.addEventListener('mouseup', removeEvent, false);
                document.addEventListener('touchend', removeEvent, false);
                
                function addEvent(event) {
                    (event.type == "touchmove") ? typeX = event.changedTouches[0].clientX : typeX = event.clientX;
                    let newLeft = typeX - shiftX - wrapEl.getBoundingClientRect().left, rightEdge = wrapEl.offsetWidth - el.offsetWidth;
                    if(thumb.length > 1){
                        let nextEdge = thumb[1].offsetLeft, prevEdge = thumb[0].offsetLeft;
                        if (nextEdge !='undefined' && index == 0 && newLeft > nextEdge) {newLeft = nextEdge;}
                        if (prevEdge !='undefined' && index == 1 && newLeft < prevEdge) {newLeft = prevEdge;}
                    }
                    if (newLeft < 0) {newLeft = 0;}
                    if (newLeft > rightEdge) {newLeft = rightEdge;}
                    el.style.left = `${newLeft}px`;
                    currentNum();
                }

                function removeEvent() {
                    chkTouchPos = false;
                    document.removeEventListener('mousemove', addEvent, false);
                    document.removeEventListener('touchmove', addEvent, false);
                    document.removeEventListener('mouseup', removeEvent, false);
                    document.removeEventListener('touchend', removeEvent, false);
                    if(typeX != undefined){
                        chkTouchPos = true;
                        if(type == '%'){
                            let discount = textArea.innerText.replace('DISCOUNT','').trim();
                            priceDiscount(discount, chkDiscount);
                            chkDiscount = discount;
                        }else{
                            let price = textArea.innerText.replace('PRICE','').trim();
                            priceDiscount(price, chkPrice);
                            chkPrice = price;
                        }
                    }
                }
            }
            function priceDiscount(val, chk) {
                if(chk != '' && val != chk) {
                    tagArr.forEach((arr, idx) => {if(arr.includes(chk)){tagArr[idx] = val}});
                    appendEl(val);
                }else{
                    if(!tagArr.includes(val)){addArr(null, val); appendEl(val);}
                }
            }

            function currentNum(){
                coverObj = wrapEl.querySelector('.cover'),
                fixNum = Math.round(minMax[0] + (thumb[index].offsetLeft / wrapEl.offsetWidth) * (minMax[1] - minMax[0]));
                if (thumb[index].offsetLeft <= 0) {fixNum = minMax[0];}
                if (thumb[index].offsetLeft >= (wrapEl.offsetWidth - el.offsetWidth) - 1) {fixNum = minMax[1];}
                (type == '%') ? nums[index].num = `${fixNum}${type}` : nums[index].num = `${fixNum.toLocaleString()}${type}`;
                textVal.innerText = nums[index].num;
                dragVal.innerText = `${minMax[index].toLocaleString()}${type}`;
                if(coverObj){
                    coverObj.style.left = `${thumb[0].offsetLeft + (thumb[0].offsetWidth / 2)}px`;
                    coverObj.style.width = `${thumb[1].offsetLeft - thumb[0].offsetLeft + (el.offsetWidth / 2)}px`;
                }
            }
        });
    });
} 