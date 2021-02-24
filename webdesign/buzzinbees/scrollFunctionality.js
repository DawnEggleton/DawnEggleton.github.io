window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
		$('header .top-logo').slideUp(800);
		$('header .triangle').slideUp(800);
		$('header .accent').slideUp(800);
		$('header .tagline').slideUp(800);
		$('header').css({'height': '80px', 'transition-duration': '1.5s'});
		$('nav').css({'height': '50px', 'bottom': '15px', 'width': 'calc(100% - 350px)', 'left': '350px'});
		$('nav a').css({'height': '50px', 'line-height': '50px', 'font-size': '20px'});
		$('nav a span img').css({'height': '20px', 'width': '20px', 'margin': '0 5px -3px 0'});
		$('section.first').css('margin-top', '150px');
		$('header .scroll-logo').slideDown(1400);
		$('header').addClass('scrolled');
	} else {
		$('header .top-logo').slideDown(1400);
		$('header .triangle').slideDown(1400);
		$('header .accent').slideDown(1400);
		$('header .tagline').slideDown(1400);
		$('header').css({'height': '400px', 'transition-duration': '1.5s'});
		$('nav').css({'height': '60px', 'bottom': '30px', 'width': 'calc(100% - 485px)', 'left': '455px'});
		$('nav a').css({'height': '60px', 'line-height': '60px', 'font-size': '30px'});
		$('nav a span img').css({'height': '30px', 'width': '30px', 'margin': '0 10px -5px 0'});
		$('section.first').css('margin-top', '400px');
		$('header .scroll-logo').slideUp(800);
		$('header').removeClass('scrolled');
	}
} 