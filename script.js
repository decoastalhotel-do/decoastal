document.addEventListener('DOMContentLoaded', function () {

  /* ----- Navbar scroll effect ----- */
  var nav = document.querySelector('.navbar');
  if (nav) {
    function handleScroll() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ----- Mobile menu toggle ----- */
  var toggle = document.querySelector('.mobile-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      var expanded = toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
      toggle.setAttribute('aria-expanded', expanded);
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----- Video Hero + Ken Burns Slider (homepage only) ----- */
  var heroVideo = document.getElementById('hero-video');
  var heroSlider = document.getElementById('hero-slider');

  if (heroVideo && heroSlider) {
    var slides = heroSlider.querySelectorAll('.hero-slide');
    var currentSlide = 0;
    var sliderInterval;

    function showSlide(index) {
      slides.forEach(function (slide, i) {
        slide.classList.toggle('active', i === index);
      });
    }

    function startSlider() {
      showSlide(0);
      sliderInterval = setInterval(function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }, 8000);
    }

    heroVideo.addEventListener('ended', function () {
      heroVideo.style.display = 'none';
      heroSlider.style.display = 'block';
      startSlider();
    });

    if (heroVideo.readyState >= 3) {
      heroVideo.play().catch(function () {
        heroVideo.style.display = 'none';
        heroSlider.style.display = 'block';
        startSlider();
      });
    } else {
      heroVideo.addEventListener('canplay', function () {
        heroVideo.play().catch(function () {
          heroVideo.style.display = 'none';
          heroSlider.style.display = 'block';
          startSlider();
        });
      });
    }
  }

  /* ----- Stat counter animation ----- */
  var statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    var statNumbers = statsSection.querySelectorAll('.stat-number');
    var counted = false;

    function animateStats() {
      if (counted) return;
      counted = true;
      statNumbers.forEach(function (el) {
        var target = el.getAttribute('data-target');
        if (!target) return;
        var targetNum = parseFloat(target.replace(/[^0-9.]/g, ''));
        var suffix = target.replace(/[0-9.]/g, '');
        var duration = 2000;
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
            el.textContent = target;
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

    observer.observe(statsSection);
  }
});
