let years = document.querySelectorAll(`.bea-wrap.timeline h1`);
if(years.length > 0) {
    years.forEach(year => {
        year.addEventListener('click', e=> {
            let content = e.currentTarget.nextElementSibling;
            $(content).slideToggle(300);
        });
    });
});

$('.bea-wrap.tabbed .bea-notes span').on('click', function() {
    let id = this.id;
    $(this).siblings().removeClass('activeTab');
    $(this).parent().parent().siblings('.bea-main').removeClass('activeTab');
    $(this).addClass('activeTab');
    $(this).parent().parent().siblings('#' + id + '-content').addClass('activeTab');
});
