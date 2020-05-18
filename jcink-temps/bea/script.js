$('.bea-wrap.timeline h1').on('click', function() {
    if($(this).hasClass('yearOpen')) {
        $(this).next('.bea-content').slideUp();
        $(this).removeClass('yearOpen');
    } else {
        $(this).next('.bea-content').slideDown();
        $(this).addClass('yearOpen');
    }
});

$('.bea-wrap.tabbed .bea-notes span').on('click', function() {
    console.log(this.id);
    $('.bea-wrap.tabbed .bea-notes span').removeClass('activeTab');
    $('.bea-wrap.tabbed .bea-main').removeClass('activeTab');
    $(this).addClass('activeTab');
    $('#' + this.id + '-content').addClass('activeTab');
});