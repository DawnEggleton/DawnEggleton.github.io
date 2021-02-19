$(document).ready(function() {
    //index the side menu items
    var buttons = $('#sideNav a');
    //find when the main section scrolls as there is no scroll on the window itself
    $('main').scroll(function() {
        //set distance scrolled
        var Scroll = $(window).scrollTop();
        //run for each section instance
        $('section').each(function() {
            //set section number to match up with menu indexing
            var sectNum = $(this).index();
            // subtract height of main to fix bug of triggering one section too late
            var offset = $(this).offset().top - $('main').height();
            //determine which menu item to highlight
            if(Scroll >= offset) {
                $('#sideNav > a').removeClass('active');
                $(buttons[sectNum]).addClass('active');
            }
        });
    });
});