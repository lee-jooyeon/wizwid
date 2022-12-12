/***************************************
 * 환경변수
 ***************************************/

// 이미지 Path
var IMG_PATH = "./tree/image/menu/";
var EXT_PATH = "./tree/image/menu/ext/";

// 가로 : 21px
var IMG_WIDTH   = "18";

// 세로 : 19px
var IMG_HEIGHT  = "18";

// 이미지 파일이름
var blank       = "blank.gif";
var blank_LINE  = "blank_line.gif";
var CLOSE       = "close.gif";
var CLOSE_END   = "close_end.gif";
var DIR         = "dir.gif";
var DIR_OPEN    = "dir_open.gif";
var OPEN        = "open.gif";
var OPEN_END    = "open_end.gif";
var NOCHILD        = "join.gif";
var NOCHILD_END    = "joinbottom.gif";
var NODE        = "paper.gif";

// 파일 확장자 이미지

/***************************************
 * 기타변수
 ***************************************/



/***************************************
 * 시스템 변수
 ***************************************/

var MEMORY     = new Array();
var ITEM       = new Array();
var LEVEL      = new Array();

// 폴더 오픈 히스토리
// 해쉬 테이블 형식으로 저장
var folderHistory = new Object();

var IS_FIRST   = true;
var PREV_LEVEL = 0;
// 폴더를 두개 이상을 사용할경우 쿠키 이름으로 구분한다.
// 사용하는 페이지 쪽에서 값을 넣어줘야 한다.
var categoryCookieName = "DefaultCookieName";

//현재 폴더 오픈 정보를 쿠키에 저장
// util.js 파일을 열러져 있어야 된다. (쿠기 관련되 함수가 있기때문)
function saveCookie(){
	var ckValue = "";
	for (key in folderHistory) {
		// 해당 폴더가 열러져 있다면 기록
		if(folderHistory[key]){

			// 오픈된 폴더에 아이디를
			// 2,11,23,47,88 ... 이런식으로 쿠기에다가 저장한다.

			if(ckValue != ""){
				ckValue += ",";
			}
			ckValue += key;
		}
	}
	jf_setCookie(categoryCookieName, ckValue);
}

// 폴더가 이전에 열러진 정보대로 오픈한다.
// - 다른 페이지에 갔다가 다시 올때 그전에 열려진 정보를 그대로 유지하기 위해서
function initOpen(openCategoryID){
	initTree();
	var ck = jf_getCookie(categoryCookieName);
	var i,j;
	if(ck != null){
		var sp = ck.split(",");
		var i;

		for(i=0;i<sp.length;i++){
			MEMORY[sp[i]].open = true;
			folderHistory[sp[i]] = true;
		}
	}

	if( openCategoryID != null){
	  for(i = 1 ;i < openCategoryID.length - 1; i++){
	    for(j =0;j<MEMORY.length;j++){
        if(MEMORY[j].cat_id == openCategoryID[i]){
    			MEMORY[j].open = true;
    			folderHistory[j] = true;
        }
	    }
	  }
	}
	initTree();
}

// OPEN/CLOSE Toggle
function toggle( index )
{
	var ban;
	if( MEMORY[index].open == false ){
		MEMORY[index].open = true;
		folderHistory[index] = true;
	}
	else{
		MEMORY[index].open = false;
		folderHistory[index] = false;
	}
	initTree();
	saveCookie(); //현재 폴더 오픈 정보를 쿠키에 저장
}

// 보여줘야 하는 Item 추출
function extractItem()
{
     var buff = new Array();
     var close_top_level = null;

     for( var i = 0 ; i < MEMORY.length ; i++ )
     {
          if( close_top_level == null )
          {
               if( MEMORY[i].open == false )
               {
                    var cnt = buff.length;
                    buff[cnt] = MEMORY[i];
                    buff[cnt].index = i;
                    close_top_level = MEMORY[i].level;
               }
               else
               {
                    var cnt = buff.length;
                    buff[cnt] = MEMORY[i];
                    buff[cnt].index = i;
               }
          }
          else if( close_top_level < MEMORY[i].level )
          {
               continue;
          }
          else if( close_top_level >= MEMORY[i].level )
          {
               var cnt = buff.length;
               buff[cnt] = MEMORY[i];
               buff[cnt].index = i;

               if( MEMORY[i].open == false )
               {
                    close_top_level = MEMORY[i].level;
               }
               else
               {
                    close_top_level = null;
                    continue;
               }
          }
     }

     return buff;
}

// HTML 생성
function makeTree()
{
     var text = "";

     text += "<table border='0' cellspacing='0' cellpadding='0'>";

     for( var i = 0 ; i < ITEM.length ; i++ )
     {
          if( true )
          {
               text += "<tr>"
                     + "<td>"

                     + "<table border='0' cellspacing='0' cellpadding='0'>"
                     + "<tr>"
                     + "<td style='white-space:nowrap'>";

               text += getblankImage(i);

               text += getLinkerImage(i);

               text += getDirImage(i);

               text += "</td>"
                     + "<td style='text-align:left;vertical-align:bottom;white-space:nowrap'>";

               if( ITEM[i].link != null && ITEM[i].link != "" )
               {
                    text += "<a href='" + ITEM[i].link + "' target='" + ITEM[i].target + "'>"
                          + "&nbsp;" + ITEM[i].desc
                          + "</a>";

										// 카테고리 아이디 값이 있으면 복사 아이콘 넣기
										if(ITEM[i].cat_id != null){
                    	text += " <img src='"+IMG_PATH+"'icon_copy.gif' alt='" + ITEM[i].cat_id + "' onclick=\"jf_copyClipboard('" + ITEM[i].cat_id + "')\" style='cursor:pointer' >";
                    }
               }
               else
               {
                    text += "&nbsp;<a href='JavaScript:toggle(" + ITEM[i].index + ");' class='folder'>" + ITEM[i].desc + "</a>";
               }

               text += "</td>"
                     + "</tr>"
                     + "</table>"
                     + "</td>"
                     + "</tr>";
          }
     }

     text += "</table>";
     return text;
}

// blank/LINE_blank 이미지 삽입
function getblankImage(index)
{
     var temp = "";
     var image = "";

     if( PREV_LEVEL > ITEM[index].level )
          delLEVEL(ITEM[index].level);

     for( var i = 0 ; i < ITEM[index].level ; i++ )
     {
          if( LEVEL[i] != null )
          {
               if( LEVEL[i] == true )
               {
                    image = blank_LINE;
               }
               else
               {
                    image = blank;
               }
          }
          else
          {
               if( isLine(index , i)  )
               {
                    image = blank_LINE;
                    LEVEL[i] = true;
               }
               else
               {
                    image = blank;
                    LEVEL[i] = false;
               }
          }

          temp += "<IMG border=0 src=" + IMG_PATH + image + " width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">";
     }

     PREV_LEVEL = ITEM[index].level
     return temp;
}

// LEVEL 의 부정확한 값 삭제.
function delLEVEL(present_level)
{
     if( LEVEL != null )
     {
          for( var i = 0 ; i < LEVEL.length ; i++ )
          {
               if( i < present_level )
                    continue;

               LEVEL[i] = null;
          }
     }
}

// OPEN/CLOSE 이미지 삽입.
function getLinkerImage(index)
{
     var temp = "";
     var image = "";

     if( ITEM[index].open == false )
          image = CLOSE;
     else
          image = OPEN;

     if( ITEM[index].dir == true )
          temp += "<A href='JavaScript:toggle(" + ITEM[index].index + ");'>"

     if( isEndNode(index) )
     {
          if( ITEM[index].open == false )
          {

               temp += "<IMG border=0 src=" + IMG_PATH + OPEN + " alt=열기 width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">"; 
          }

          else {
if ( ITEM[index].dir == false ) { temp += "<IMG border=0 src=" + IMG_PATH + NOCHILD + " alt=닫기 width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">";  }
	else { temp += "<IMG border=0 src=" + IMG_PATH + CLOSE + " alt=닫기 width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">"; }
          }
     }
     else
     {
          if( ITEM[index].open == false )
          {
               temp += "<IMG border=0 src=" + IMG_PATH + OPEN_END + " alt=열기 width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">";
          }
          else
          {
if ( ITEM[index].dir == false ) { temp += "<IMG border=0 src=" + IMG_PATH + NOCHILD_END + " alt=닫기 width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">";  }
            else {   temp += "<IMG border=0 src=" + IMG_PATH + CLOSE_END  + " alt=닫기 width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">"; }
          }
     }

     if( ITEM[index].dir == true )
          temp += "</A>"

     return temp;
}

// 디렉토리 이미지 삽입
function getDirImage(index)
{
     var temp = "";

     if( ITEM[index].dir == true )
          temp += "<A href='JavaScript:toggle(" + ITEM[index].index + ");'>"

     if( ITEM[index].dir == true )
     {
          if( ITEM[index].open == true )
          {
               temp += "<IMG border=0 src=" + IMG_PATH + DIR_OPEN + " width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">";
          }
          else
          {
               temp += "<IMG border=0 src=" + IMG_PATH + DIR + " width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">";
          }
     }
     else
     {
    	if( ITEM[index].ext_image == null )
          {
               temp += "<IMG border=0 src=" + IMG_PATH + NODE + " width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">";
          }
          else
          {
               temp += "<IMG border=0 src=" + EXT_PATH + ITEM[index].ext_image + " width=" + IMG_WIDTH + " height=" + IMG_HEIGHT + ">";
          }
     }

     if( ITEM[index].dir == true )
          temp += "</A>"

     return temp;
}

// 마지막 노드인테 체크.
function isEndNode(index)
{
     var result = false;

     for( var i = (index + 1) ; i < ITEM.length ; i++ )
     {
          if( ITEM[i].level == ITEM[index].level )
          {
               result = true;
               break;
          }
          else if( ITEM[i].level < ITEM[index].level )
          {
               result = false;
               break;
          }
     }

     return result;
}

// 점선 이미지 Drawing 여부 체크.
function isLine(index, level)
{
     var result = false;

     for( var i = index ; i < ITEM.length ; i++ )
     {
          if( ITEM[i].level < level )
          {
               result = false;
               break;
          }
          else if( ITEM[i].level == level )
          {
               result = true;
               break;
          }
     }

     return result;
}


// MEMORY Array에 데이타 저장.

// addMemory( 디렉토리여부[true/false] , 메뉴의깊이[숫자] , 링크의 대상프레임 , DefaultOpen[true/false] , 필드명 , 링키URL );
function addMemory( dir , level , target , desc , link , ext_image, cat_id )
{
     var index = MEMORY.length;
     MEMORY[index] = new Object;
     MEMORY[index].dir    = dir;
     MEMORY[index].level  = level;
     MEMORY[index].target = target;
     MEMORY[index].desc   = desc;
     MEMORY[index].link   = link;

     if( MEMORY[index].dir == false )
          MEMORY[index].open = true;
     else
          MEMORY[index].open = false;

     if( ext_image != null )
          MEMORY[index].ext_image = ext_image;

		 // 카테고리 아이디 (CMS에서만 사용되는 요소)
     if( cat_id != null )
          MEMORY[index].cat_id = cat_id;
}

function setInit()
{
     MEMORY = new Array();
     IS_FIRST = true;
     initTree();
	 initOpen();
}