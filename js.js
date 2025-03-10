document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.querySelector('.dsa-navbar-toggle');
    const navbarLinks = document.querySelector('.dsa-navbar-links');

    navbarToggle.addEventListener('click', function () {
        navbarToggle.classList.toggle('dsa-active');
        navbarLinks.classList.toggle('dsa-active');
    });
});