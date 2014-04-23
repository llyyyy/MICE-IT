$('#myTab a').click(function (e) {
e.preventDefault()
$(this).tab('show')
})

var articleData = [];
/**
	https://gist.github.com/tkissing/1347239
*/
var template  = function(a,b) { // a: template string, b: Object or Array with values to fill in
    // coerce a to a string
    return(a+'').replace(
            // search for anything with a mustache around it
            /\{\{([^{}]+)}}/g,
            function(c,d) { // c will be the complete placeholder, d the part between the mustaches
                // b is optional (but if passed, must be a type that is a valid operand for "in"
                return d in (b||{})
                        // if d is a method of b, call it, otherwise return its value
                        ? (/^f/.test(typeof b[d]) ? b[d]() :b[d] )
                        // if d is not a member of b, don't replace anything to allow nested calls like
                        // mstc(mstc(tmpl, obj), anotherObj)
                        : c;
            }
    );
};

/**
	https://github.com/niceaji/javascript-study/blob/gh-pages/doc/ajax.md
*/
function callAjax(url, callback) {
	var xmlhttp;
	// compatible with IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			callback(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function getDom(id) {
	return document.getElementById(id);
}

function newsTemplateAjax(templateString,articleData,length) {
	// 뉴스 템플릿
	var parseString = [];
	var news = '';
	for(var i=0; i<articleData[0].news.length; i++ ){
		news = articleData[0].news[i];
		
		parseString.push('<div class="articleContents"><ul>'
						+ template(templateString, {articleTitle : articleData[0].news[i].title, newsId : articleData[0].news[i].newsId})
						+ '</ul></div>');
	}
	var stringSplice = parseString.splice(0, typeof length != "undefined" ? length : parseString.length);
	getDom('newsContents').innerHTML = stringSplice.join("");
}

function enterTemplateAjax(templateString,articleData,length) {
	// 연예 템플릿
	var parseString = [];
	var enter = '';
	for(var i=0; i<articleData[1].enter.length; i++ ){
		enter = articleData[1].enter[i];
		parseString.push('<div class="articleContents"><li>'
						+ template(templateString, {articleTitle : articleData[1].enter[i].title, newsId : articleData[1].enter[i].newsId})
						+ '</li></div>');
	}
	var stringSplice = parseString.splice(0, typeof length != "undefined" ? length : parseString.length);
	getDom('enterContents').innerHTML = stringSplice.join("");
}

function sportsTemplateAjax(templateString,articleData,length) {
	// 스포츠 템플릿
	var parseString = [];
	var sports = '';
	for(var i=0; i<articleData[2].sports.length; i++ ){
		sports = articleData[2].sports[i];
		parseString.push('<div class="articleContents"><ul>'
						+ template(templateString, {articleTitle : articleData[2].sports[i].title, newsId : articleData[2].sports[i].newsId})
						+ '</ul></div>');
	}
	var stringSplice = parseString.splice(0, typeof length != "undefined" ? length : parseString.length);
	getDom('sportsContents').innerHTML = stringSplice.join("");
}

function moreBtnFunc() {
	var templateString = getDom('articleTemplate').innerHTML;
	newsTemplateAjax(templateString,articleData);
	enterTemplateAjax(templateString,articleData);
	sportsTemplateAjax(templateString,articleData);
}

function callbackArticleAjax(responseText) {

	// string 을 json 으로 변환
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
	var articleData = JSON.parse(responseText);
	var templateString = getDom('articleTemplate').innerHTML;
	var parseString = [];

	// articleData 분석 및 템플릿에 적용
	newsTemplateAjax(templateString,articleData,5);
	enterTemplateAjax(templateString,articleData,5);
	sportsTemplateAjax(templateString,articleData,5);

	var moreBtn = document.getElementById('moreArticleBtn');
	moreBtn.addEventListener("click", moreBtnFunc);
	window.articleData = articleData;
}

function contentsInit(){
	news = getDom('newsContents').children;
	enter = getDom('enterContents').children;
	sports = getDom('sportsContents').children;

	for(var i = 5, length = news.length ; i < length; i++) {
	 	news[5].remove();
	}
	for(var i = 5, length = enter.length ; i < length; i++) {
	 	enter[5].remove();
	}
	for(var i = 5, length = sports.length ; i < length; i++) {
	 	sports[5].remove();
}

// function showNews(){

// 	getDom('newsContents').className = "pop";
// 	getDom('enterContents').className = "hide";
// 	getDom('sportsContents').className = "hide";

// 	news = getDom('newsContents').children;
// 	for(var i = 5, length = news.length ; i < length; i++) {
// 	 	news[5].remove();
// 	}
// }

// function showEnter(){

// 	getDom('newsContents').className = "hide";
// 	getDom('enterContents').className = "pop";
// 	getDom('sportsContents').className = "hide";

// 	enter = getDom('enterContents').children;
// 	for(var i = 5, length = enter.length ; i < length; i++) {
// 	 	enter[5].remove();
// 	}
// }

// function showSports(){

// 	getDom('newsContents').className = "hide";
// 	getDom('enterContents').className = "hide";
// 	getDom('sportsContents').className = "pop";

// 	sports = getDom('sportsContents').children;
// 	for(var i = 5, length = sports.length ; i < length; i++) {
// 	 	sports[5].remove();
// 	}
// }

function start() {
	callAjax('articleData.js', callbackArticleAjax);
}


//시작 
start();