document.addEventListener("DOMContentLoaded", () => {
    //index the side menu items
    const buttons = document.querySelectorAll('#sideNav a');
    //confirm there's at least one side nav menu item
    if(buttons[0]) {
        //find when the main section scrolls as there is no scroll on the window itself
        document.querySelector('main').addEventListener('scroll', () => {
            document.querySelectorAll('section').forEach(section => {
                //set section number and offset from the top
                const sectNum = [].indexOf.call(section.parentElement.children, section);
                const offset = section.getBoundingClientRect().top - document.querySelector('main').clientHeight;

                //if page top is reached by this section, change active side nav item
                if(0 >= offset) {
                    document.querySelectorAll('#sideNav > a').forEach(link => {
                        link.classList.remove('active');
                    });
                    buttons[sectNum].classList.add('active');
                }
            })
        });
    }

    // Add smooth scrolling
    $("a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            $('main').animate({
                scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
            }, 1200, function(){
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });


    //Image Lightbox
    document.querySelectorAll('.gallery img').forEach(image => {
        //add click event to each image
        image.addEventListener('click', event => {
            //get image source
            const src = event.currentTarget.getAttribute('src');
            //assign image source to overlay image element
            document.querySelector('.overlay img').setAttribute('src', src);
            //fade in overlay
            $('.overlay').fadeIn();
        })
    });
    document.querySelectorAll('.overlay, .close').forEach(element => {
        //add click event to overlay background and close button
        element.addEventListener('click', event => {
            //fade out overlay
            $('.overlay').fadeOut();
            //remove image source with delay to allow for fade to finish first
            setTimeout(() => {
                document.querySelector('.overlay img').removeAttribute('src');
            }, 1000);
        })
    });
});