document.addEventListener('DOMContentLoaded', function () {

  /* ----- Mobile menu toggle ----- */
  var toggle = document.querySelector('.mobile-toggle');
  var nav = document.querySelector('.nav-links');
  var navWrap = document.querySelector('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function (e) {
      if (navWrap && !navWrap.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

});
