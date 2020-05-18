$('.bea-wrap.timeline .bea-main h1').on('click', function() {
    $(this).next().slideToggle();
});

$('.tabbed .bea-notes span').on('click', function() {
    console.log(this.id);
    $('.tabbed .bea-notes span').removeClass('activeTab');
    $('.tabbed .bea-main').removeClass('activeTab');
    $(this).addClass('activeTab');
    $('#' + this.id + '-content').addClass('activeTab');
});