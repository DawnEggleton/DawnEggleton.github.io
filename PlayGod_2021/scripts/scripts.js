function toggleInvert () {
    if(document.querySelector('body').classList.contains('dark')) {
        document.querySelector('body').classList.add('light');
        document.querySelector('body').classList.remove('dark');
        document.querySelector('#invertToggle').classList.remove('switched');
    } else {
        document.querySelector('body').classList.add('dark');
        document.querySelector('body').classList.remove('light');
        document.querySelector('#invertToggle').classList.add('switched');
    }
}
function toggleFont () {
    if(document.querySelector('body').classList.contains('lrgFont')) {
        document.querySelector('body').classList.remove('lrgFont');
        document.querySelector('#fontToggle').classList.remove('switched');
    } else {
        document.querySelector('body').classList.add('lrgFont');
        document.querySelector('#fontToggle').classList.add('switched');
    }
}
function togglePopNav() {
    if(document.querySelector('.nav-popout').classList.contains('active')) {
        document.querySelector('.nav-popout').classList.remove('active');
    } else {
        document.querySelector('.nav-popout').classList.add('active');
    }
}

document.querySelectorAll('.info-labels a').forEach(label => {
    label.addEventListener('click', (e) => {
        document.querySelectorAll('.info-labels a').forEach(label => label.classList.remove('active'));
        document.querySelectorAll('.info-tab').forEach(tab => tab.classList.remove('active'));
        e.currentTarget.classList.add('active');
        document.querySelector('#' + e.currentTarget.id + '-box').classList.add('active');
    });
});

$(document).ready(function(){
    $("a.anchorTag").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
});


document.querySelectorAll('.forum-wrap:not(.redirect) .forum-links').forEach(linkSet => {
    if(linkSet.parentNode.parentNode.nextElementSibling.children[1].children[0]) {
        linkSet.parentNode.parentNode.nextElementSibling.children[1].children[0].insertAdjacentHTML('beforeend', linkSet.innerHTML);
    } else {
        linkSet.parentNode.parentNode.nextElementSibling.children[1].insertAdjacentHTML('beforeend', linkSet.innerHTML);
    }
    linkSet.remove();
});
document.querySelectorAll('.forum-wrap.redirect .forum-links').forEach(linkSet => {
    if(linkSet.parentNode.parentNode.nextElementSibling.children[0]) {
        linkSet.parentNode.parentNode.nextElementSibling.children[0].insertAdjacentHTML('beforeend', linkSet.innerHTML);
    } else {
        linkSet.parentNode.parentNode.nextElementSibling.insertAdjacentHTML('beforeend', linkSet.innerHTML);
    }
    linkSet.remove();
});