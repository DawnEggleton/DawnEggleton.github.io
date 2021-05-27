function toggleInvert () {
    if(document.querySelector('body').classList.contains('dark')) {
        document.querySelector('body').classList.add('light');
        document.querySelector('body').classList.remove('dark');
        document.querySelector('#invertToggle').classList.remove('switched');
        localStorage.setItem("COLORMODE", "0");
    } else {
        document.querySelector('body').classList.add('dark');
        document.querySelector('body').classList.remove('light');
        document.querySelector('#invertToggle').classList.add('switched');
        localStorage.setItem("COLORMODE", "1");
    }
}
function toggleFont () {
    if(document.querySelector('body').classList.contains('lrgFont')) {
        document.querySelector('body').classList.remove('lrgFont');
        document.querySelector('#fontToggle').classList.remove('switched');
        localStorage.setItem("SIZEMODE", "0");
    } else {
        document.querySelector('body').classList.add('lrgFont');
        document.querySelector('#fontToggle').classList.add('switched');
        localStorage.setItem("SIZEMODE", "1");
    }
}
function togglePopNav() {
    if(document.querySelector('.nav-popout').classList.contains('active')) {
        document.querySelector('.nav-popout').classList.remove('active');
    } else {
        document.querySelector('.nav-popout').classList.add('active');
    }
}


  //Toggles
  /* Original Cookie Script by Essi - sourced.jcink.net */
  if(localStorage.getItem("COLORMODE") == "1") {
    document.querySelector('body').classList.add('dark');
    document.querySelector('body').classList.remove('light');
    document.querySelector('#invertToggle').classList.add('switched');
  } else {
    document.querySelector('body').classList.add('light');
    document.querySelector('body').classList.remove('dark');
    document.querySelector('#invertToggle').classList.remove('switched');
  }
 if(localStorage.getItem("SIZEMODE") == "1") {
    document.querySelector('body').classList.add('lrgFont');
    document.querySelector('#fontToggle').classList.add('switched');
 } else {
    document.querySelector('body').classList.remove('lrgFont');
    document.querySelector('#fontToggle').classList.remove('switched');
 }

//Header tabs
document.querySelectorAll('.info-labels a').forEach(label => {
    label.addEventListener('click', (e) => {
        document.querySelectorAll('.info-labels a').forEach(label => label.classList.remove('active'));
        document.querySelectorAll('.info-tab').forEach(tab => tab.classList.remove('active'));
        e.currentTarget.classList.add('active');
        document.querySelector('#' + e.currentTarget.id + '-box').classList.add('active');
    });
});

//Smooth scroll
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

//Set scroll on popout menu
if(document.querySelector('.nav-popout div').clientHeight > document.querySelector('.nav-popout').clientHeight) {
    document.querySelector('.nav-popout div').classList.add('scroll');
}

//Append in-description links
document.querySelectorAll('.forum-links').forEach(linkSet => {
    if(linkSet.parentNode.parentNode.nextElementSibling.children[1].children[0]) {
        linkSet.parentNode.parentNode.nextElementSibling.children[1].children[0].insertAdjacentHTML('beforeend', linkSet.innerHTML);
    } else {
        linkSet.parentNode.parentNode.nextElementSibling.children[1].insertAdjacentHTML('beforeend', linkSet.innerHTML);
    }
    linkSet.remove();
});

//Append in-description CTAs
document.querySelectorAll('.forum-cta').forEach(cta => {
    cta.parentNode.parentNode.nextElementSibling.children[0].children[1].insertAdjacentHTML('beforeend', cta.innerHTML);
    cta.remove();
});

//Append recent topics
$('#recent-topics').appendTo($('#recent-topics-clip'));