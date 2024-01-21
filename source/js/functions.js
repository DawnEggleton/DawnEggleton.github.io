function toggleMenu(e) {
    e.classList.toggle('is-open');
    e.closest('nav').querySelector('ul').classList.toggle('is-open');
}

function closeLightbox(e) {
    $('.lightbox').removeClass('is-open');
}

function fetchContent(category) {
    fetch(`https://opensheet.elk.sh/1p6GX328DQy2lBkZCVRt1Wl63Lb_yOSpiTiAwoobIDsA/Photos`)
    .then((response) => response.json())
    .then((data) => {
        let photos = data.filter(item => item.Category.toLowerCase().trim() === category.toLowerCase().trim());
        initPhotos(photos);
    }).then(() => {
        initPage();
    });
}

function initPage() {
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
}

function initPhotos(photos) {
    let thumbnails = ``, lightbox = ``;

    photos.sort((a, b) => {
        if(parseInt(a.Year) > parseInt(b.Year)) {
            return -1;
        } else if(parseInt(a.Year) < parseInt(b.Year)) {
            return 1;
        } else if(parseInt(a.Month) < parseInt(b.Month)) {
            return -1;
        } else if(parseInt(a.Month) > parseInt(b.Month)) {
            return 1;
        } else if(new Date(a.Timestamp) > new Date(b.Timestamp)) {
            return -1;
        } else if(new Date(a.Timestamp) < new Date(b.Timestamp)) {
            return 1;
        } else {
            return 0;
        }
    });

    photos.forEach((photo, i) => {
        thumbnails += `<a class="gallery-thumb" href="javascript:;" data-slide="${i}"><img src="../dist/images/thumb/${photo.Category.toLowerCase().trim()}/${photo.Year.trim()}/${photo.Filename.trim()}"></a>`;
        lightbox += `<li class="glide__slide"><img src="../dist/images/full/${photo.Category.toLowerCase().trim()}/${photo.Year.trim()}/${photo.Filename.trim()}"></li>`;
    });

    document.querySelector('.gallery').innerHTML = thumbnails;
    document.querySelector('.glide__slides').innerHTML = lightbox;
}

function sendAjax(form, data) {
    $.ajax({
        url: `https://script.google.com/macros/s/AKfycbzk0g1Z6mZyod9dI2BBBYwK-MrLy5E2NyUXn1b0FuWxt3FCSwqazAj3_9vhjAHY4CCGhA/exec`,   
        data: data,
        method: "POST",
        type: "POST",
        dataType: "json", 
        success: function () {
            console.log('Success');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
            document.querySelector('.form--sort-warning').innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and send Lux a screenshot of what's there.`;
        },
        complete: function () {
            form.querySelector('button[type="submit"]').innerText = 'Submit';
        }
    });
}