

var btn = document.getElementById("btn");

var btnClickHandler = function() {
	console.log(this);
};

// btn.addEventListener("click", btnClickHandler.bind(window));
btn.addEventListener("click", $.bind(btnClickHandler, window));

//document.querySelectorAll('div'); // html셀렉트 별로 가져

