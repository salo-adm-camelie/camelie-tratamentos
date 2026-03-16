/* ===================================================
   CAMELIE — Tratamentos JS
   assets/js/tratamentos.js
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // --- Navbar scroll ---
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // --- Scroll reveal ---
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.animate').forEach(function (el) { observer.observe(el); });

  // --- Syringe animation ---
  var syringe = document.getElementById('syringe');
  if (syringe) {
    var liquid = document.getElementById('syr-liquid');
    var rod = document.getElementById('syr-rod');
    var head = document.getElementById('syr-head');
    var drop = document.getElementById('syr-drop');

    window.addEventListener('scroll', function () {
      var rect = syringe.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));

      syringe.style.opacity = Math.min(p * 3, 1);
      var py = 8 + (p * 28);
      rod.setAttribute('y2', py);
      head.setAttribute('y', py - 1);
      liquid.setAttribute('y', 68 - (p * 28));
      liquid.setAttribute('height', p * 28);
      drop.style.opacity = p > 0.7 ? '1' : '0';
    }, { passive: true });
  }

  // --- Carousel ---
  var track = document.getElementById('carousel-track');
  if (track) {
    var prev = document.getElementById('carousel-prev');
    var next = document.getElementById('carousel-next');
    var dotsWrap = document.getElementById('carousel-dots');
    var cards = track.querySelectorAll('.carousel-card');

    // Create dots
    cards.forEach(function (_, i) {
      var d = document.createElement('div');
      d.className = 'dot' + (i === 0 ? ' on' : '');
      dotsWrap.appendChild(d);
    });
    var dots = dotsWrap.querySelectorAll('.dot');

    function updateCarousel() {
      var sl = track.scrollLeft;
      var max = track.scrollWidth - track.clientWidth;
      prev.classList.toggle('hide', sl < 10);
      next.classList.toggle('hide', sl > max - 10);
      var idx = Math.round(sl / 320);
      dots.forEach(function (d, i) {
        var active = i === Math.min(idx, cards.length - 1);
        d.classList.toggle('on', active);
        d.style.width = active ? '20px' : '6px';
      });
    }

    track.addEventListener('scroll', updateCarousel, { passive: true });
    prev.addEventListener('click', function () { track.scrollBy({ left: -340, behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: 340, behavior: 'smooth' }); });
    updateCarousel();
  }

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-i').forEach(function (item) {
    item.addEventListener('click', function () { this.classList.toggle('open'); });
  });

});
