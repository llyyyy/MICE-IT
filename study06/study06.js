$(document).ready(function(){

	$('#go').on("click", toggleMove);
	//$(window).resize(move);
});

function toggleMove(){
	var w_width = $(window).width();
	var w_height = $(window).height();
	
	var $box = $('#box');
	
	if(!$(box).hasClass("moved")) {
		$box.animate({left : w_width - $(box).width(),
			top : w_height - $(box).height() },
 			1000);
	}
	else {
		$box.animate({left : 10,
			top : 10 },
 			1000);
	}
	
	$box.toggleClass("moved");

		
}