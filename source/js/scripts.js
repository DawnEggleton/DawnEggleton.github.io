$('.gallery').isotope({
    itemSelector: '.gallery-thumb',
    percentPosition: true,
    masonry: {
      gutter: 20
    }
});

document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', e => {
        $('.lightbox').addClass('is-open');
        let startSlide = e.currentTarget.dataset.slide;
        console.log(startSlide);
        if ($('.lightbox .glide').length) {
            let slider = new Glide('.glide', {
              gap: 40,
                bound: true,
                peek: {
                    before: 0,
                    after: 0
                },
                startAt: startSlide,
                breakpoints: {
                    960: {
                        gap: 0
                    },
                    1350: {
                        gap: 20
                    }
                }
            }).mount();
        }
    });
});

function closeLightbox(e) {
    $('.lightbox').removeClass('is-open');
}