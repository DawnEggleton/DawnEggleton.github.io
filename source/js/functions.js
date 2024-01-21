function toggleMenu(e) {
    e.classList.toggle('is-open');
    e.closest('nav').querySelector('ul').classList.toggle('is-open');
}