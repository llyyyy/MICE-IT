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
function callAjax(url, callback){
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

function getDom(id){
	return document.getElementById(id);
}

function callbackStudentAjax(responseText){

	// string 을 json 으로 변환
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
	var articleData = JSON.parse(responseText);
	var templateString = getDom('articleTemplate').innerHTML;
	var parseString;

	// articleData 분석 및 템플릿에 적용
	// 뉴스
	parseString = [];
	var news = '';
	for(var i=0; i<articleData[0].news.length; i++ ){
		news = articleData[0].news[i];
		parseString.push( template(templateString, {title : articleData[0].news[i].title}  ) );
	}
	getDom('newsContents').innerHTML = parseString.join("");
	// 연예
	parseString = [];
	var enter = '';
	for(var i=0; i<articleData[1].enter.length; i++ ){
		enter = articleData[1].enter[i];
		parseString.push( template(templateString, {title : articleData[1].enter[i].title}  ) );
	}
	getDom('enterContents').innerHTML = parseString.join("");
	// 스포츠
	parseString = [];
	var sports = '';
	for(var i=0; i<articleData[2].sports.length; i++ ){
		sports = articleData[2].sports[i];
		parseString.push( template(templateString, {title : articleData[2].sports[i].title}  ) );
	}
	getDom('sportsContents').innerHTML = parseString.join("");
}

function start(){
	callAjax('articleData.js', callbackStudentAjax);
}


//시작 
start();