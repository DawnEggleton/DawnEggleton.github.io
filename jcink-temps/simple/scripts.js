let actTab = 1;
let titles = $('.lux-tabbed .lux-temp1-title');
let tabs = $('.lux-tabbed .lux-temp1-content');

$('.lux-temp1-left').on('click', function(){	
	if (actTab == 1) {
		actTab = tabs.length;
	}
	else {
		actTab -= 1;
	}
	for (i = 0; i < tabs.length; i++) {
		$(titles[i]).removeClass('lux-active');
		$(tabs[i]).removeClass('lux-active');
	}
	$(titles[actTab - 1]).addClass('lux-active');
	$(tabs[actTab - 1]).addClass('lux-active');
});

$('.lux-temp1-right').on('click', function(){	
	if (actTab == tabs.length) {
		actTab = 1;
	}
	else {
		actTab += 1;
	}
	for (i = 0; i < tabs.length; i++) {
		$(titles[i]).removeClass('lux-active');
		$(tabs[i]).removeClass('lux-active');
	}
	$(titles[actTab - 1]).addClass('lux-active');
	$(tabs[actTab - 1]).addClass('lux-active');
});