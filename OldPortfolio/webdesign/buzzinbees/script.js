mobileOpen = false;

$('.mobile-menu i').on('click', function() {
	if (mobileOpen == false) {
		$('.mobile-nav').css({'height':'calc(100vh - 80px)', 'padding':'10% 0'});
		$('.toTop').hide();
		mobileOpen = true;
	} else {
		$('.mobile-nav').css({'height':'0','padding': '0'});
		$('.toTop').show();
		mobileOpen = false;
	}	
});