$(document).ready(function() {

	$('#go').on("click", toggleMove);
	
});

function toggleMove() {
	var w_width = $(window).width();
	var w_height = $(window).height();
	
	var $box = $('#box');
	var $moved = $('.moved');
	
	if(!$(box).hasClass("moved")) {
		$box.animate ({
			opacity : 0.5,
			left : w_width - $(box).width(),
			top : w_height - $(box).height(),
			fontSize : "30px"
			}, 2000);
	}
	else {
		$box.animate ({
			opacity : 1,
			left : 10,
			top : 10,
			fontSize : "15px"
			}, 2000);
	}
	
	$box.toggleClass("moved");

		
}