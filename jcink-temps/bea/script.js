$('.bea-wrap.timeline .bea-main h1').on('click', function() {
    $(this).next().slideToggle();
    console.log('timeline year clicked');
});

$('.bea-wrap.tabbed .bea-notes span').on('click', function() {
    console.log(this.id);
    $('.bea-wrap.tabbed .bea-notes span').removeClass('activeTab');
    $('.bea-wrap.tabbed .bea-main').removeClass('activeTab');
    $(this).addClass('activeTab');
    $('#' + this.id + '-content').addClass('activeTab');
});