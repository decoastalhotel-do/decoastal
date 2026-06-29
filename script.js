document.addEventListener('DOMContentLoaded', function () {

  var nav = document.querySelector('nav');
  if (nav) {
    nav.style.transition = 'box-shadow 0.2s';
  }

  var toggle = document.querySelector('.mobile-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) {
    var statNums = statsStrip.querySelectorAll('.stat-num');
    var counted = false;

    function animateStats() {
      if (counted) return;
      counted = true;
      statNums.forEach(function (el) {
        var text = el.textContent.trim();
        var targetNum = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (!targetNum) return;
        var suffix = text.replace(/[0-9.]/g, '');
        var duration = 1500;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var current = Math.floor(progress * targetNum);
          el.textContent = current + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = text;
          }
        }

        requestAnimationFrame(step);
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsStrip);
  }

});
