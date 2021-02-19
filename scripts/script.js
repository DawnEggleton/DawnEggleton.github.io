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



    // Add smooth scrolling
    $("a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('main').animate({
                scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
            }, 1200, function(){
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });


    //Image Lightbox
    $('.gallery img').on('click', function() {
        $('.overlay img').attr('src', $(this).attr('src'));
        $('.overlay').fadeIn();
    });
    $('.overlay, .close').on('click', function() {
        $('.overlay').fadeOut();
    });
});