let tagArr = [], categoryArr = [], brandArr = [], colorArr = [], idArr = [], priceMinmax = [], priceValues = [], discountMinmax = [], discountValues = [],
rootWrap, filterWrap, moreFilter, filterContent, searchArea, checkList, noSearch, filterLnb,
tagList, btnReset, btnApply, btnClear, openTab, categoryWrap, categoryList, brandWrap,
brandList, colorList, chkPrice, chkDiscount, scrollId, aniId;

$(function(){
    initEl();
    filterEventHandle();
    chkTag(checkList);
    brandWrap.append(`<div class='check_clone' style='position:absolute; left:0; top:0; z-index:1000; display:none;'></div>`);
});

function initEl(){
    body = $('body'),
    rootWrap = $('#wrap'),
    filterWrap = $('.filter_wrap'),
    moreFilter = $('.filter_section .more_filter'),
    filterContent = $('.filter_content'),
    searchArea = $('.search_area'),
    checkList = $('.filter_section input[type="checkbox"]'),
    tagList = $('.filter_tag_list ul'),
    btnReset = $('.reset'),
    btnApply = $('.apply'),
    openTab = $('.filter_tab li'),
    filterLnb = $('.filter_lnb'),
    categoryWrap = $('.filter_category_wrap'),
    categoryList = $('.category_list'),
    brandWrap = $('.filter_brand_wrap'),
    brandList = $('.filter_brand_list'),
    colorList = $('.color_list'),
    noSearch = $('.no_search_list'),
    chkTitle='', chkPrice = '', chkDiscount ='';
    categoryList.find('.title_btn').remove();
    categoryList.find('h4, h5').append(`<button class="title_btn" style="left:0; top:0; width:calc(100% - 25px); height:100%; background: transparent; position:absolute; z-index:5;"></button>`);
    body.off('click');
    //body.find('input').off('click focus propertychange change keyup paste input');
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
        swapFilter(This.index());
    });

    // more filter
    moreFilter.off('click').on('click',function(){
        let This = $(this);
        This.toggleClass('on');
        (This.hasClass('on')) ? filterContent.addClass('on') : filterContent.removeClass('on');
        if(!openTab.hasClass('on')){swapFilter(0);}
    });

    //filter lnb
    filterLnb.find('.depth2 h3').off('click').on('click',function(){
        let This = $(this);
        This.parent().siblings().removeClass('on');
        (This.parent().hasClass('on')) ? This.parent().removeClass('on') : This.parent().addClass('on');
        lnbOpen();
    });

    function lnbOpen(){
        filterLnb.find('.depth3').stop().slideUp(200);
        filterLnb.find('.depth2.on').find('.depth3').stop().slideDown(200);
    }
    lnbOpen();
    
    // color list
    colorList.find('li').css({'overflow':'visible'}).off('click').on('click', function(){
        let This = $(this), value = `color_tag:${This.find('span').attr('style').replace('background:','').replace(';','').replace('background-color:','').replace(';','').trim()}`;
         //This.siblings().find('.color01').removeClass('on');
         if(!This.hasClass('on')){
            This.addClass('on');
            This.find('input').prop('checked', true);
            addArr(This, value);
            appendEl(value);
        }else{
            This.removeClass('on');
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
    // categoryList.find('.title_btn').off('click').on('click', function() {
    //     let This = $(this), parentList = This.closest('.category_list'), value;
    //     (This.closest('.depth3').length > 0) ? (This.closest('.depth3').prev().find('.title_text').addClass('title_on'), value = `title_tag:${This.closest('.depth3').prev().find('.title_text').text()} > ${This.parent().find('.title_text').text()}`) : value = `title_tag:${This.parent().find('.title_text').text()}`;
    //     parentList.siblings().find('.title_text').removeClass('title_on');
    //     parentList.siblings().find('.all_clear').removeClass('on');
    //     parentList.siblings().find('.depth3').removeClass('on');
    //     parentList.siblings().find('ul').removeClass('on');
    //     This.parent().siblings().find('.title_text').removeClass('title_on');
    //     This.parent().siblings().find('.all_clear').removeClass('on');
    //     This.parent().siblings().next('ul').removeClass('on');
    //     This.parent().next('.depth3').addClass('on');
    //     This.parent().find('.title_text').addClass('title_on');
    //     This.parent().find('.all_clear').addClass('on');
    //     This.parent().next('ul').addClass('on');
    //     categoryList.each(function(){
    //         let This = $(this);
    //         removeArr(categoryList, chkTitle);
    //         clearTag(This.find('input[type="checkbox"]'));
    //     });
    //     This.parent().find('.title_text input').prop('checked', true);
    //     addArr(This, value);
    //     appendEl(value);
    //     chkCount();
    //     chkTitle = value;
    // });

    // tag reset
    btnReset.off('click').on('click', function() {
        resetTag();
    });

    // brand event
    if(brandWrap.hasClass('on')){
        // let sortChange = brandWrap.find('.change_btn li'),
        // btnsearchDel = searchArea.find('.input_text_del'),
        // sortBox = brandWrap.find('.sort_box'),
        // scrollBox = brandWrap.find('.scroll_box');

        let scrollBox = brandWrap.find('.scroll_box');
        if(scrollBox.children().length < 21) {scrollBox.css({height:'auto'});}

        // sortChange.off('click').on('click',function(){
        //     let This = $(this);
        //     sortChange.removeClass('on');
        //     This.addClass('on');
        //     sortBox.removeClass('on');
        //     sortBox.eq(This.index()).addClass('on');
        //     scrollBox.scrollTop(0);
        //     sortBoxClick(brandWrap.find('.sort_box.on li'));
        // });

        // function sortBoxClick(el){
        //     el.removeClass('on');
        //     el.eq(0).addClass('on');
        //     el.off('click').on('click',function(){
        //         let This = $(this);
        //         This.siblings().removeClass('on');
        //         This.addClass('on');
        //     });
        // }
        // sortBoxClick(brandWrap.find('.sort_box.on li'));
    }

    // function changeTab(el){
    //     el.off('click').on('click',function(){
    //         let This = $(this);
    //         This.siblings().removeClass('on');
    //         This.addClass('on');
    //     });
    // }
    // changeTab(categoryWrap.find('.change_btn li'));
}

// checkbox Clone
function chkClone(){
    let brandInput = brandWrap.find('.scroll_box .checkbox01'), cloneObj = $('.check_clone'), cloneArr = brandArr, cloneId = [], chkString = 'filter_brand_';
    idArr.forEach((arr)=>{if(arr != undefined && arr.match(chkString)){cloneId.push(arr);}});
    cloneObj.children().remove();

    brandInput.each(function(index){
        let This = $(this), value = This.find('label').text().replace(/[0-9 | () | ,]/g,' ').trim();
        if(tagArr.includes(value)){
            cloneArr = brandArr.filter((arr) => arr != value);
            cloneId = cloneId.filter((arr) => arr != cloneId[index]);
        }
    });

    for(let i in cloneArr){
        let value = cloneId[i].replace(chkString,'');
        cloneObj.append(`<span class="checkbox01"><input type="checkbox" id="${cloneId[i]}" name="filter_brand" value="${value}" group="" checked><label for="${cloneId[i]}">${cloneArr[i]}</label></span>`);
    }
    checkList = $('.filter_section input[type="checkbox"]');
}

//swap page
function swapFilter(index){
    openTab.removeClass('on');
    filterWrap.removeClass('on');
    openTab.eq(index).addClass('on');
    filterContent.addClass('on');
    filterWrap.eq(index).addClass('on');
    moreFilter.addClass('on');
    filterEventHandle();
}

// append element
function appendEl(chk, del){
    tagList.find('li').remove();
    tagArr.forEach((arr) => {
        let chkClass = 'check_tag', arrSplit, colorObj = '';
        if(arr.match('title_tag:')){chkClass = 'title_tag';}
        if(arr.match('color_tag:')){chkClass = 'color_tag'; colorObj = `<span class='color_dot'><i style='background-color:${arr.replace('color_tag:','')}'></i></span>`}
        if(!arr.match('color_tag:') && !arr.match('title_tag:') && arr == chk || arr == chkPrice && chkPrice.length > 0 || arr == chkDiscount && chkDiscount.length > 0){
            chkClass = 'price_tag';
            (arr.match('%')) ? (arrSplit = arr.split('%'), $('#discount_min').val(arrSplit[0].trim()), $('#discount_max').val(arrSplit[1].replace('~', '').trim()), $('#discount_val').val(arr)) : 
            (arrSplit = arr.split('원'), $('#price_min').val(arrSplit[0].trim()), $('#price_max').val(arrSplit[1].replace('~', '').trim()), $('#price_val').val(arr));
        }
        tagList.append(`<li class="${chkClass}">${colorObj} ${arr.replace('title_tag:','').replace('color_tag:','')} <span class="del01">삭제</span></li>`);
    });

    let tagDelete = tagList.find('.del01');     
    tagDelete.off('click').on('click', function() {
        let This = $(this), value = This.parent().text().replace('삭제', '').trim();
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
                    This.removeClass('on');
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
        textVal = This.next('label').text().replace(/[0-9 | () | ,]/g,' ').trim(), chkVal = textVal, idVal = This.attr('id');
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
        textVal = This.next('label').text().replace(/[0-9 | () | ,]/g,' ').trim(), chkVal = textVal, idVal = This.attr('id');
        if(title.length > 0) {chkVal = `${title.text()} > ${textVal}`; removeArr(This, chkTitle);}
        if(depth3.length > 0) {chkVal = `${depth3.prev().find('.title_text').text()} > ${title.text()} > ${textVal}`; removeArr(This, chkTitle);}
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
    //console.log(`${priceMinmax[0]} / ${priceValues[0]} || ${discountMinmax} / ${discountValues}`);
    if(tagArr.length < 1){return;}
    tagArr = []; 
    categoryArr = []; 
    brandArr = []; 
    colorArr = [];
    idArr = [];
    chkPrice = '';
    chkDiscount = '';
    tagList.find('li').remove();
    checkList.each(function(){$(this).prop('checked', false);});
    colorList.find('li').removeClass('on');
    chkCount();

    const priceWrap = $('.filter_price_wrap'), discountWrap = $('.filter_discount_wrap');
    $('#price_val, #price_min, #price_max, #discount_val, #discount_min, #discount_max').val('');
    priceWrap.children().remove();
    discountWrap.children().remove();

    priceWrap.append(
        `<h3 class="drag-text"><strong>PRICE</strong></h3>
        <p class="drag-min-area"></p>
        <div class="drag-wrap n1">
            <div class="drag-box">
                <div class="thumb"></div>
                <div class="thumb"></div>
            </div>
        </div>
        <p class="drag-max-area"></p>`
    );

    discountWrap.append(
        `<h3 class="drag-text"><strong>DISCOUNT</strong></h3>
        <p class="drag-min-area"></p>
        <div class="drag-wrap n2">
            <div class="drag-box">
                <div class="thumb"></div>
                <div class="thumb"></div>
            </div>
        </div>
        <p class="drag-max-area"></p>`
    );

    dragEl(el='.drag-wrap.n1', minMax=[priceMinmax[0], priceMinmax[1]], values = [priceMinmax[0], priceMinmax[1]], type='원');
	dragEl(el='.drag-wrap.n2', minMax=[discountMinmax[0], discountMinmax[1]], values = [discountMinmax[0], discountMinmax[1]], type='%');
}

// drag El
function dragEl(el, minMax, values, type){
    let dragWrap = document.querySelectorAll(el), nums = [{num:0},{num:0}], id=[], textVal, coverObj, chkTouchPos = true;

    dragWrap.forEach((wrapEl)=>{
        let thumb = wrapEl.querySelectorAll('.thumb'),
        textArea = wrapEl.closest('.filter_wrap').querySelector('.drag-text'),
        minArea = wrapEl.closest('.filter_wrap').querySelector('.drag-min-area'),
        maxArea = wrapEl.closest('.filter_wrap').querySelector('.drag-max-area'),
        boxArea = wrapEl.querySelector('.drag-box');
 
        (wrapEl.classList.contains('n1')) ? (priceMinmax = minMax, priceValues = values) : (discountMinmax = minMax, discountValues = values);

        if(thumb.length > 1){
            let cover = document.createElement('div');
            cover.classList.add('cover');
            boxArea.append(cover);
        }

        thumb.forEach((thumbEl, index) => {
            textVal = document.createElement('em'); 
            textVal.classList.add('text-val');
            (index == 0) ? (textArea.append(textVal)) : (textArea.append(' ~ ') + textArea.append(textVal));
            textVal = textArea.querySelectorAll('.text-val');

            window.addEventListener('resize', initPos, false);
            thumbEl.addEventListener('mousedown', eventHandle, false);
            thumbEl.addEventListener('touchstart', eventHandle, false);
            thumbEl.ondragstart = function(){return false;};
            wrapEl.addEventListener('mousedown', touchPos, false);
            
            function touchPos(event){
                if(chkTouchPos && event.type == "mousedown") {
                    let typeX = event.clientX - wrapEl.getBoundingClientRect().left - 12,
                    pos0 = thumb[0].offsetLeft, pos1 = thumb[1].offsetLeft,
                    chkPos = ((coverObj.offsetLeft + coverObj.offsetWidth) / 2) + (thumbEl.offsetWidth * 2);
                    if(typeX < pos0){thumb[0].style.left = `${typeX}px`;}
                    if(typeX > pos1){thumb[1].style.left = `${typeX}px`;}
                    if(typeX > chkPos){thumb[1].style.left = `${typeX}px`;}
                    if(typeX < chkPos){thumb[0].style.left = `${typeX}px`;}
                    currentNum(thumb, index);
                    addList(typeX);
                }
            }

            function initPos(){
                let setLeft = 0;
                if(index > 0){setLeft = 100}
                thumb[1].style.left = `calc(100% - ${thumbEl.offsetWidth}px)`;
                clearInterval(id[index]);
                currentNum(thumb, index);
                if(values.length > 0){
                    id[index] = setInterval(()=>{
                        (index > 0) ? setLeft -- : setLeft ++;
                        thumbEl.style.left = `${setLeft}%`;
                        currentNum(thumb, index);
                        if(type == '%'){
                            if(textVal[index].innerText == `${values[index]}${type}`) {clearInterval(id[index]);}
                        }else{
                            let patch = textVal[index].innerText.replace(/[원 | ,]/g,'').trim(), chk = null;
                            (index > 0) ? chk = patch < values[index] : chk = patch > values[index];
                            if(chk) {
                                clearInterval(id[index]);
                                textVal[index].innerText = `${values[index].toLocaleString()}${type}`;
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
                shiftX = typeX - thumbEl.getBoundingClientRect().left;

                document.addEventListener('mousemove', addEvent, false);
                document.addEventListener('touchmove', addEvent, false);
                document.addEventListener('mouseup', removeEvent, false);
                document.addEventListener('touchend', removeEvent, false);
                
                function addEvent(event) {
                    (event.type == "touchmove") ? typeX = event.changedTouches[0].clientX : typeX = event.clientX;
                    let newLeft = typeX - shiftX - wrapEl.getBoundingClientRect().left, rightEdge = wrapEl.offsetWidth - thumbEl.offsetWidth;
                    if(thumb.length > 1){
                        let nextEdge = thumb[1].offsetLeft, prevEdge = thumb[0].offsetLeft;
                        if (nextEdge !='undefined' && index == 0 && newLeft > nextEdge) {newLeft = nextEdge;}
                        if (prevEdge !='undefined' && index == 1 && newLeft < prevEdge) {newLeft = prevEdge;}
                    }
                    if (newLeft < 0) {newLeft = 0;}
                    if (newLeft > rightEdge) {newLeft = rightEdge;}
                    thumbEl.style.left = `${newLeft}px`;
                    currentNum(thumb, index);
                }

                function removeEvent() {
                    chkTouchPos = false;
                    document.removeEventListener('mousemove', addEvent, false);
                    document.removeEventListener('touchmove', addEvent, false);
                    document.removeEventListener('mouseup', removeEvent, false);
                    document.removeEventListener('touchend', removeEvent, false);
                    addList(typeX);
                }
            }
        });

        function addList(typeX){
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
                    console.log('');
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

        function currentNum(thumb, index){
            coverObj = wrapEl.querySelector('.cover'),
            fixNum = Math.round(minMax[0] + (thumb[index].offsetLeft / wrapEl.offsetWidth) * (minMax[1] - minMax[0]));
            if (thumb[index].offsetLeft <= 0) {fixNum = minMax[0];}
            if (thumb[index].offsetLeft >= (wrapEl.offsetWidth - thumb[index].offsetWidth) - 1) {fixNum = minMax[1];}
            (type == '%') ? nums[index].num = `${fixNum}${type}` : nums[index].num = `${fixNum.toLocaleString()}${type}`;
            textVal[index].innerText = nums[index].num;
            minArea.innerText = `${minMax[0].toLocaleString()}${type}`;
            maxArea.innerText = `${minMax[1].toLocaleString()}${type}`;
            if(coverObj){
                coverObj.style.left = `${thumb[0].offsetLeft + (thumb[0].offsetWidth / 2)}px`;
                coverObj.style.width = `${thumb[1].offsetLeft - thumb[0].offsetLeft + (thumb[index].offsetWidth / 2)}px`;
            }
        }

    });
} 
