$('.gallery div').on('click', function() {
    var imageID = this.id;
    var image = $('#' + imageID).html();
    $('.lightbox').show();
    $('.activeImg').append(image);
});
$('.closelb').on('click', function() {
    $('.lightbox').hide();
    $('.activeImg').html('');
});
$('.backgroundlb').on('click', function() {
    $('.lightbox').hide();
    $('.activeImg').html('');
});